import Image from "next/image";
import AdminLayout from "@/app/AdminLayout";
import Calendar from "@/components/Calendar";
import ReservationTable from "@/components/ReservationTable";

function ReservationPage() {
  return (
    <AdminLayout>
      <Calendar />
      <ReservationTable />
    </AdminLayout>
  );
}

export default ReservationPage;
