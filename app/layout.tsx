import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Manrope, DM_Sans, Inter } from 'next/font/google'
import { ThemeProvider } from "./theme";
import { ClerkProvider } from "@clerk/nextjs";

const manrope = Manrope({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Mist",
  description: "Share AI powered videos effortlessly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
             <body className={`${manrope.className} bg-[#171717]`}>
             <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            
                {children}
               
          </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
