import UserLayout from "@/app/UserLayout";
import FilterSearch from "@/components/FilterSearch";

function SingleSportTypePage({ params }) {
  const { id } = params;
  return (
    <UserLayout>
      <section className="p-4 md:p-10">
        <div className="flex flex-col gap-4 md:gap-10">
          <div className="bg-white max-w-7xl h-[300px] flex items-center justify-center">
            <FilterSearch sportId={id}/>
          </div>
        </div>
      </section>
    </UserLayout>
  );
}

export default SingleSportTypePage;
