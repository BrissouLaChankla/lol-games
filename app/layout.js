"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { useEffect } from "react";
const inter = Inter({ subsets: ["latin"] });

import { useSocketStore } from "@/store/useSocketStore";

// export const metadata = {
//   title: "lolVersus - Devenez intestable",
//   description: "Un jeu détente pour la champ select",
// };

export default function RootLayout({ children }) {
  const { disconnect } = useSocketStore();

  useEffect(() => {
    return () => {
      console.log("bye bye")
      return disconnect()
    };
  }, [])

  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>{children}</body>
    </html>
  );
}
