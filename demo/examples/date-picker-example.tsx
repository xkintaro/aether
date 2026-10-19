"use client";
import { useState } from "react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Example, ExampleWrapper } from "@/components/example";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
export default function DatePickerExample() {
  const [date, setDate] = useState<Date>();
  const [open, setOpen] = useState(false);
  return <ExampleWrapper><Example title="Tarih seçimi"><Popover open={open} onOpenChange={setOpen}><PopoverTrigger render={<Button variant="outline" className="w-full justify-start"><CalendarIcon />{date ? format(date, "PPP", { locale: tr }) : "Tarih seç"}</Button>} /><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" locale={tr} selected={date} onSelect={value => { setDate(value); setOpen(false); }} /></PopoverContent></Popover><p aria-live="polite" className="text-sm text-muted-foreground">{date ? `Seçilen tarih: ${format(date, "dd.MM.yyyy")}` : "Henüz tarih seçilmedi."}</p></Example><Example title="Takvim içinde aralık seçimi"><RangeCalendar /></Example></ExampleWrapper>;
}
function RangeCalendar() { const [range, setRange] = useState<import("react-day-picker").DateRange>(); return <Calendar mode="range" locale={tr} selected={range} onSelect={setRange} />; }
