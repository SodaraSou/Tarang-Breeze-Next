import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { getSportTypes } from "@/services/sport";
import { getVenues } from "@/services/venue";
import UserLayout from "./UserLayout";
import FeatureSport from "@/components/FeatureSport";
import FeatureTeam from "@/components/FeatureTeam";
import FilterSearch from "@/components/FilterSearch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

async function HomePage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["sportTypes"],
    queryFn: getSportTypes,
  });
  await queryClient.prefetchQuery({
    queryKey: ["venues"],
    queryFn: getVenues,
  });
  return (
    <UserLayout>
      <section className="p-4 md:p-10">
        <div className="flex flex-col gap-4 md:gap-10">
          <HydrationBoundary state={dehydrate(queryClient)}>
            <FilterSearch sportId={""} />
            <FeatureSport />
            <div>
              <Card className="bg-white p-10">
                <CardHeader align="center" className="p-0 mb-10">
                  <CardTitle>Why You Choose Us!</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="flex items-center">
                      <div className="bg-red-500 w-[100px] h-[100px] p-4 rounded-xl"></div>
                      <div className="p-4">
                        <h3>Hello</h3>
                        <p className="flex flex-wrap">Lorem</p>
                      </div>
                    </div>
                    <div></div>
                    <div className="flex items-center">
                      <div className="bg-red-500 w-[100px] h-[100px] p-4 rounded-xl"></div>
                      <div className="p-4">
                        <h3>Hello</h3>
                        <p className="flex flex-wrap">Lorem</p>
                      </div>
                    </div>
                    <div></div>
                    <div></div>
                    <div className="flex items-center">
                      <div className="bg-red-500 w-[100px] h-[100px] p-4 rounded-xl"></div>
                      <div className="p-4">
                        <h3>Hello</h3>
                        <p className="flex flex-wrap">Lorem</p>
                      </div>
                    </div>
                    <div></div>
                    <div className="flex items-center">
                      <div className="bg-red-500 w-[100px] h-[100px] p-4 rounded-xl"></div>
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
          </HydrationBoundary>
        </div>
      </section>
    </UserLayout>
  );
}

export default HomePage;
