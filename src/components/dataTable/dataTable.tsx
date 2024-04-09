import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { EventsList } from "@/pages/dashboard/interfaces/interfaces";


export interface DataTableProps<TData extends EventsList, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowClick?: (data: TData) => void;
  onTotalschange: (newTotals: EventsList) => void;
  onTypeCountsChange: (newTypeCounts: any) => void;
  onThemeCountsChange: (newThemeCounts: any) => void;
  initialTotals: EventsList;
}

export function DataTable<TData extends EventsList, TValue>({
  columns,
  data,
  onRowClick,
  onTotalschange,
  onTypeCountsChange,
  onThemeCountsChange,
  initialTotals,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [filterType, setFilterType] = useState("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [tableData, setTableData] = useState<TData[]>(data);
  const [_totals, setTotals] = useState<EventsList>(initialTotals);
  const [_typeCounts, setTypeCounts] = useState<{ [key: string]: number }>({});
  const [_themeCounts, setThemeCounts] = useState<{ [key: string]: number }>(
    {}
  );

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const fetchData = async (endpoint: string) => {
    try {
      const response = await fetch(endpoint);
      const newData = await response.json();
      setTableData(newData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFilterTypeChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedFilterType = event.target.value;
    setFilterType(selectedFilterType);

    let endpoint = "";
    switch (selectedFilterType) {
      case "last-three-months":
        endpoint = "http://localhost:3000/events/filter/last-three-months";
        break;
      case "last-six-months":
        endpoint = "http://localhost:3000/events/filter/last-six-months";
        break;
      case "last-year":
        endpoint = "http://localhost:3000/events/filter/last-year";
        break;
      case "all-events":
        endpoint = "http://localhost:3000/events/filter/all-events";
        break;
      default:
        break;
    }

    if (endpoint) {
      await fetchData(endpoint);
    }
  };
  const handleFilterByDateRange = async () => {
    if (!startDate || !endDate) {
      console.error("Por favor selecciona las fechas de inicio y fin.");
      return;
    }

    const endpoint = `http://localhost:3000/events/filter/by-date-range?startDate=${startDate}&endDate=${endDate}`;

    await fetchData(endpoint);
  };
  useEffect(() => {
    const themeCounts = table.getRowModel().rows.reduce((acc, row) => {
      const theme = row.original.theme;
      if (theme) {
        if (!acc[theme]) {
          acc[theme] = 1;
        } else {
          acc[theme] += 1;
        }
      }
      return acc;
    }, {} as { [key: string]: number });

    console.log("contadortemas", themeCounts);
  }, [table.getRowModel().rows]);

  useEffect(() => {
    const calculateTotals = () => {
      const totals = table.getRowModel().rows.reduce((acc, row) => {
        acc.attendees += row.original.attendees;
        acc.femaleAttendees += row.original.femaleAttendees;
        acc.maleAttendees += row.original.maleAttendees;
        acc.nonBinaryAttendees += row.original.nonBinaryAttendees;
        acc.undisclosedAttendees += row.original.undisclosedAttendees;
        acc.heardThroughTwitter += row.original.heardThroughTwitter;
        acc.heardThroughFacebook += row.original.heardThroughFacebook;
        acc.heardThroughInstagram += row.original.heardThroughInstagram;
        acc.heardThroughMastodon += row.original.heardThroughMastodon;
        acc.heardThroughNewsletter += row.original.heardThroughNewsletter;
        acc.heardThroughWeb += row.original.heardThroughWeb;
        acc.heardThroughSigns += row.original.heardThroughSigns;
        acc.heardThroughOther += row.original.heardThroughOther;
        return acc;
      }, initialTotals);
      return totals;
    };
    const newTotals = calculateTotals();
    setTotals(newTotals);
    onTotalschange(newTotals);
  }, [table.getRowModel().rows]);

  useEffect(() => {
    const calculateThemeCounts = () => {
      const themeCounts = table.getRowModel().rows.reduce((acc, row) => {
        const theme = row.original.theme;
        if (theme) {
          if (!acc[theme]) {
            acc[theme] = 1;
          } else {
            acc[theme] += 1;
          }
        }
        return acc;
      }, {} as { [key: string]: number });
      return themeCounts;
    };

    const newThemeCounts = calculateThemeCounts();
    setThemeCounts(newThemeCounts);
    onThemeCountsChange(newThemeCounts);
  }, [table.getRowModel().rows]);

  useEffect(() => {
    const calculateTypeCounts = () => {
      const typeCounts = table.getRowModel().rows.reduce((acc, row) => {
        const type = row.original.type;
        if (type) {
          if (!acc[type]) {
            acc[type] = 1;
          } else {
            acc[type] += 1;
          }
        }
        return acc;
      }, {} as { [key: string]: number });
      return typeCounts;
    };

    const newTypeCounts = calculateTypeCounts();
    setTypeCounts(newTypeCounts);
    onTypeCountsChange(newTypeCounts);
  }, [table.getRowModel().rows]);

  return (
    <>
      <div className="rounded-md border shadow-lg border-gray-300 w-[93vw]">
      <div className="flex flex-col md:flex-row md:justify-between md:px-4 items-center p-4 space-y-4 md:space-y-0 md:space-x-4">
  <Input
    placeholder="Cerca títol"
    value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
    onChange={(event) =>
      table.getColumn("title")?.setFilterValue(event.target.value)
    }
    className="w-full md:w-1/4 md:max-w-sm mb-4 md:mb-0"
  />
  <Input
    placeholder="Cerca temàtica"
    value={(table.getColumn("theme")?.getFilterValue() as string) ?? ""}
    onChange={(event) =>
      table.getColumn("theme")?.setFilterValue(event.target.value)
    }
    className="w-full md:w-1/4 md:max-w-sm mb-4 md:mb-0"
  />
  <Input
    placeholder="Cerca tipus d'activitat"
    value={(table.getColumn("type")?.getFilterValue() as string) ?? ""}
    onChange={(event) =>
      table.getColumn("type")?.setFilterValue(event.target.value)
    }
    className="w-full md:w-1/4 md:max-w-sm mb-4 md:mb-0"
  />
  <select
    value={filterType}
    onChange={handleFilterTypeChange}
    className="form-select text-sm w-full md:w-1/4 border p-2 rounded-md md:max-w-sm mb-4 md:mb-0"
  >
    <option value="">Sel·lecció </option>
    <option value="all-events">Tots als esdeveniments</option>
    <option value="last-three-months">Últims tres mesos</option>
    <option value="last-six-months">Últims sis meses</option>
    <option value="last-year">Últim any</option>
  </select>
  <div className="flex flex-col md:flex-row w-[700px]  gap-4 border p-2 rounded-md text-sm ">
    <input
      type="date"
      value={startDate}
      onChange={(event) => setStartDate(event.target.value)}
      className="form-select w-full md:w-1/3 md:max-w-sm mb-4 md:mb-0"
    />
    <input
      type="date"
      value={endDate}
      onChange={(event) => setEndDate(event.target.value)}
      className="form-select w-full md:w-1/3 bg- md:max-w-sm mb-4 md:mb-0"
    />
    <button
      className="w-full md:w-1/3  border rounded-md bg-slate-100 hover:bg-[#46FCD6] text-sm  transition-colors"
      onClick={handleFilterByDateRange}
    >
      Filtre per data
    </button>
  </div>
</div>
        <ScrollArea className="h-[500px] rounded-md border p-4">
          <Table className="shadow-xl">
            <TableHeader>
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
                    className="cursor-pointer hover:bg-[#46FCD6]"
                    data-state={row.getIsSelected() && "selected"}
                    onClick={() => onRowClick?.(row.original)}
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
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </>
  );
}
