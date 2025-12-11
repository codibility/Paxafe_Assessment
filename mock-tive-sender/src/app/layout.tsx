import './globals.css'

export const metadata = {
  title: 'Mock Tive Sender',
  description: 'Generate and send mock Tive payloads',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  )
}