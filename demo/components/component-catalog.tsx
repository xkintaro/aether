"use client";
import {useState} from "react";
import Link from "next/link";
import {Search,ArrowUpRight} from "lucide-react";
import catalog from "@/lib/component-catalog.json";
import {Input} from "@/components/ui/input";
export function ComponentCatalog() {
 const [query,setQuery]=useState("");
 const visible=catalog.components.filter(i=>i.name.toLowerCase().includes(query.toLowerCase()));
 return <section className="space-y-6"><div className="flex flex-wrap items-center justify-between gap-4"><div className="relative w-full max-w-sm"><Search className="absolute top-2 left-3 size-4 text-muted-foreground"/><Input aria-label="Bileşen ara" placeholder="Bileşen ara…" value={query} onChange={e=>setQuery(e.target.value)} className="pl-9"/></div><p aria-live="polite" className="font-mono text-xs text-muted-foreground">{visible.length} / {catalog.components.length} bileşen</p></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{visible.map(item=><Link data-catalog-item={item.slug} key={item.slug} href={`/components/${item.slug}`} className="group flex min-h-24 items-center justify-between gap-4 rounded-xl border border-border bg-card p-5 text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"><div className="space-y-1"><h2 className="font-heading text-sm font-semibold">{item.name}</h2><p className="font-mono text-[11px] text-muted-foreground">{item.slug}</p></div><ArrowUpRight className="size-4 shrink-0 text-muted-foreground"/></Link>)}</div>{!visible.length&&<p className="rounded-xl border border-dashed p-10 text-center text-muted-foreground">Eşleşen bileşen bulunamadı.</p>}</section>;
}
