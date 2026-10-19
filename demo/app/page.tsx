import { GalleryHeader } from "@/components/gallery-header";
import { ComponentCatalog } from "@/components/component-catalog";
export default function Home() {
 return <><GalleryHeader/><main id="main" className="mx-auto max-w-7xl space-y-10 px-5 py-10 sm:px-8 sm:py-14"><section className="space-y-5"><p className="font-mono text-xs tracking-widest text-muted-foreground">AETHER / BİLEŞEN KATALOĞU</p><h1 className="max-w-4xl text-3xl leading-tight font-bold sm:text-5xl">Her bileşen.<br/>Aynı tasarım dili.</h1><p className="max-w-2xl text-muted-foreground">Shadcn dokümantasyonundaki 66 bileşenin tamamı. Gerçek bileşenler, resmî örnekler ve Aether teması; açık ve koyu görünümde.</p></section><ComponentCatalog/><footer className="border-t pt-6 font-mono text-xs text-muted-foreground">Kaynak: shadcn/ui · Base UI · Liste kontrolü: 19 Ekim 2026</footer></main></>;
}
