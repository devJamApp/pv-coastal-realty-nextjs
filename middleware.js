import { NextResponse } from "next/server"
import { isDev } from "./data/settings";

//process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'

export const config = {
    matcher: "/((?!api|static|.*\\..*|_next).*)",
  };

export async function middleware(req) {

    const reqHeaders = new Headers(req.headers);
    reqHeaders.set('x-next-pathname', req.nextUrl.pathname);

    const response = NextResponse.next({
        request: {
            headers: reqHeaders
        }
    })

    const cookie = await req.cookies.get('mls-authenticator')

    if(!cookie){

        const url = 'https://members.mlsvallarta.com/mls/mlsvallarta/login'
        const method = 'POST'

        const auth = await fetch(`${process.env.NEXT_API_BASE_PATH}/mls/auth`, {
            cache: 'no-store' 
        })
        .then((res) => res.json())

        if(isDev){
            response.cookies.set(
                auth.name,
                auth.value, 
                { path: '/' }
            )
        }
        else {
            const newCookie = await fetch(url, {
                method: method,
                headers: { auth },
                body: JSON.stringify({
                    mlsId: 'mlsvallarta',
                    userName: process.env.NEXT_MLS_CLIENT_USER,
                    secret: process.env.NEXT_MLS_CLIENT_SECRET
                })
            })
            .then((res) => {
                const cookie = res.headers.get('Set-Cookie').split('=')
                const value = cookie[1].split(';')[0]
                return { name: cookie[0], value: value }
            })
            response.cookies.set(
                auth.name,
                auth.value, 
                { path: '/' }
            )
        }
        
    }

    return response

}

