import OAuth from 'oauth-1.0a';
import axios from 'axios';
import crypto from 'crypto'

export default async function Home() {

  //const setCookie = async () => {
  //  await fetch(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/mls/auth`, {
  //    method: 'GET',
  //    next: { revalidate: 1 },
  //    headers: { 'Cache-Control': 'no-store' },
  //  })
  //}
//
  //const search = async () => {
  //  const res = await fetch(`https://pvcoastalrealty.serveo.net/api/mls/search`, {
  //    method: 'GET',
  //    next: { revalidate: 1 },
  //  })
  //  console.log(res.json())
  //}

  let data = JSON.stringify({
    "page": 1,
    "mlsId": "mlsvallarta",
    "search": {
      "featureValues": [],
      "daysOnMarket": true,
      "pageSize": 1,
      "propertyTypes": [],
      "regions": [],
      "zones": [],
      "status": [],
      "fromStorage": true
    }
  });


  const credentials = {
    consumerKey: process.env.NEXT_MLS_CONSUMER_KEY,
    consumerSecret: process.env.NEXT_MLS_CONSUMER_SECRET,
    token: process.env.NEXT_MLS_ACCESS_TOKEN,
    tokenSecret: process.env.NEXT_MLS_TOKEN_SECRET
  };

  const oauth = {
    consumer: {
      key: credentials.consumerKey,
      secret: credentials.consumerSecret
    },
    signature_method: 'HMAC-SHA1',
    hash_function: function(base_string, key) {
      return crypto.createHmac('sha1', key).update(base_string).digest('base64');
    },
  };

  const requestData = {
    url: 'https://members.mlsvallarta.com/mls/mlsvallarta/api/property/search',
    method: 'POST'
  };

  const oauthInstance = OAuth({
    consumer: oauth.consumer,
    signature_method: oauth.signature_method,
    hash_function: oauth.hash_function
  });

  const headers = oauthInstance.toHeader(
    oauthInstance.authorize(requestData, {
      key: credentials.token,
      secret: credentials.tokenSecret
    })
  );




// OAuth 1.0a credentials

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://members.mlsvallarta.com/mls/mlsvallarta/api/property/search',
  headers: { 
    'Content-Type': 'application/json', 
    'Authorization': headers.Authorization, 
    'Cookie':'mls-authenticator=6733dd1edae07ed8989ad275ad1d752849898e19e4bfcbe849fa35f10c5054771db99a8f6f19bb98e16a8ab1202e3c879ca926a6c771b4279dd2d99381f79580d95678b5473c0185c448b7a7eed4271316df0dc8b472a6214f70f1767c4ab97f00126e212338462487585b59b0f0d0c0'
  },
  data : data
};

const properties = await axios.request(config)
.then((res) => res.data.properties)
.catch((err) => {
  console.log(err);
});

console.log(properties)




//'Authorization: OAuth oauth_consumer_key="Qwe2ee0NFi3ZQ1kASz7HZgUETbfxnbq6",oauth_token="ab0a24da17c75aee44012ca7809201cc",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1684876775",oauth_nonce="VAwRQUssQBH",oauth_version="1.0",oauth_signature="pRAoCsmd6YubAzYM7UJCVsi5qyQ="\r\n'


  return (

   <>
    {properties?.map((property, i) => {
      return (
        <span>{property.id}</span>
      )
    })}
   </>

  )
}
