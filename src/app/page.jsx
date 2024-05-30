import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FeatureVenue from "@/components/FeatureVenue";
import UserLayout from "./UserLayout";
import FeatureSport from "@/components/FeatureSport";
import FeatureTeam from "@/components/FeatureTeam";
import FilterSearch from "@/components/FilterSearch";

function HomePage() {
  return (
    <UserLayout>
      <div className="w-full h-[480px] relative">
        <div
          className="w-full h-[420px] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/homebanners.png')" }}
        ></div>
        <div className="w-full absolute bottom-0">
          <div className="max-w-7xl mx-auto p-4 md:px-6 xl:px-0">
            <FilterSearch sportId={""} />
          </div>
        </div>
      </div>
      <div className="space-y-10 mt-10">
        <Card className="bg-white rounded-none border-none shadow-none">
          <CardHeader align="center">
            <CardTitle className="text-2xl font-bold">Why Choose Us!</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 justify-center text-center gap-4">
              <div className="flex flex-col items-center">
                <Card>
                  <CardHeader>
                    <Image
                      src="/water.png"
                      alt="first_amenity"
                      width={64}
                      height={64}
                    />
                  </CardHeader>
                </Card>
                <div className="flex flex-col gap-2 p-4">
                  <h3 className="font-bold text-xl">Drinking Water</h3>
                  <p className="flex flex-wrap text-sm">
                    Stay hydrated during your activities with our readily
                    available, clean drinking water stations. We ensure you have
                    access to fresh water throughout your visit.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <Card>
                  <CardHeader>
                    <Image
                      src="/parking.png"
                      alt="second_amenity"
                      width={64}
                      height={64}
                    />
                  </CardHeader>
                </Card>
                <div className="flex flex-col gap-2 p-4">
                  <h3 className="font-bold text-xl">Parking Lot</h3>
                  <p className="flex flex-wrap text-sm">
                    Our spacious and secure parking lot ensures hassle-free
                    access to our venue. Enjoy the convenience of ample parking
                    space, so you can focus on your game.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <Card>
                  <CardHeader>
                    <Image
                      src="/first-aid-kit.png"
                      alt="third_amenity"
                      width={64}
                      height={64}
                    />
                  </CardHeader>
                </Card>
                <div className="flex flex-col gap-2 p-4">
                  <h3 className=" font-bold text-xl">First Aid</h3>
                  <p className="flex flex-wrap text-sm">
                    Safety is our priority. Our venue is equipped with first aid
                    facilities and trained staff ready to assist with any minor
                    injuries or medical needs.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <Card>
                  <CardHeader>
                    <Image
                      src="/changing-room.png"
                      alt="fourth_amenity"
                      width={64}
                      height={64}
                    />
                  </CardHeader>
                </Card>
                <div className="flex flex-col gap-2 p-4">
                  <h3 className="font-bold text-xl">Evironment</h3>
                  <p className="flex flex-wrap text-sm">
                    Enjoy a clean, well-maintained environment that enhances
                    your sporting experience. Our venue is designed with your
                    comfort in mind, offering modern amenities and a welcoming
                    atmosphere.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <FeatureSport />
        <div className="bg-white">
          <FeatureVenue />
        </div>
        <div className="bg-white">
          <FeatureTeam />
        </div>
      </div>
    </UserLayout>
  );
}

export default HomePage;
