import type { Metadata } from "next";
import "./globals.css";
import { DemoNotifications } from "@/components/demo-notifications";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: "Aether",
  description: "Aether",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className="min-h-svh antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange themes={["light", "dark"]} storageKey="aether-demo-theme">
          <TooltipProvider>{children}<DemoNotifications /></TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
