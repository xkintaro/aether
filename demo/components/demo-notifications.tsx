"use client";
import {Toaster} from "@/components/ui/toast";
import {Toaster as Sonner} from "sonner";
import {useTheme} from "next-themes";
export function DemoNotifications(){const {resolvedTheme}=useTheme();return <><Toaster/><Sonner theme={resolvedTheme==="dark"?"dark":"light"} toastOptions={{style:{background:"var(--popover)",color:"var(--popover-foreground)",borderColor:"var(--border)"}}}/></>;}
