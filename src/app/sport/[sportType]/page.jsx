import UserLayout from "@/app/UserLayout";
import FilterSearch from "@/components/FilterSearch";

function SportTypePage({ params }) {
  const { sportType } = params;
  const type = sportType[0].toUpperCase() + sportType.slice(1);
  return (
    <UserLayout>
      <section className="p-4 md:p-10">
        <div className="flex flex-col gap-4 md:gap-10">
          <div className="bg-white max-w-7xl h-[300px] flex items-center justify-center">
            <FilterSearch data={type}/>
          </div>
        </div>
      </section>
    </UserLayout>
  );
}

export default SportTypePage;
