import Link from "next/link";
import { notFound } from "next/navigation";
import catalog from "@/lib/component-catalog.json";
import { exampleLoaders } from "@/examples/registry";
import { GalleryHeader } from "@/components/gallery-header";

export function generateStaticParams() { return catalog.components.map(({slug}) => ({slug})); }
export async function generateMetadata({params}:{params:Promise<{slug:string}>}) {
 const {slug}=await params; const item=catalog.components.find(i=>i.slug===slug);
 return {title:item?`${item.name} · Aether`:"Aether"};
}
export default async function ComponentPage({params}:{params:Promise<{slug:string}>}) {
 const {slug}=await params;
 const index=catalog.components.findIndex(i=>i.slug===slug);
 if(index<0 || !(slug in exampleLoaders)) notFound();
 const item=catalog.components[index];
 const Demo=(await exampleLoaders[slug as keyof typeof exampleLoaders]()).default;
 const previous=catalog.components[index-1], next=catalog.components[index+1];
 return <><GalleryHeader/><main id="main" className="mx-auto max-w-7xl space-y-8 px-5 py-10 sm:px-8">
   <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-muted-foreground"><Link href="/" className="hover:text-foreground">← Tüm bileşenler ({catalog.components.length})</Link><span>{index+1} / {catalog.components.length}</span></div>
   <div className="flex flex-wrap items-end justify-between gap-4"><div className="space-y-2"><p className="font-mono text-xs text-muted-foreground">SHADCN / BASE UI</p><h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{item.name}</h1></div><a href={item.docs} target="_blank" rel="noreferrer" className="font-mono text-xs underline underline-offset-4">Resmî doküman ↗</a></div>
   <div data-component-demo={slug} className="min-w-0"><Demo/></div>
   <nav aria-label="Bileşenler arasında gezinme" className="flex justify-between gap-4 border-t pt-6 text-sm">{previous?<Link href={`/components/${previous.slug}`} className="hover:underline">← {previous.name}</Link>:<span/>}{next&&<Link href={`/components/${next.slug}`} className="hover:underline">{next.name} →</Link>}</nav>
 </main></>;
}
