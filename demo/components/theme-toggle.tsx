"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-10 w-44 rounded-full border border-border bg-muted" aria-hidden="true" />;
  }

  return (
    <div role="group" aria-label="Tema seçimi" className="inline-flex items-center rounded-full bg-muted/60 p-1 border border-border/80 shadow-xs backdrop-blur-xs">
      <Button
        variant={resolvedTheme === "light" ? "default" : "ghost"}
        aria-pressed={resolvedTheme === "light"}
        size="sm"
        onClick={() => setTheme("light")}
        className="rounded-full h-8 px-3 text-xs gap-1.5 transition-all"
      >
        <Sun className="h-3.5 w-3.5" />
        <span>Açık</span>
      </Button>
      <Button
        variant={resolvedTheme === "dark" ? "default" : "ghost"}
        aria-pressed={resolvedTheme === "dark"}
        size="sm"
        onClick={() => setTheme("dark")}
        className="rounded-full h-8 px-3 text-xs gap-1.5 transition-all"
      >
        <Moon className="h-3.5 w-3.5" />
        <span>Koyu</span>
      </Button>
    </div>
  );
}
