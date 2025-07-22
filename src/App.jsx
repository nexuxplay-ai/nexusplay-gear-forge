
import React, { useEffect, useState } from "react";
import OptimizerPanel from "./components/OptimizerPanel";
import InstallPrompt from "./components/InstallPrompt";

export default function App() {
  const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200">
      <header className="p-4 text-center text-xl font-bold border-b border-zinc-300 dark:border-zinc-700">
        NexusPlay Optimizer ({isMobile ? "Mobile" : "PC"})
      </header>

      <main className="p-4 max-w-4xl mx-auto">
        <OptimizerPanel />
      </main>

      <InstallPrompt />

      <footer className="p-2 text-center text-sm opacity-50">
        Optimized for Windows 10/11 and Android • © 2025 NexusPlay.io
      </footer>
    </div>
  );
}
