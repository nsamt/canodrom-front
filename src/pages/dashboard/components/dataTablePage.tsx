import { Suspense, useEffect, useState } from "react";
import { columns } from "../../../components/dataTable/columns";
import { DataTable } from "../../../components/dataTable/dataTable";
import { fetchActivities } from "../../../api/Api";
import { EventsList } from "../interfaces/interfaces";

const DataTablePageContent = ({
  onRowClick,
  onTotalschange,
  onTypeCountsChange,
  onThemeCountsChange,
  initialTotals,
}: DataTablePageProps) => {
  const [data, setData] = useState<EventsList[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const events = await fetchActivities();
        setData(events);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        onRowClick={onRowClick}
        onTotalschange={onTotalschange}
        onTypeCountsChange={onTypeCountsChange}
        onThemeCountsChange={onThemeCountsChange}
        initialTotals={initialTotals}
      />
    </div>
  );
};

export interface DataTablePageProps {
  onRowClick: (data: EventsList) => void;
  onTotalschange: (newTotals: EventsList) => void;
  initialTotals: EventsList;
  onTypeCountsChange: (newTypeCounts: any) => void;
  onThemeCountsChange: (newThemeCounts: any) => void;
}

const DataTablePage = ({
  onRowClick,
  onTotalschange,
  initialTotals,
  onTypeCountsChange,
  onThemeCountsChange,
}: DataTablePageProps) => {
  return (
    <Suspense fallback={<div>Cargando datos...</div>}>
      <DataTablePageContent
        onRowClick={onRowClick}
        onTotalschange={onTotalschange}
        initialTotals={initialTotals}
        onTypeCountsChange={onTypeCountsChange} // Cambia handleTypeCountsChange a onTypeCountsChange
        onThemeCountsChange={onThemeCountsChange}
      />
    </Suspense>
  );
};

export default DataTablePage;
