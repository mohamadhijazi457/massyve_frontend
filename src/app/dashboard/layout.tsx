// app/dashboard/layout.tsx
"use client";
import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};

export default DashboardLayout;
