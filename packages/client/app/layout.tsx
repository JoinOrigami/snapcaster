import { Outfit } from "next/font/google";
import { Toaster } from "react-hot-toast";

import Navbar from "@components/navbar";

import "../base.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={outfit.className}>
      <body className="pb-6">
        <Toaster />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
