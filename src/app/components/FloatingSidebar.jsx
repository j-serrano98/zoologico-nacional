"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function FloatingSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Inicio", path: "/", icon: "🧭" },
    { name: "Expedición", path: "/animales", icon: "📸" },
    { name: "Noticias", path: "/noticias", icon: "📰" },
    { name: "Recursos", path: "/recursos", icon: "📚" },
  ];

  return (
    <motion.aside
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed z-50 bottom-6 left-1/2 -translate-x-1/2 md:top-1/2 md:-translate-y-1/2 md:left-8 md:translate-x-0 md:bottom-auto"
    >
      <nav className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-full md:rounded-3xl p-3 md:py-8 md:px-4 flex md:flex-col gap-4 md:gap-8 shadow-2xl">
        {menuItems.map((item) => {
          const isActive = pathname === item.path || (item.path !== "/" && pathname.startsWith(item.path));
          
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className="relative group flex items-center justify-center p-3 rounded-full transition-all duration-300"
            >
              {isActive && (
                <motion.div
                  layoutId="sidebarIndicator"
                  className="absolute inset-0 bg-white/20 rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="text-xl md:text-2xl grayscale group-hover:grayscale-0 transition-all duration-300">
                {item.icon}
              </span>
              
              {/* Tooltip flotante al pasar el mouse (solo en desktop) */}
              <span className="absolute left-full ml-4 px-3 py-1 bg-black/80 text-white text-xs font-mono tracking-widest rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden md:block whitespace-nowrap">
                {item.name.toUpperCase()}
              </span>
            </Link>
          );
        })}
      </nav>
    </motion.aside>
  );
}