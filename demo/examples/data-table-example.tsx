"use client";
import { useMemo, useState } from "react";
import { flexRender, useTable, tableFeatures, columnFilteringFeature, columnVisibilityFeature, rowPaginationFeature, rowSelectionFeature, rowSortingFeature, createFilteredRowModel, createPaginatedRowModel, createSortedRowModel, filterFn_includesString, sortFn_alphanumeric, sortFn_basic, type ColumnDef, type SortingState } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Example, ExampleWrapper } from "@/components/example";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
type Payment = { id: string; email: string; amount: number; status: string };
const data: Payment[] = Array.from({ length: 12 }, (_, i) => ({ id: String(i + 1), email: ["ayse", "deniz", "can", "ece", "ali", "zeynep"][i % 6] + (i + 1) + "@example.com", amount: 120 + i * 45, status: i % 3 === 0 ? "Bekliyor" : "Tamamlandı" }));
const features = tableFeatures({columnFilteringFeature, columnVisibilityFeature, rowPaginationFeature, rowSelectionFeature, rowSortingFeature, filteredRowModel: createFilteredRowModel(), paginatedRowModel: createPaginatedRowModel(), sortedRowModel: createSortedRowModel(), filterFns:{includesString:filterFn_includesString}, sortFns:{alphanumeric:sortFn_alphanumeric,basic:sortFn_basic}});
const columns: ColumnDef<typeof features, Payment>[] = [
  { id: "select", header: ({ table }) => <Checkbox aria-label="Tüm satırları seç" checked={table.getIsAllPageRowsSelected()} onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)} />, cell: ({ row }) => <Checkbox aria-label={`${row.original.email} seç`} checked={row.getIsSelected()} onCheckedChange={value => row.toggleSelected(!!value)} />, enableSorting: false },
  { accessorKey: "email", filterFn: "includesString", sortFn: "alphanumeric", header: ({ column }) => <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>E-posta <ArrowUpDown /></Button> },
  { accessorKey: "status", header: "Durum", cell: ({ row }) => <Badge variant="secondary">{row.original.status}</Badge> },
  { accessorKey: "amount", sortFn: "basic", header: ({ column }) => <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Tutar <ArrowUpDown /></Button>, cell: ({ row }) => new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" }).format(row.original.amount) },
];
export default function DataTableExample() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filter, setFilter] = useState("");
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({pageIndex: 0, pageSize: 5});
  const columnFilters = useMemo(() => filter ? [{id: "email", value: filter}] : [], [filter]);
  const table = useTable({ features, data, columns, state: { sorting, columnFilters, rowSelection, pagination }, onSortingChange: setSorting, onPaginationChange: setPagination, onRowSelectionChange: setRowSelection, initialState: { pagination: { pageIndex: 0, pageSize: 5 } } });
  return <ExampleWrapper className="md:grid-cols-1"><Example title="Sıralama, filtreleme, seçim ve sayfalama" className="gap-4"><Input aria-label="E-posta filtrele" placeholder="E-posta filtrele…" value={filter} onChange={e => setFilter(e.target.value)} className="max-w-sm" /><div className="w-full overflow-auto rounded-lg border"><Table><TableHeader>{table.getHeaderGroups().map(group => <TableRow key={group.id}>{group.headers.map(header => <TableHead key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</TableHead>)}</TableRow>)}</TableHeader><TableBody>{table.getRowModel().rows.length ? table.getRowModel().rows.map(row => <TableRow key={row.id} data-state={row.getIsSelected() ? "selected" : undefined}>{row.getVisibleCells().map(cell => <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>)}</TableRow>) : <TableRow><TableCell colSpan={columns.length} className="py-8 text-center">Sonuç bulunamadı.</TableCell></TableRow>}</TableBody></Table></div><div className="flex w-full flex-wrap items-center justify-between gap-4"><p className="text-xs text-muted-foreground">{table.getFilteredSelectedRowModel().rows.length} seçili · Sayfa {table.state.pagination.pageIndex + 1} / {Math.max(1, table.getPageCount())}</p><div className="flex gap-2"><Button variant="outline" disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>Önceki</Button><Button variant="outline" disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>Sonraki</Button></div></div></Example></ExampleWrapper>;
}
