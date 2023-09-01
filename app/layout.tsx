import './globals.scss'
import type { Metadata } from 'next'
import { Navbar } from './components/navbar/Navbar'
import { Footer } from './components/footer/Footer'

export const metadata: Metadata = {
  title: 'League Of Legends | Nextjs',
  description: 'Esta aplicación muestra una interfaz amigables con datos generales, los cmapeones y las reglas del juego llamado League of Legends',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Fira+Sans:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <main>
          <Navbar />
          <div className="mt-80">
            {children}
          </div>
          <Footer />
        </main>  
      </body>
    </html>
  )
}
