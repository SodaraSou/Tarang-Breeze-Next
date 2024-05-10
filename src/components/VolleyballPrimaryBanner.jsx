import Image from "next/image";
import { Card } from "./ui/card";

function VolleyballPrimaryBanner() {
  return (
    <Card className="flex flex-col md:flex-row justify-between bg-white p-10">
      <div className="w-full md:w-1/2 flex justify-center mb-10 md:mb-0">
        <Image src="/volleyball.png" alt="football" width={300} height={300} />
      </div>
      <div className="w-full md:w-1/2 text-center md:text-left md:p-16">
        <h1 className="font-bold text-4xl mb-4">Volleyball</h1>
        <p>
          Join Tarang to find a Volleyball team to play with or compete against.
          Discover venues to book for your matches and immerse yourself in the
          world of Volleyball.
        </p>
      </div>
    </Card>
  );
}

export default VolleyballPrimaryBanner;
