"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  Edit,
  MoreHorizontal,
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MealCell } from "./meal-cell";

const data: Alimentation[] = [
  {
    id: 1,
    calories: 450,
    carb: 34,
    fat: 10,
    protein: 4,
    quantity: 240,
    unit: "g",
    meal: "others",
    name: "Ovo com pão",
  },
  {
    id: 1,
    calories: 450,
    carb: 34,
    fat: 10,
    protein: 4,
    quantity: 240,
    unit: "g",
    meal: "lunch",
    name: "Ovo com pão",
  },
  {
    id: 1,
    calories: 450,
    carb: 34,
    fat: 10,
    protein: 4,
    quantity: 240,
    unit: "g",
    meal: "breakfast",
    name: "Ovo com pão",
  },
  {
    id: 1,
    calories: 450,
    carb: 34,
    fat: 10,
    protein: 4,
    quantity: 240,
    unit: "g",
    meal: "dinner",
    name: "Ovo com pão",
  },
];

export type Alimentation = {
  id: number;
  calories: number;
  name: string;
  carb: number;
  fat: number;
  protein: number;
  quantity: number;
  unit: "g" | "ml";
  meal: "breakfast" | "lunch" | "dinner" | "others";
};

export const columns: ColumnDef<Alimentation>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "meal",
    header: "Refeição",
    cell: ({ row }) => <MealCell meal={row.getValue("meal")} />,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "calories",
    header: () => <div>Calorias</div>,
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("calories")}</div>
    ),
  },
  {
    accessorKey: "carb",
    header: () => <div>Carboidratos</div>,
    cell: ({ row }) => <div className="lowercase">{row.getValue("carb")}</div>,
  },
  {
    accessorKey: "fat",
    header: () => <div>Gorduras</div>,
    cell: ({ row }) => <div className="lowercase">{row.getValue("fat")}</div>,
  },
  {
    accessorKey: "protein",
    header: () => <div>Proteínas</div>,
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("protein")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <Edit size={16} />;
    },
  },
];

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex justify-between items-center px-6 py-5 border rounded-t-lg">
        <div className="flex flex-col gap-1">
          <div className="flex gap-2">
            <p className="text-lg font-medium">Diário alimentar</p>
            <span className="text-xs self-center p-1 font-medium rounded-lg bg-zinc-100 text-green-600">
              13/11/2025
            </span>
          </div>
          <p className="text-sm">
            Registre aqui todas as suas refeições do dia
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant={"destructive"}>Deletar Selecionados</Button>
          <Button>
            <Plus />
            Registrar Refeição
          </Button>
        </div>
      </div>
      <div className="overflow-hidden border">
        <Table>
          <TableHeader className="bg-[#E8EEF3] text-[#607D8B]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sem registros.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} linha(s) selecionadas.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próxima
          </Button>
        </div>
      </div>
    </div>
  );
}
