import Link from "next/link";
import { Card, CardHeader } from "./ui/card";

function SportCard() {
  return (
    <Link href="/sport/football">
      <Card className="bg-white rounded-xl">
        <CardHeader>
          <div className="flex justify-center gap-4 items-center">
            <IoFootballOutline className="w-10 h-10" />
            <CardTitle className="hidden md:block">Football</CardTitle>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}

export default SportCard;
