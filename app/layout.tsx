import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Smartdini - Contactless QR Ordering System for Cafes",
  description: "Revolutionize your cafe operations with Smartdini's contactless QR-based ordering and digital menu system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.className}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}