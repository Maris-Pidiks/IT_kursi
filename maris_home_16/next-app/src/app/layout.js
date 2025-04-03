import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"; // Ensure this import is correct
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import CommonLayout from "./components/CommonLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-screen bg-base-200 flex flex-col">
          <div>
            <Navbar />
            <div className="max-w-7xl mx-auto bg-cyan-400 flex-col flex-grow">
              {children}
            </div>
            <Footer />
            <BackToTop />
          </div>
        </div>
      </body>
    </html>
  );
}
