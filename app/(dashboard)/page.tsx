import { DataCharts } from "@/components/shared/dashboard/data-charts";
import { DataGrid } from "@/components/shared/dashboard/data-grid";

const DashboardPage = () => {
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <DataGrid />
      <DataCharts />
    </div>
  );
};

export default DashboardPage;
