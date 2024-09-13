
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { APP_ROUTES } from './shared/route/app_route';
import { AppConfig } from './shared/app_config';
import { cookies } from 'next/headers';

export function middleware(request: NextRequest) {
    // const token = cookies().get("accessToken")?.value ?? "";
    // AppConfig.token = token;
    // if (!token && request.nextUrl.pathname !== APP_ROUTES.Login) {
    //     return NextResponse.redirect(new URL(APP_ROUTES.Login, request.url));
    // }
    return NextResponse.next();
}
