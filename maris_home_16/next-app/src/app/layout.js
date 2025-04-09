import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";

export const metadata = {
  title: "Next.js Blog",
  description: "A blog built with Next.js and MongoDB",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className={GeistSans.className}>
        <div className="min-h-screen flex flex-col bg-base-200">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
          <Footer />
          <BackToTop />
        </div>
      </body>
    </html>
  );
}
