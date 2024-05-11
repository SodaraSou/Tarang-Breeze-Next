import UserLayout from "@/app/UserLayout";
import Venue from "@/components/Venue";

function SingleVenuePage({ params }) {
  return (
    <UserLayout>
      <Venue venueId={params.id} />
    </UserLayout>
  );
}

export default SingleVenuePage;
