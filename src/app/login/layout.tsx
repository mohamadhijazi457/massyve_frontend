// app/dashboard/layout.tsx
"use client";
import { ReactNode } from "react";

const LoginLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};

export default LoginLayout;
