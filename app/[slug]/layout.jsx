"use client";
import { StoreProvider } from "@/context/storeContext";
import StoreNav from "@/components/storecomponents/StoreNav";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {

  return (
    <div className="bg-slate-100 min-h-[100vh]">
      <StoreProvider>{children}</StoreProvider>
    </div>
  );
}
