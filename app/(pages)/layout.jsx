import '../styles/globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'PV Coastal Realty',
  description: '',
}

export default function RootLayout({ children }) {

  const pathname = headers().get('x-next-pathname')

  const auth = cookies().get('mls-authenticator')
  
  if(!auth){
    redirect(pathname)
  }

  return (

    <html lang="en">
      <body>
        <Navbar />
        {auth &&
          <main>
            {children}
          </main>
        }
        <Footer />
      </body>
    </html>

  )

}
