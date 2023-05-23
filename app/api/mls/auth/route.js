import { NextResponse } from "next/server"
import { cookies } from 'next/headers'

export async function GET() {

    const ts = await fetch('https://members.mlsvallarta.com/mls/timestamp', {
        method: 'GET'
    })
    .then((res) => res.json())
    .then((data) => data)

    const auth = await fetch('https://members.mlsvallarta.com/mls/mlsvallarta/login', {
        method: 'POST',
        next: { revalidate: 15 },
        headers: {
            'oauth_body_hash': 'zWBsERaPioF8Rre3o%2Bvhz4bVd%2Fg%3D',
            'oauth_consumer_key': process.env.NEXT_MLS_CONSUMER_KEY,
            'oauth_signature': 'X%2F3w5Q6iFkeg%2FPY6BL8Vs2SQfBA%3D',
            'oauth_signature_method': 'HMAC-SHA1',
            'oauth_timestamp': ts,
            'oauth_version': '1.0',
            'Content-Type': 'application/json',
        },
        maxRedirects: 20,
        body: JSON.stringify({
            mlsId: 'mlsvallarta',
            userName: process.env.NEXT_MLS_CLIENT_USER,
            secret: process.env.NEXT_MLS_CLIENT_SECRET
        })
    })
    .then((res) => {
        if(res.status === 200){
            const cookie = res.headers.get('Set-Cookie').split('=')
            const value = cookie[1].split(';')[0]
            cookies().set({
                name: cookie[0],
                value: value,
                path: '/'
            })
            return true
        }
        else {
            return false
        }
    })

    return NextResponse.json({
        timestamp: ts,
        auth: auth
    })
}