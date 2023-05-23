import './globals.css'

export const metadata = {
  title: 'PV Coastal Realty',
  description: '',
}

export default function RootLayout({ children }) {

  return (

    <html lang="en">
      <body>
        <main>
          {children}
        </main>
      </body>
    </html>

  )

}
