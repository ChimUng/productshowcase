import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('showcase-token')?.value;
    const { pathname } = request.nextUrl;

    const isLoggedIn = !!token;
    const isLoginPage = pathname === '/login';

    // Chưa đăng nhập mà vào trang cần bảo vệ → về /login
    if (!isLoggedIn && !isLoginPage) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Đã đăng nhập mà vào /login → về trang chủ
    if (isLoggedIn && isLoginPage) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

// Chỉ áp dụng middleware cho các route này, bỏ qua api/ và _next/
export const config = {
    matcher: ['/', '/products/:path*', '/login'],
};