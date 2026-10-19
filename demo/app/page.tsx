"use client";

import { useState } from "react";
import { Check, ArrowUpRight, LoaderCircle, Info, Plus, Search } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell, TableCaption } from "@/components/ui/table";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

const tokens = ["background", "foreground", "card", "popover", "primary", "primary-foreground", "secondary", "muted", "muted-foreground", "accent", "border", "input", "ring", "destructive", "success", "sidebar", "chart-1", "chart-2", "chart-3", "chart-4", "chart-5"];
const projects = [
  { name: "Aether", description: "Ortak tasarım dili", state: "Aktif", token: "primary" },
  { name: "Not defteri", description: "Kişisel çalışma alanı", state: "Taslak", token: "secondary" },
  { name: "Arşiv", description: "Bir sonraki fikir", state: "Bekliyor", token: "outline" },
] as const;

export default function Home() {
  const [notice, setNotice] = useState("");
  const [volume, setVolume] = useState([65]);
  const [notifications, setNotifications] = useState(true);
  const [accepted, setAccepted] = useState(true);
  const [query, setQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [extraProjects, setExtraProjects] = useState<string[]>([]);

  return (
    <div>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-primary focus:p-3 focus:text-primary-foreground">İçeriğe geç</a>
      <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <a href="#" className="font-heading text-lg font-bold tracking-tight">aether<span className="ml-2 text-xs font-normal text-muted-foreground">/ demo</span></a>
          <ThemeToggle />
        </div>
      </header>

      <main id="main" className="mx-auto max-w-6xl space-y-12 px-5 py-10 sm:px-8 sm:py-14">
        <section className="space-y-5">
          <p className="font-mono text-xs tracking-widest text-muted-foreground">TEMA ATÖLYESİ · 0.1</p>
          <h1 className="text-3xl leading-tight font-bold sm:text-5xl">Aynı dil. Her ayrıntıda.</h1>
          <p className="max-w-2xl text-muted-foreground">Aether temasını gerçek shadcn bileşenlerinde dene. Renkler, tipografi ve etkileşim durumları; açık ve koyu görünümde, tek bir yerde.</p>
          <nav aria-label="Demo bölümleri" className="flex flex-wrap gap-x-6 gap-y-2 pt-2 font-mono text-xs text-muted-foreground">
            {[["bilesenler", "Bileşenler"], ["tipografi", "Tipografi"], ["renkler", "Renk tokenları"]].map(([id, label]) => <a key={id} href={`#${id}`} className="underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">{label} ↗</a>)}
          </nav>
        </section>

        <section id="bilesenler" className="space-y-5">
          <SectionTitle number="01" title="Bileşenler" description="Hover, odak, seçim ve hata durumlarını dene." />
          <Tabs defaultValue="controls" className="gap-6">
            <TabsList aria-label="Bileşen grupları" className="max-w-full">
              <TabsTrigger value="controls">Kontroller</TabsTrigger>
              <TabsTrigger value="surfaces">Yüzeyler</TabsTrigger>
              <TabsTrigger value="data">Veri & durumlar</TabsTrigger>
            </TabsList>
            <TabsContent value="controls" className="space-y-6">
              <Card>
                <CardHeader><CardTitle>Butonlar</CardTitle><CardDescription>Aynı aksiyonun farklı öncelikleri.</CardDescription></CardHeader>
                <CardContent className="flex flex-wrap gap-3">
                  <Button onClick={() => setNotice("Ana aksiyon çalışıyor.")}><Plus /> Ana aksiyon</Button>
                  <Button variant="secondary" onClick={() => setNotice("İkincil aksiyon çalışıyor.")}>İkincil</Button>
                  <Button variant="outline" onClick={() => setNotice("Çerçeveli aksiyon çalışıyor.")}>Çerçeveli</Button>
                  <Button variant="ghost" onClick={() => setNotice("Ghost aksiyonu çalışıyor.")}>Ghost</Button>
                  <Button variant="destructive" onClick={() => setNotice("Bu yalnızca yıkıcı aksiyonun görsel denemesi.")}>Yıkıcı</Button>
                  <Button disabled>Devre dışı</Button>
                  <Button disabled aria-label="Yükleniyor"><LoaderCircle className="animate-spin motion-reduce:animate-none" /> Yükleniyor</Button>
                  <Tooltip><TooltipTrigger render={<Button variant="outline" size="icon" aria-label="Bileşen bilgisi"><Info /></Button>} /><TooltipContent>Gerçek shadcn tooltip yüzeyi.</TooltipContent></Tooltip>
                </CardContent>
                <CardFooter><p className="text-xs text-muted-foreground">Klavye ile Tab tuşunu kullanarak odak halkalarını kontrol edebilirsin.</p></CardFooter>
              </Card>
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader><CardTitle>Form alanları</CardTitle><CardDescription>Geist gövde metni, JetBrains Mono etiketler.</CardDescription></CardHeader>
                  <CardContent>
                    <form className="space-y-5" onSubmit={e => { e.preventDefault(); setNotice("Form doğrulandı. Bu demo sunucuya veri göndermez."); }}>
                      <div className="space-y-2"><label htmlFor="name" className="font-mono text-xs">Proje adı</label><Input id="name" name="name" placeholder="Örn. Not defteri" required /></div>
                      <div className="space-y-2"><label htmlFor="category" className="font-mono text-xs">Kategori</label><Select defaultValue="personal" items={[{ value: "personal", label: "Kişisel" }, { value: "work", label: "İş" }, { value: "idea", label: "Fikir" }]}><SelectTrigger id="category" className="w-full"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="personal">Kişisel</SelectItem><SelectItem value="work">İş</SelectItem><SelectItem value="idea">Fikir</SelectItem></SelectContent></Select></div>
                      <div className="space-y-2"><label htmlFor="description" className="font-mono text-xs">Açıklama</label><Textarea id="description" placeholder="Kısa bir açıklama yaz…" /></div>
                      <Button type="submit"><Check /> Kaydet</Button>
                    </form>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle>Seçimler & durumlar</CardTitle><CardDescription>Seçili, boş, hatalı ve devre dışı.</CardDescription></CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between gap-4"><label htmlFor="notifications" className="text-sm">Bildirimler</label><Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} /></div>
                    <div className="flex items-center gap-3"><Checkbox id="accepted" checked={accepted} onCheckedChange={setAccepted} /><label htmlFor="accepted" className="text-sm">Örnek seçimi etkinleştir</label></div>
                    <div className="space-y-3"><div className="flex justify-between text-sm"><label id="volume-label">Yoğunluk</label><span className="font-mono text-xs">%{volume[0]}</span></div><Slider aria-labelledby="volume-label" value={volume} onValueChange={v => setVolume(Array.isArray(v) ? v : [v])} min={0} max={100} /><Progress value={volume[0]} aria-label="Yoğunluk ilerlemesi" /></div>
                    <div className="space-y-2"><label htmlFor="invalid" className="font-mono text-xs">Hatalı alan</label><Input id="invalid" defaultValue="eksik-adres" aria-invalid aria-describedby="invalid-help" /><p id="invalid-help" className="text-xs text-destructive">Örnek hata: geçerli bir e-posta adresi gir.</p></div>
                    <div className="space-y-2"><label htmlFor="disabled" className="font-mono text-xs">Devre dışı alan</label><Input id="disabled" disabled placeholder="Bu alan düzenlenemez" /></div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="surfaces" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card><CardHeader><CardTitle>Bir yüzey, birkaç katman</CardTitle><CardDescription>Arka plan, kart ve muted yüzeylerin ilişkisi.</CardDescription></CardHeader><CardContent className="space-y-4"><div className="rounded-lg border border-border bg-muted p-5 text-muted-foreground">Destekleyici içerik için sakin bir yüzey.</div><p>Bu metin <strong>card-foreground</strong> rengini kullanır.</p></CardContent><CardFooter><Badge variant="secondary">Kart alt alanı</Badge></CardFooter></Card>
                <Card><CardHeader><CardTitle>Dialog & seçim yüzeyleri</CardTitle><CardDescription>Açılan panel, arka plan ve odak davranışı.</CardDescription></CardHeader><CardContent>
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}><DialogTrigger render={<Button variant="outline">Dialog aç <ArrowUpRight /></Button>} /><DialogContent><DialogHeader><DialogTitle>Yeni proje</DialogTitle><DialogDescription>Bu kayıt yalnızca açık demo oturumunda tutulur.</DialogDescription></DialogHeader><form className="space-y-5" onSubmit={e => { e.preventDefault(); if (!projectName.trim()) return; setExtraProjects(items => [...items, projectName.trim()]); setProjectName(""); setDialogOpen(false); setNotice("Örnek proje eklendi; Veri & durumlar sekmesinde görebilirsin."); }}><div className="space-y-2"><label htmlFor="new-project" className="font-mono text-xs">Proje adı</label><Input id="new-project" required value={projectName} onChange={e => setProjectName(e.target.value)} placeholder="Yeni fikir" /></div><DialogFooter><DialogClose render={<Button variant="outline" type="button">Vazgeç</Button>} /><Button type="submit">Oluştur</Button></DialogFooter></form></DialogContent></Dialog>
                </CardContent></Card>
              </div>
              <Alert><Info /><AlertTitle>Sakin bir bilgilendirme</AlertTitle><AlertDescription>Temanın varsayılan alert yüzeyi ve ikincil metin rengi.</AlertDescription></Alert>
              <Alert variant="destructive"><Info /><AlertTitle>Örnek hata durumu</AlertTitle><AlertDescription>Renk, simge ve açıklama birlikte anlam taşır.</AlertDescription></Alert>
            </TabsContent>
            <TabsContent value="data" className="space-y-6">
              <Card><CardHeader><CardTitle>Proje tablosu</CardTitle><CardDescription>Tablo satırları, hover yüzeyleri ve küçük metinler.</CardDescription></CardHeader><CardContent>
                <div className="relative mb-5 max-w-sm"><Search className="absolute top-2 left-2.5 size-4 text-muted-foreground" /><Input aria-label="Projelerde ara" placeholder="Proje ara…" className="pl-9" value={query} onChange={e => setQuery(e.target.value)} /></div>
                <Table><TableCaption>Görünüm denemesi için örnek veriler.</TableCaption><TableHeader><TableRow><TableHead>Proje</TableHead><TableHead>Açıklama</TableHead><TableHead>Durum</TableHead></TableRow></TableHeader><TableBody>{projects.filter(p => p.name.toLocaleLowerCase("tr").includes(query.toLocaleLowerCase("tr"))).map(project => <TableRow key={project.name}><TableCell className="font-medium">{project.name}</TableCell><TableCell className="text-muted-foreground">{project.description}</TableCell><TableCell><Badge variant={project.token === "primary" ? "default" : project.token}>{project.state}</Badge></TableCell></TableRow>)}{extraProjects.filter(name => name.toLocaleLowerCase("tr").includes(query.toLocaleLowerCase("tr"))).map((name, i) => <TableRow key={i}><TableCell>{name}</TableCell><TableCell className="text-muted-foreground">Demo oturumu</TableCell><TableCell><Badge variant="secondary">Yeni</Badge></TableCell></TableRow>)}{!projects.some(p => p.name.toLocaleLowerCase("tr").includes(query.toLocaleLowerCase("tr"))) && !extraProjects.some(name => name.toLocaleLowerCase("tr").includes(query.toLocaleLowerCase("tr"))) && <TableRow><TableCell colSpan={3} className="py-8 text-center text-muted-foreground">Eşleşen proje yok.</TableCell></TableRow>}</TableBody></Table>
              </CardContent></Card>
              <div className="grid gap-6 md:grid-cols-2"><Card><CardHeader><CardTitle>Etiketler</CardTitle></CardHeader><CardContent className="flex flex-wrap gap-3"><Badge>Varsayılan</Badge><Badge variant="secondary">İkincil</Badge><Badge variant="outline">Çerçeveli</Badge><Badge variant="destructive">Hata</Badge><Badge className="bg-success text-success-foreground">Başarılı</Badge></CardContent></Card><Card><CardHeader><CardTitle>Yükleme iskeleti</CardTitle></CardHeader><CardContent className="flex items-center gap-4"><Skeleton className="size-12 shrink-0 rounded-full" /><div className="w-full space-y-3"><Skeleton className="h-3 w-3/4" /><Skeleton className="h-3 w-1/2" /></div></CardContent></Card></div>
            </TabsContent>
          </Tabs>
          <p role="status" aria-live="polite" className="min-h-6 text-sm text-muted-foreground">{notice}</p>
        </section>

        <section id="tipografi" className="space-y-5">
          <SectionTitle number="02" title="Tipografi" description="İki font, ortak bir karakter." />
          <div className="grid gap-6 md:grid-cols-2">
            <Card><CardHeader><CardTitle>JetBrains Mono</CardTitle><CardDescription>Başlıklar, kontroller ve teknik metinler.</CardDescription></CardHeader><CardContent className="space-y-4 font-mono"><p className="text-3xl font-bold tracking-tight">Düşün. Tasarla. Üret.</p><p className="text-sm">Aa Bb Cc Çç Ğğ İı Öö Şş Üü</p><p className="text-xs text-muted-foreground">0123456789 · @aether/theme</p></CardContent></Card>
            <Card><CardHeader><CardTitle>Geist</CardTitle><CardDescription>Gövde metni ve uzun açıklamalar.</CardDescription></CardHeader><CardContent className="space-y-4"><p className="text-xl">Okumaya alan aç.</p><p className="leading-relaxed">İyi bir arayüz, içeriğin önüne geçmez. Rahat satır aralıkları ve tutarlı bir hiyerarşi, uzun metinleri de küçük açıklamaları da kolay okunur kılar.</p><p className="text-sm text-muted-foreground">Türkçe karakterler: ç, ğ, ı, İ, ö, ş, ü.</p></CardContent></Card>
          </div>
        </section>

        <section id="renkler" className="space-y-5">
          <SectionTitle number="03" title="Renk tokenları" description="Doğrudan paketin değişkenleri; kopya palet yok." />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">{tokens.map(token => <div key={token} className="overflow-hidden rounded-lg border border-border bg-card"><div className="h-20 border-b border-border" style={{ background: `var(--${token})` }} /><p className="overflow-hidden px-3 py-3 font-mono text-[11px] text-ellipsis text-card-foreground">--{token}</p></div>)}</div>
        </section>
        <footer className="flex flex-wrap justify-between gap-3 border-t border-border pt-6 font-mono text-xs text-muted-foreground"><span>Aether / geliştirme alanı</span><span>Next.js + shadcn · açık / koyu</span></footer>
      </main>
    </div>
  );
}

function SectionTitle({ number, title, description }: { number: string; title: string; description: string }) {
  return <div className="flex items-start gap-4"><span className="pt-1 font-mono text-xs text-muted-foreground">{number}</span><div className="space-y-1"><h2 className="text-xl font-semibold">{title}</h2><p className="text-sm text-muted-foreground">{description}</p></div></div>;
}
