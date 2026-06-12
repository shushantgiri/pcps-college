"use client";

import { useState, useEffect } from "react";
import LoadingScreen from "@/app/LoadingScreen";

export default function AppLoader({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Match the ~4s loading animation duration
    const t = setTimeout(() => setReady(true), 4200);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {!ready && <LoadingScreen />}
      <div style={{ visibility: ready ? "visible" : "hidden" }}>
        {children}
      </div>
    </>
  );
}