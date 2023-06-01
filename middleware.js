import { NextResponse } from "next/server"
//process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'
export const config = {
    matcher: "/((?!api|static|.*\\..*|_next).*)",
  };

export async function middleware(req) {

    const cookie = await req.cookies.get('mls-authenticator')

    if(!cookie){
        const newCookie = await fetch(`${process.env.NEXT_API_BASE_PATH}/mls/auth`, {
            cache: 'no-store' 
        })
        .then((res) => res.json())

        const response = NextResponse.next()
        response.cookies.set(
            newCookie.name,
            newCookie.value, 
            { path: '/' }
        )
        
        return response
    }

}

