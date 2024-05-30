import FeatureVenue from "@/components/FeatureVenue";
import UserLayout from "./UserLayout";
import FeatureSport from "@/components/FeatureSport";
import FeatureTeam from "@/components/FeatureTeam";
import FilterSearch from "@/components/FilterSearch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

function HomePage() {
  return (
    <UserLayout>
      <section>
        <div className="flex flex-col">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="w-full h-[480px] bg-white relative">
            <div
              className="w-full h-[420px] bg-cover  bg-center bg-no-repeat"
              style={{ backgroundImage: "url('/homebanners.png')" }}
            >
            </div>
            <div className="absolute left-[185px] bottom-0">
              <FilterSearch sportId={""} />
            </div>
            </div>
            <div className="flex flex-col gap-10 bg-white">
            <div>
              <Card className="border-none shadow-none mt-10" >
                <CardHeader align="center" className="p-0 mb-10">
                  <CardTitle className="text-4xl font-bold">Why Choose Us!</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="flex justify-center text-center gap-4">
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
                        <p className="flex flex-wrap text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, ex commodi expedita illo alias assumenda, sed amet labore incidunt sint officia quis reprehenderit, harum sit dignissimos voluptates soluta dolorem adipisci?</p>
                      </div>
                    </div>
                    <div></div>
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
                        <p className="flex flex-wrap text-sm">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis, eveniet rem sint corporis veritatis, nemo animi omnis asperiores pariatur nam maxime aperiam ipsam distinctio ipsa. Obcaecati officia iure provident adipisci!</p>
                      </div>
                    </div>
                    <div></div>
                    <div></div>
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
                        <p className="flex flex-wrap text-sm">Lorem ipsum dolor sit, amet consectetur adipisicing elit.stinctio fuga aliquam quibusdam officiis reprehenderit animi tempora blanditiis iste soluta cumque, modi commodi cupiditate similique quidem?</p>
                      </div>
                    </div>
                    <div></div>
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
                        <p className="flex flex-wrap text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus qui dicta recusandae odio, voluptates odit dolor vel fugit impedit possimus sit? Sit nobis quisquam quam, reiciendis sequi dolore impedit incidunt.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <FeatureSport/>
            <FeatureVenue/>
            <FeatureTeam />
            <FeatureMatchGame />
          </>
        </div>
      </section>
    </UserLayout>
  );
}

export default HomePage;
