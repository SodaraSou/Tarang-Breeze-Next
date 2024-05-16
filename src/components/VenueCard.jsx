import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ReservationCreateDialog from "@/components/ReservationCreateDialog";
import { Button } from "@/components/ui/button";

function VenueCard({ venue, searchData }) {
  return (
    <div
    // href={{
    //   pathname: `/venue/${venue.sport_type.name}/${venue.id}`,
    //   query: {
    //     ...searchData,
    //   },
    // }}
    >
      <Card className="bg-white rounded-xl">
        <img
          alt="Court Image"
          className="rounded-t-xl object-cover"
          height={200}
          src={venue.photo}
          style={{
            aspectRatio: "350/200",
            objectFit: "cover",
          }}
        />
        <CardHeader>
          <CardTitle>{venue.name}</CardTitle>
          <CardDescription>Type : {venue.sport_type.name}</CardDescription>
          <CardDescription>Size of the Court : {venue.size}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end">
            <ReservationCreateDialog
              venue={venue}
              searchData={searchData}
              isUser={true}
              triggerContent={
                <Button
                  variant="outline"
                  className="bg-[#2ad5a5] hover:bg-[#9c87f2] text-white hover:text-white cols-span-1 md:col-span-2 xl:col-span-1"
                >
                  Reserve Venue
                </Button>
              }
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default VenueCard;
