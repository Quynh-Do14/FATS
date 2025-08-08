import { Endpoint } from '@/core/common/apiLink';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

interface RoleResponse {
    role: string;
}

const ROLE_ACCESS_PATHS: Record<string, string[]> = {
    ADMIN: ['/FATS/admin', '/FATS/admin/:path*'],
};

const AUTH_REQUIRED_PATHS = ['/login', '/register', '/profile', '/personal-goal', '/team', '/advisor/entertainment', '/advisor/invest', '/attendance'];

export async function middleware(req: NextRequest) {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    const accessToken = req.cookies.get('accessToken')?.value;
    const url = req.nextUrl.clone();
    const pathname = url.pathname;

    // 1. Nếu đang ở trang login hoặc register
    if (['/login', '/register'].includes(pathname)) {
        if (accessToken) {
            // Nếu đã đăng nhập → redirect về trang chủ
            url.pathname = '/';
            return NextResponse.redirect(url);
        }
        return NextResponse.next();
    }

    // 2. Nếu là trang yêu cầu đăng nhập (không cần phân quyền)
    const isAuthRequired = AUTH_REQUIRED_PATHS.some((path) =>
        pathname.startsWith(path)
    );
    if (isAuthRequired) {
        if (!accessToken) {
            url.pathname = '/login';
            return NextResponse.redirect(url);
        }
        return NextResponse.next();
    }

    // 3. Nếu là route yêu cầu phân quyền (admin)
    const isAdminRoute = pathname.startsWith('/FATS/admin');
    if (isAdminRoute) {
        if (!accessToken) {
            url.pathname = '/login';
            return NextResponse.redirect(url);
        }

        try {
            const response = await fetch(`${baseURL}${Endpoint.Auth.Profile}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.status === 401) {
                // Token hết hạn
                url.pathname = '/login';
                return NextResponse.redirect(url);
            }

            if (!response.ok) {
                // Các lỗi khác (500, 403, ...)
                throw new Error(`Unexpected error: ${response.status}`);
            }

            const data: RoleResponse = await response.json();
            const role = data.role;

            const allowedPaths = ROLE_ACCESS_PATHS[role] || [];
            const isAllowed = allowedPaths.some((path) => {
                const regex = new RegExp(`^${path.replace(':path*', '.*')}$`);
                return regex.test(pathname);
            });

            if (!isAllowed) {
                url.pathname = '/403';
                return NextResponse.redirect(url);
            }

            return NextResponse.next();
        } catch (err) {
            console.error('Middleware error:', err);
            url.pathname = '/403';
            return NextResponse.redirect(url);
        }
    }

    // 4. Mặc định cho phép truy cập
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/FATS/admin/:path*',
        '/login',
        '/register',
        '/profile',
        '/personal-goal',
        '/team',
        '/select-bot',
        '/history-transition',
        '/attendance',
    ],
};
