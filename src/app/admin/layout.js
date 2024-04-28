import { redirect } from "next/navigation";
import { getUser } from "@/services/user";
import AdminHeader from "@/components/AdminHeader";
import AdminSidebar from "@/components/AdminSidebar";

export default async function AdminLayout({ children }) {
  // const data = await getUser();
  // if (data !== undefined) {
  //   if (data?.data.is_admin !== 1) {
  //     redirect("/");
  //   }
  // } else {
  //   redirect("/login");
  // }
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <AdminSidebar />
      <div className="flex flex-col">
        <AdminHeader />
        <main className="flex flex-1 flex-col gap-4 p-4 xl:gap-10 xl:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
