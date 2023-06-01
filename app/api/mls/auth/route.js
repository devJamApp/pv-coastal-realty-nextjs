import { NextResponse } from "next/server"
import { getAuthHeaders } from "@/app/oauth"

process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'

export async function GET() {

    const url = 'https://members.mlsvallarta.com/mls/mlsvallarta/login'
    const method = 'POST'
    const headers = await getAuthHeaders(url, method)

    const cookie = await fetch(url, {
        method: method,
        headers: { headers },
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
    
    return NextResponse.json(cookie)
}