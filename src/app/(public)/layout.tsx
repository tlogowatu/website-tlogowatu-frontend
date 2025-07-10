import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Profil Desa Tlogowatu",
  description: "Website resmi profil Desa Tlogowatu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-gray-50`}>
        <Header />
        {/* Hapus 'container', 'mx-auto', dan padding dari sini */}
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="text-center p-4 bg-gray-100 text-gray-600 border-t">
          © {new Date().getFullYear()} Desa Tlogowatu. All rights reserved.
        </footer>
      </body>
    </html>
  );
}