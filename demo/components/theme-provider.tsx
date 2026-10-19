"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <NormalizeSavedTheme />
      {children}
    </NextThemesProvider>
  );
}

// Migrate retired or unsupported saved themes to the light palette.
function NormalizeSavedTheme() {
  const { theme, setTheme } = useTheme();

  React.useEffect(() => {
    if (theme && !["light", "dark", "system"].includes(theme)) {
      setTheme("light");
    }
  }, [theme, setTheme]);

  return null;
}
