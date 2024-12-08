import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";


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
      <body
      >
        <ClerkProvider>
          <Header />
          {children}
        </ClerkProvider>
      </body>
    </html>

  );
}
