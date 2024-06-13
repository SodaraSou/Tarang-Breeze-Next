import Link from "next/link";
import CryptoJS, { AES } from "crypto-js";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ReservationCreateDialog from "@/components/ReservationCreateDialog";
import { Button } from "@/components/ui/button";

const encryptQueryParams = (params, secretKey) => {
  const stringifiedParams = JSON.stringify(params);
  const encryptedParams = CryptoJS.AES.encrypt(
    stringifiedParams,
    secretKey
  ).toString();
  return encryptedParams;
};

function VenueCard({ venue, searchData }) {
  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;
  const encryptedQuery = encryptQueryParams(searchData, secretKey);
  return (
    <Link
      href={{
        pathname: `/venue/${venue.id}`,
        query: {
          data: encryptedQuery,
        },
      }}
    >
      <Card className="bg-white">
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
        {/* <CardContent>
          <div className="flex justify-end">
            <ReservationCreateDialog
              venue={venue}
              searchData={searchData}
              isUser={true}
              triggerContent={
                <Button
                  variant="outline"
                  className="w-full bg-[#2ad5a5] hover:bg-[#9c87f2] text-white hover:text-white cols-span-1 md:col-span-2 xl:col-span-1"
                >
                  Reserve Venue
                </Button>
              }
            />
          </div>
        </CardContent> */}
      </Card>
    </Link>
  );
}

export default VenueCard;
