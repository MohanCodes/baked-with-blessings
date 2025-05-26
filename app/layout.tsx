import './globals.css';
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import CartWrapper from '@/components/CartWrapper';

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Baked with Blessings",
  description: "Delicious homemade cookies delivered to your doorstep",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased bg-[#FFF8E2]`}>
        <CartWrapper>
          {children}
        </CartWrapper>
      </body>
    </html>
  );
}
