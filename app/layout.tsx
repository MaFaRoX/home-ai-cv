import type { Metadata } from 'next'
import '../src/index.css'

export const metadata: Metadata = {
  title: 'CV Template',
  description: 'Create professional CVs with beautiful templates',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

