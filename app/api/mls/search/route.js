import { NextResponse } from "next/server"
import { cookies } from 'next/headers'
import axios from "axios"
import addOAuthInterceptor from "axios-oauth-1.0a"
import https from 'https'

process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'
export async function GET() {

    const authCookie = cookies().get('mls-authenticator')

    const axiosClient = axios.create({
        maxBodyLength: Infinity,
        headers: {
            'Content-Type': 'application/json',
            "Cookie": "mls-authenticator=5b8bdb99962117a70097f0664f2119bd49898e19e4bfcbe849fa35f10c5054771db99a8f6f19bb98e16a8ab1202e3c879ca926a6c771b4279dd2d99381f79580d95678b5473c0185c448b7a7eed4271316df0dc8b472a6214f70f1767c4ab97f00126e212338462487585b59b0f0d0c0"
        },
        maxRedirects: 20,
    })

    const options = {
        key: process.env.NEXT_MLS_CONSUMER_KEY,
        secret: process.env.NEXT_MLS_CONSUMER_SECRET,
        token: process.env.NEXT_MLS_ACCESS_TOKEN,
        tokenSecret: process.env.NEXT_MLS_TOKEN_SECRET,
    }

    addOAuthInterceptor(axiosClient, options)

    await axiosClient.post('https://members.mlsvallarta.com/mls/mlsvallarta/api/property/search', 
    {
        "page": 1,
        "mlsId":"mlsvallarta",
        "search":{
            "featureValues":[],
            "daysOnMarket":true,
            "pageSize":1,
            "propertyTypes":[],
            "regions":[],
            "zones":[],
            "status":["CURRENT"],
            "fromStorage":true
        }
    },
    {
        httpsAgent: new https.Agent({
          rejectUnauthorized: false
        })
      })


    return NextResponse.json('')
}