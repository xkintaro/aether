"use client";
import { useState } from "react";
import { DirectionProvider } from "@/components/ui/direction";
import { Example, ExampleWrapper } from "@/components/example";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
export default function DirectionExample() {
  const [direction, setDirection] = useState<"ltr" | "rtl">("ltr");
  return <ExampleWrapper className="md:grid-cols-1"><Example title="LTR / RTL yön sağlayıcısı"><div className="flex gap-2"><Button variant={direction === "ltr" ? "default" : "outline"} aria-pressed={direction === "ltr"} onClick={() => setDirection("ltr")}>LTR</Button><Button variant={direction === "rtl" ? "default" : "outline"} aria-pressed={direction === "rtl"} onClick={() => setDirection("rtl")}>RTL</Button></div><DirectionProvider direction={direction}><div dir={direction} className="w-full space-y-4 rounded-lg border bg-muted p-6"><Label htmlFor="direction-name">{direction === "rtl" ? "اسم المشروع" : "Proje adı"}</Label><Input id="direction-name" placeholder={direction === "rtl" ? "مشروع جديد" : "Yeni proje"} /><Button>{direction === "rtl" ? "متابعة" : "Devam et"}<ArrowRight className="rtl:rotate-180" /></Button></div></DirectionProvider></Example></ExampleWrapper>;
}
