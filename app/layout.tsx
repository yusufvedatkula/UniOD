import type { Metadata } from "next";
import "./globals.css";
import { NavbarComponent } from "@/components/Navbar";

import { AuthProvider } from "./Providers";

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
      <body className='relative'>
        <AuthProvider>
          <NavbarComponent />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}


