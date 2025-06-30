import { Endpoint } from '@/core/common/apiLink';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

interface RoleResponse {
    role: string;
}

const ROLE_ACCESS_PATHS: Record<string, string[]> = {
    ADMIN: ['/FATS/admin', '/FATS/admin/:path*'],
};

const AUTH_REQUIRED_PATHS = ['/profile', '/personal-goal', '/team'];

export async function middleware(req: NextRequest) {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    const accessToken = req.cookies.get('accessToken')?.value;
    const url = req.nextUrl.clone();
    const pathname = url.pathname;

    // 1. Nếu vào /login hoặc /register
    if (['/login', '/register'].includes(pathname)) {
        if (accessToken) {
            url.pathname = '/';
            return NextResponse.redirect(url);
        }
        return NextResponse.next();
    }

    // 2. Nếu truy cập các path yêu cầu đăng nhập (không phân quyền)
    const requiresAuth = AUTH_REQUIRED_PATHS.some((path) =>
        pathname.startsWith(path)
    );

    if (requiresAuth && !accessToken) {
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }

    // 3. Nếu truy cập các route cần phân quyền (ví dụ admin)
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

            if (!response.ok) throw new Error('Failed to fetch role');

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
        } catch (error) {
            console.error('Middleware error:', error);
            url.pathname = '/403';
            return NextResponse.redirect(url);
        }
    }

    // 4. Mặc định cho phép truy cập các đường dẫn khác
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
    ],
};
