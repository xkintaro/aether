"use client";
import { Example, ExampleWrapper } from "@/components/example";
import { Message, MessageAvatar, MessageContent, MessageFooter, MessageGroup, MessageHeader } from "@/components/ui/message";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
export default function MessageExample() {
 return <ExampleWrapper className="md:grid-cols-1"><Example title="Gönderen, alıcı ve mesaj grubu"><MessageGroup className="gap-6"><Message><MessageAvatar><Avatar><AvatarFallback>A</AvatarFallback></Avatar></MessageAvatar><MessageContent><MessageHeader>Aether · 10:24</MessageHeader><Bubble><BubbleContent>Ortak tema her projede aynı hissettirir.</BubbleContent></Bubble><MessageFooter><Button variant="ghost" size="xs" onClick={() => toast.success("Mesaj beğenildi")}>Beğen</Button><span className="text-xs text-muted-foreground">Örnek mesaj</span></MessageFooter></MessageContent></Message><Message align="end"><MessageAvatar><Avatar><AvatarFallback>M</AvatarFallback></Avatar></MessageAvatar><MessageContent><MessageHeader>Sen · 10:25</MessageHeader><Bubble><BubbleContent>Açık ve koyu görünümü birlikte deneyelim.</BubbleContent></Bubble><MessageFooter className="text-xs text-muted-foreground">İletildi</MessageFooter></MessageContent></Message></MessageGroup></Example></ExampleWrapper>;
}
