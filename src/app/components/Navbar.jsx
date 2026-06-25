"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { name: "Inicio", path: "/" },
    { name: "Especies", path: "/animales" },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl"
    >
      <nav className="bg-safari-dark/80 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full flex items-center justify-between shadow-lg">
        {/* Logo de Exploración */}
        <Link href="/" className="font-serif font-black text-xl text-safari-sand tracking-wider flex items-center gap-1">
          Zoologico Nacional<span className="text-safari-sunset">.</span>
        </Link>

        {/* Menú de Enlaces */}
        <div className="flex items-center gap-2 md:gap-4">
          {links.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className="relative px-3 py-1.5 text-xs md:text-sm font-mono tracking-wider transition-colors duration-300"
                style={{ color: isActive ? "#F4EBD0" : "rgba(244, 235, 208, 0.6)" }}
              >
                {/* Indicador de píldora activa al estilo Apple */}
                {isActive && (
                  <motion.span
                    layoutId="activeNavBackground"
                    className="absolute inset-0 bg-safari-olive/60 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {link.name.toUpperCase()}
              </Link>
            );
          })}
        </div>
      </nav>
    </motion.header>
  );
}