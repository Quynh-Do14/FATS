import { Endpoint } from '@/core/common/apiLink';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

interface RoleResponse {
    roles: string;
}

const ROLE_ACCESS_PATHS: Record<string, string[]> = {
    admin: ['/FATS/admin', '/FATS/admin/:path*'],
    // article: ['/techbyte/admin', '/techbyte/admin/blog-management', '/techbyte/admin/blog-management/:path*', '/techbyte/admin/blog-management/add'],
    // seller: ['/techbyte/admin', '/techbyte/admin/shop-management', '/techbyte/admin/shop-management/:path*', '/techbyte/admin/shop-management/add'],
};

export async function middleware(req: NextRequest) {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    const rawToken = req.cookies.get('token')?.value;
    const token = rawToken ? JSON.parse(rawToken) : null;
    const accessToken = token?.accessToken;

    const url = req.nextUrl.clone();

    // **1. Kiểm tra nếu truy cập trang Login**
    if (['/login', '/register'].includes(url.pathname)) {
        if (accessToken) {
            // Nếu đã đăng nhập, chuyển hướng sang trang chính
            url.pathname = '/';
            return NextResponse.redirect(url);
        }
        // Nếu chưa đăng nhập, cho phép tiếp tục truy cập trang login
        return NextResponse.next();
    }

    // **2. Kiểm tra nếu không có accessToken**
    if (!accessToken) {
        url.pathname = '/login'; // Chuyển hướng đến trang đăng nhập
        return NextResponse.redirect(url);
    }

    try {
        const response = await fetch(`${baseURL}${Endpoint.Auth.Profile}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch role');
        }

        const data: RoleResponse = await response.json();
        const role = data.roles;

        const allowedPaths = ROLE_ACCESS_PATHS[role] || [];
        const isAllowed = allowedPaths.some((path) => {
            const regex = new RegExp(`^${path.replace(':path*', '.*')}$`);
            return regex.test(req.nextUrl.pathname);
        });

        if (!isAllowed) {
            url.pathname = '/403';
            return NextResponse.redirect(url);
        }

        return NextResponse.next();
    } catch (error) {
        console.error('Error in middleware:', error);
        url.pathname = '/403';
        return NextResponse.redirect(url);
    }
}

export const config = {
    matcher: [
        '/FATS/admin',
        '/FATS/admin/:path*', // Áp dụng cho các route admin
        '/login',
        '/register',
    ],
};