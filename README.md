# Aether Theme

Ortak açık/koyu palet, Geist + JetBrains Mono fontları ve shadcn uyumlu Tailwind CSS v4 tokenları. Proje şablonu değildir; var olan uygulamaya kurulan CSS paketidir. JavaScript veya Next.js bağımlılığı yoktur.

## Temayı geliştirme

Bu repo hem tema paketini hem de `demo/` içindeki Next.js + shadcn geliştirme uygulamasını içerir. Node.js 22 kullanabilirsin. Repo kökünde:

```bash
npm ci
npm run dev
```

http://127.0.0.1:3000 adresini aç. Renkleri `styles/tokens.css`, fontları `styles/fonts.css`, eşlemeleri `styles/tailwind.css`, temel tipografiyi `styles/typography.css` içinde düzenle. Demo yerel pakete bağlıdır; CSS değişiklikleri geliştirme sunucusunda anında görünür. Tema yayımlamak, GitHub'dan tekrar kurmak veya CSS dosyası kopyalamak gerekmez.

```text
styles/    Ortak tema paketi
demo/      Next.js + gerçek shadcn bileşenleriyle önizleme
tests/     Paket kontrolleri
```

Demo ana sayfası `demo/app/page.tsx` içindeki aranabilir katalogdur. Dokümantasyonun **All Components** bölümündeki 66 bileşenin her biri `/components/<bilesen>` adresinde açılır. Kaynak listesi `demo/lib/component-catalog.json`, canlı dokümandan bağımsız çıkarılan karşılaştırma listesi `demo/lib/docs-component-snapshot.json` içindedir (19 Ekim 2026).

59 sayfa resmî shadcn örneklerinden uyarlanmıştır; Data Table, Date Picker, Direction, Typography, Message, Message Scroller ve Trace için gerçek shadcn bileşenlerini kullanan yerel örnekler vardır. Data Table güncel TanStack Table v9 kullanır. Mesaj ve işlem akışı örnekleri API anahtarı gerektirmeyen yerel örnek verilerdir. `demo/THIRD_PARTY_NOTICES.md` kaynak ve lisans bilgisini içerir.

Örnekler `demo/examples/`, gerçek UI bileşenleri `demo/components/ui/` içindedir. Demo bileşenini değiştirmek, diğer uygulamaların bileşen kodunu değiştirmez; paylaşılan kısım `styles/` altındaki temadır. Yeni shadcn bileşenlerini `demo/` klasöründe ekle; oradaki `components.json` ayarlarını ve tema importunu koru.

`npm test` paket kontrollerini, `npm run build` demo derlemesini, `npm run typecheck` TypeScript kontrolünü çalıştırır. `npm pack` yalnızca tema dosyalarını ve paket dokümanını dağıtır; `demo/`, Next.js ve React bağımlılıkları tema paketine girmez. Npm workspaces sayesinde tek kurulum ve tek kilit dosyası kullanılır. Windows çalışma alanında Turbopack alt süreç hatası görüldüğü için demo, Next.js’in desteklediği Webpack derleyicisini kullanır. Eski uygulama dizinine ihtiyaç yoktur.

## Kullanım

Kaynak repo: https://github.com/xkintaro/aether (özel). npm yayını henüz yapılmadı; şu an doğrudan GitHub sürümünden kurulabilir:

```bash
npm install git+https://github.com/xkintaro/aether.git#v0.1.0
```

Özel repo olduğu için kurulum yapan bilgisayarda GitHub erişimi gerekir. Paket adı yine `@xkintaro/aether-theme` olarak kullanılır. Yerel dağıtım için `npm pack` ile `.tgz` üretilebilir. Npm yayını tamamlanınca kurulum `npm install @xkintaro/aether-theme` olacaktır; npm scope'u yayımlayacak hesabın sahipliğine göre kesinleştirilmelidir.

Tailwind v4 + shadcn projesinde `globals.css`:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
@import "@xkintaro/aether-theme";
```

Eski tema `:root` / `.dark` tanımlarını, tema eşlemelerini ve `next/font` font değişkenlerini kaldır. Çakışan font sınıflarını layout'tan çıkar. Paket fontları kendi bağımlılıklarından yükler; Google sunucularına tarayıcı isteği yapmaz. Türkçe latin-ext dahildir.

Mevcut shadcn `components.json`, bileşen dosyaları ve `next-themes` kurulumu korunur. `<html>` üzerindeki `.dark` sınıfı koyu temayı seçer. Tema seçicinin durumu ve saklanması uygulamanın sorumluluğundadır. Yalnızca açık ve koyu tema vardır.

```tsx
<Button>Kaydet</Button>
<div className="bg-card text-card-foreground border border-border rounded-lg">
  Her projede aynı tema.
</div>
```

## İçerik

- Varsayılan import: fontlar, tüm renk tokenları, Tailwind eşlemeleri ve temel tipografi.
- `@xkintaro/aether-theme/tokens.css`: Tailwind kullanmayan projeler için yalnızca CSS renk değişkenleri.
- `@xkintaro/aether-theme/fonts.css`: Font dosyaları ve kaynak font değişkenleri.
- `@xkintaro/aether-theme/tailwind.css`: İsteğe bağlı ayrı Tailwind v4 eşlemeleri.

Bu paket renk, font ve köşe tutarlılığını sağlar. Bileşen kodunu dağıtmaz; ortak buton/kart davranışları gelecekte ayrı bir UI paketine taşınabilir.

## Geliştirme ve sürümler

```bash
npm ci
npm test
npm pack
```

Tema değişince sürümü yükselt (`npm version patch`), kontrol et ve yayımla. Uygulamalarda yeni sürüme geçmek açıkça yapılan bir bağımlılık güncellemesidir; kendiliğinden güncellenmez. Aynı görünüm için projelerde aynı paket sürümünü kullan.

Yayımlama komutu `npm publish --access public` olur; önce GitHub repo ve npm hesap/scope sahipliği tamamlanmalıdır. Bu repo kullanıcıya ait tema kodudur; yeniden dağıtım lisansı seçilmediği için UNLICENSED olarak işaretlenmiştir. Fontların lisansları kendi bağımlılık paketlerinde bulunur.
