"use client";
import { useState } from "react";
import { Check, FileText, LoaderCircle, Search, X } from "lucide-react";
import { Example, ExampleWrapper } from "@/components/example";
import { Trace, TraceCollapsible, TraceCollapsibleContent, TraceCollapsibleTrigger, TraceDescription, TraceIcon, TraceLine, TraceTitle } from "@/components/ui/trace";
import { Button } from "@/components/ui/button";
import { CodeBlock, CodeBlockContent } from "@/components/ui/code-block";
export default function TraceExample() {
 const [complete,setComplete]=useState(false);
 return <ExampleWrapper className="md:grid-cols-1"><Example title="Açılabilir işlem adımları"><Trace><TraceLine><TraceIcon><Check /></TraceIcon><TraceTitle>Proje dosyaları okundu</TraceTitle><TraceDescription>0.4 sn</TraceDescription></TraceLine><TraceCollapsible defaultOpen><TraceCollapsibleTrigger><TraceLine><TraceIcon><Search /></TraceIcon><TraceTitle>Tema tokenları incelendi</TraceTitle></TraceLine></TraceCollapsibleTrigger><TraceCollapsibleContent><CodeBlock size="sm"><CodeBlockContent>{"styles/tokens.css\nAçık ve koyu tema eşlemeleri bulundu."}</CodeBlockContent></CodeBlock></TraceCollapsibleContent></TraceCollapsible><TraceLine status={complete?undefined:"running"}><TraceIcon>{complete?<Check/>:<LoaderCircle className="animate-spin motion-reduce:animate-none"/>}</TraceIcon><TraceTitle>{complete?"Kontrol tamamlandı":"Görsel kontrol sürüyor"}</TraceTitle></TraceLine><TraceLine status="pending"><TraceIcon><FileText/></TraceIcon><TraceTitle>Sonraki adım bekliyor</TraceTitle></TraceLine><TraceLine status="error"><TraceIcon><X/></TraceIcon><TraceTitle>Örnek hata: bağlantı kurulamadı</TraceTitle></TraceLine></Trace><Button variant="outline" onClick={()=>setComplete(v=>!v)}>{complete?"Yeniden başlat":"Adımı tamamla"}</Button></Example></ExampleWrapper>;
}
