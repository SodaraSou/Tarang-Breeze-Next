import UserLayout from "./UserLayout";
import FeatureSport from "@/components/FeatureSport";
import FeatureTeam from "@/components/FeatureTeam";
import FilterSearch from "@/components/FilterSearch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FeatureMatchGame from "@/components/FeatureMatchGame";
import Image from "next/image";

function HomePage() {
  return (
    <UserLayout>
      <section className="p-4 md:p-10">
        <div className="flex flex-col gap-4 md:gap-10">
          <>
            <div>
              <FilterSearch sportId={""} />
            </div>
            <FeatureSport />
            <div>
              <Card className="bg-white p-10">
                <CardHeader align="center" className="p-0 mb-10">
                  <CardTitle>Why You Choose Us!</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="flex items-center">
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
                      <div className="p-4">
                        <h3>Hello</h3>
                        <p className="flex flex-wrap">Lorem</p>
                      </div>
                    </div>
                    <div></div>
                    <div className="flex items-center">
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
                      <div className="p-4">
                        <h3>Hello</h3>
                        <p className="flex flex-wrap">Lorem</p>
                      </div>
                    </div>
                    <div></div>
                    <div></div>
                    <div className="flex items-center">
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
                      <div className="p-4">
                        <h3>Hello</h3>
                        <p className="flex flex-wrap">Lorem</p>
                      </div>
                    </div>
                    <div></div>
                    <div className="flex items-center">
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
                      <div className="p-4">
                        <h3>Hello</h3>
                        <p className="flex flex-wrap">Lorem</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <FeatureTeam />
            <FeatureMatchGame />
          </>
        </div>
      </section>
    </UserLayout>
  );
}

export default HomePage;
