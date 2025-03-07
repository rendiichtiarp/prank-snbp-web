import "./globals.css";
import { Lato } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const lato = Lato({
  subsets: ["latin"],
  weight: "400", 
});

export const metadata = {
  title: "Prank SNBP 2025 Website",
  description: "Prank SNBP 2025 by @rendiichtiar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={lato.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
