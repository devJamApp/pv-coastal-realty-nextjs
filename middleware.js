import { NextResponse } from "next/server"
import { isDev } from "./data/settings";

//process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'

export const config = {
    matcher: "/((?!api|static|.*\\..*|_next).*)",
  };

export async function middleware(req) {

    const cookie = await req.cookies.get('mls-authenticator')

    const headers = new Headers(req.headers)

    if(cookie){
        headers.set('x-mls-cookie', `${cookie.name}=${cookie.value}`)
    }

    let authCookie;
    
    if(!cookie){

        const url = 'https://members.mlsvallarta.com/mls/mlsvallarta/login'
        const method = 'POST'

        const auth = await fetch(`${process.env.NEXT_BASE_PATH}/api/mls/auth`, {
            cache: 'no-store' 
        })
        .then((res) => res.json())

        if(isDev){
            authCookie = {
                name: auth.name,
                value: auth.value, 
            }
            headers.set('x-mls-cookie', `${auth.name}=${auth.value}`)
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
            .catch((err) => console.log('MW FETCH COOKIE ERROR:', err))

            authCookie = {
                name: newCookie.name,
                value: newCookie.value, 
            }
            headers.set('x-mls-cookie', `${newCookie.name}=${newCookie.value}`)
        }
        
    }

    const response = NextResponse.next({
        request: {
            headers: headers
        }
    })

    if(authCookie){
        response.cookies.set(
            authCookie.name,
            authCookie.value, 
            { path: '/' }
        )
    }

    return response

}

