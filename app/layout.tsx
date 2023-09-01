import { Toaster } from 'react-hot-toast';

import { Navbar, Footer } from '@/components/layouts';

import './globals.css';

export const metadata = {
  title: 'Flexibble',
  description: 'Showcase and discover remarkable developer projects.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
        <Toaster position='top-right'/>
      </body>
    </html>
  )
}
