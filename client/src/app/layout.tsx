import "./globals.css"

import { Metadata } from "next"
import { Providers } from "./providers"

export const metadata: Metadata = {
  title: {
    default: "Wrapped Now",
    template: "%s | Wrapped Now",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
