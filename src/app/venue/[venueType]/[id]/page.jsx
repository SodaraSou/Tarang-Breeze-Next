import UserLayout from "@/app/UserLayout";
import Venue from "@/components/Venue";

function SingleVenuePage({ params, searchParams }) {
  return (
    <UserLayout>
      <Venue venueId={params.id} searchData={searchParams} />
    </UserLayout>
  );
}

export default SingleVenuePage;
