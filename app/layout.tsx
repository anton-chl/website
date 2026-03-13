import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/ThemeProvider"
import { SmoothScroll } from "@/components/SmoothScroll"
import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { siteConfig } from "@/lib/data"

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.title}`,
  description: `Personal website of ${siteConfig.name}, ${siteConfig.title} student at ${siteConfig.school}.`,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Theme init — prevents flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme');document.documentElement.setAttribute('data-theme',s||'dark');}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <SmoothScroll>
            <Navigation />
            <main>{children}</main>
            <Footer />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  )
}
