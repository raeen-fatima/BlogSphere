import "./globals.css";
import Navbar from "../components/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
          <Navbar />
        {children}
      </body>
    </html>
  );
}
