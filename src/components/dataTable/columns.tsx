import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "../ui/button";
import { EventsList } from "@/pages/dashboard/interfaces/interfaces";


export const columns: ColumnDef<EventsList>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
        return (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Títol
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
    }
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => {
        return (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Data
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
    }
  },
  {
    accessorKey: "repetition",
    header: ({ column }) => {
        return (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Repetició
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
    }
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
        return (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Tipus
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
    }
  },
  {
    accessorKey: "theme",
    header: ({ column }) => {
        return (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Temàtica
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
    }
  },
  {
    accessorKey: "attendees",
    header: ({ column }) => {
        return (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Assistents
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
    }
  },
  {
    accessorKey: "femaleAttendees",
    header: ({ column }) => {
        return (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                F
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
    }
  },
  {
    accessorKey: "maleAttendees",
    header: ({ column }) => {
        return (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                M
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
    }
  },
  {
    accessorKey: "nonBinaryAttendees",
    header: ({ column }) => {
        return (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                NB
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
    }
  },
  {
    accessorKey: "undisclosedAttendees",
    header: ({ column }) => {
        return (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                NC
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
    }
  },
  {
    accessorKey: "public",
    header: "Públic",
  },
  {
    accessorKey: "organizer",
    header: "Organitzador",
  },
]
