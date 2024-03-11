import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: [
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900'
  ]
})

export const metadata: Metadata = {
  title: 'File Manager',
  // TODO: improve description
  description: 'File manager Description'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} prose max-w-none font-sans antialiased`}>{children}</body>
    </html>
  )
}
