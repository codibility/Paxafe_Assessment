import './globals.css'

export const metadata = {
  title: 'PAXAFE Integration API',
  description: 'IoT Data Integration Pipeline',
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