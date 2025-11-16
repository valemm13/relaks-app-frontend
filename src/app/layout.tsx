"use client";

import "./globals.css";
import Header from "@/components/shared/header";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Ocultar header SOLO en /users/profile
  const hideHeader = pathname.startsWith("/users/profile");

  return (
    <html lang="es">
      <body>
        {!hideHeader && <Header />}
        {children}
      </body>
    </html>
  );
}
