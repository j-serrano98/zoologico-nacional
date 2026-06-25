import "./globals.css"; // 🔥 ¡DEBE SER LA LÍNEA 1!
import Navbar from "./components/Navbar.jsx";

export const metadata = {
  title: "Safari Digital Zoo",
  description: "Explora la vida silvestre con calidad cinematográfica",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="antialiased bg-[#F4EBD0] text-[#2C221E]">
        <Navbar />
        {children}
      </body>
    </html>
  );
}