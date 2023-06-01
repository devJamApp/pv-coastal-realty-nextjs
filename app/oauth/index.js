import OAuth from 'oauth-1.0a';
import crypto from 'crypto'
//process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'
const credentials = {
    consumerKey: process.env.NEXT_MLS_CONSUMER_KEY,
    consumerSecret: process.env.NEXT_MLS_CONSUMER_SECRET,
    token: process.env.NEXT_MLS_ACCESS_TOKEN,
    tokenSecret: process.env.NEXT_MLS_TOKEN_SECRET
}

const oauth = {
  consumer: {
    key: credentials.consumerKey,
    secret: credentials.consumerSecret
  },
  signature_method: 'HMAC-SHA1',
  hash_function: function(base_string, key) {
    return crypto.createHmac('sha1', key).update(base_string).digest('base64');
  },
}

const oauthInstance = OAuth({
    consumer: oauth.consumer,
    signature_method: oauth.signature_method,
    hash_function: oauth.hash_function
  })

export const getAuthHeaders = (url, method) => {
    const requestData = {
        url: url,
        method: method
    }
    const headers = oauthInstance.toHeader(
      oauthInstance.authorize(requestData, {
        key: credentials.token,
        secret: credentials.tokenSecret
      })
    )
    if(headers){
        return headers.Authorization
    }
}