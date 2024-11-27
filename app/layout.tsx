import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css"; 


export const metadata: Metadata = {
  title: "UniOD",
  description: "Best place for university research",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='relative' data-theme="nord">
        <Navbar />
        {children}
      </body>
    </html>
  );
}