import type { Metadata } from "next"
import "./globals.css"
import Header from "@/components/Header"
import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from 'next/font/google'


const inter = Inter({
  weight: '300',
  style: 'normal',
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "DormDeals",
  description: "Buy and sell used items in your dorm!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <Header />
          {children}
          {/* <span>footer</span> */}
        </ClerkProvider>
      </body>
    </html>

  );
}
