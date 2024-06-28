
import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'

import db from '@/lib/supabase/db'
import { ThemeProvider } from '@/components/theme-provider'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { UserNav } from '@/components/user-nav'
import { MainNav } from '@/components/main-nav'
import { Toaster } from "@/components/ui/toaster"


const inter = DM_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {







  return (
    <html lang="en">

      <body className={`${inter.className} relative`}>

       

          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >

            <MainNav />
            {children}
            <Toaster />
            <TailwindIndicator />

          </ThemeProvider>


      </body>
    </html >
  )
}
