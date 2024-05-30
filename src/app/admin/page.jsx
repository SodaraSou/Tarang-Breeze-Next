import StatisticsCard from "@/components/StatisticsCard";
import DashboardReservationTable from "@/components/DashboardReservationTable";
import DashboardTeamTable from "@/components/DashboardTeamTable";
function AdminHomePage() {
  return (
    <>
      <StatisticsCard />
      <div className="grid gap-4 xl:gap-10 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <DashboardReservationTable />
        </div>
        <div>
          <DashboardTeamTable />
        </div>
      </div>
    </>
  );
}

export default AdminHomePage;
