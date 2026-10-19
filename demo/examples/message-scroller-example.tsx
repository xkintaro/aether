"use client";
import { useState } from "react";
import { Example, ExampleWrapper } from "@/components/example";
import { MessageScroller, MessageScrollerButton, MessageScrollerContent, MessageScrollerItem, MessageScrollerProvider, MessageScrollerViewport } from "@/components/ui/message-scroller";
import { Message, MessageContent } from "@/components/ui/message";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { Button } from "@/components/ui/button";
export default function MessageScrollerExample() {
 const [count, setCount] = useState(14);
 return <ExampleWrapper className="md:grid-cols-1"><Example title="Kaydırma, yeni mesaj ve sona dönme"><div className="h-96 w-full rounded-xl border"><MessageScrollerProvider><MessageScroller><MessageScrollerViewport><MessageScrollerContent className="p-5">{Array.from({length: count},(_,i) => <MessageScrollerItem key={i} scrollAnchor={i===count-1}><Message align={i%2===0?"start":"end"}><MessageContent><Bubble><BubbleContent>Örnek mesaj {i+1}. {i%2===0?"Aether mesaj görünümü.":"Yeni içerik geldiğinde kaydırma davranışını kontrol et."}</BubbleContent></Bubble></MessageContent></Message></MessageScrollerItem>)}</MessageScrollerContent></MessageScrollerViewport><MessageScrollerButton direction="start" /><MessageScrollerButton direction="end" /></MessageScroller></MessageScrollerProvider></div><Button onClick={()=>setCount(c=>c+1)}>Mesaj ekle</Button><p className="text-xs text-muted-foreground">Yukarı kaydır, sonra yeni mesaj ekleyerek sona dönme kontrolünü dene.</p></Example></ExampleWrapper>;
}
