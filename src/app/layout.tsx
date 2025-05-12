"use client";

import { AuthProvider } from "@/app/context/auth-context";
import { ReactNode } from "react";
import "@/app/globals.css"; 

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
