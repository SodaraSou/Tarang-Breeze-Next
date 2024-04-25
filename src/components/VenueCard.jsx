import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function VenueCard({ venue }) {
  return (
    <Link href={`/venue/${venue.sportTypes.name}/${venue.id}`}>
      <Card className="bg-white rounded-xl">
        <img
          alt="Court Image"
          className="rounded-t-xl object-cover"
          height={200}
          src="/placeholder.svg"
          style={{
            aspectRatio: "350/200",
            objectFit: "cover",
          }}
          width={350}
        />
        <CardHeader>
          <CardTitle>{venue.name}</CardTitle>
          <CardDescription>Type : {venue.sportTypes.name}</CardDescription>
          <CardDescription>Size of the Court : {venue.size}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}

export default VenueCard;
