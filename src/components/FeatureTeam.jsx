import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TeamCard from "./TeamCard";

function FeatureTeam() {
  return (
    <div className="flex flex-col gap-4 md:gap-10 justify-center items-center">
      <div className="w-full flex justify-between items-center my-6 md:my-0">
        <h1 className="font-bold text-2xl md:text-4xl">Feature Team</h1>
        <Link
          className="flex items-center gap-2 font-bold text-xl"
          href="/team"
        >
          more
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-10">
        <TeamCard />
        <TeamCard />
        <TeamCard />
      </div>
    </div>
  );
}

export default FeatureTeam;
