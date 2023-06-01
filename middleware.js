import { NextResponse } from "next/server"

//process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'

export const config = {
    matcher: "/((?!api|static|.*\\..*|_next).*)",
  };

export async function middleware(req) {

    const cookie = await req.cookies.get('mls-authenticator')

    if(!cookie){

        const url = 'https://members.mlsvallarta.com/mls/mlsvallarta/login'
        const method = 'POST'

        const headers = await fetch(`${process.env.NEXT_API_BASE_PATH}/mls/auth`, {
            cache: 'no-store' 
        })
        .then((res) => res.json())
        .catch((err) => console.log(err))

        const newCookie = await fetch(url, {
            method: method,
            headers: { headers },
            body: JSON.stringify({
                mlsId: 'mlsvallarta',
                userName: process.env.NEXT_MLS_CLIENT_USER,
                secret: process.env.NEXT_MLS_CLIENT_SECRET
            })
        })
        .then((res) => {
            console.log(res)
            const cookie = res.headers.get('Set-Cookie').split('=')
            const value = cookie[1].split(';')[0]
            return { name: cookie[0], value: value }
        })
        .catch((err) => console.log(err))
        console.log(newCookie)
        const response = NextResponse.next()
        
        response.cookies.set(
            newCookie.name,
            newCookie.value, 
            { path: '/' }
        )
          
        return response
    }

}

