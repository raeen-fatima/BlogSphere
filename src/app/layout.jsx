import Footer from "@/components/Footer";
import Navbar from "../components/Navbar";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <Navbar />
        <main className="">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
