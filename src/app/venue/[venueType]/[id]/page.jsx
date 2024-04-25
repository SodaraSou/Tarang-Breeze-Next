"use client";

import { useQuery } from "@tanstack/react-query";
import { showSingleVenue } from "@/services/venue";
import { Check } from "lucide-react";
import { GiTennisCourt } from "react-icons/gi";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import Spinner from "@/components/Spinner";
import UserLayout from "@/app/UserLayout";

function SingleVenuePage({ params }) {
  const { data, isLoading } = useQuery({
    queryFn: async () => await showSingleVenue(params.id),
    queryKey: ["singleVenues"],
  });
  return (
    <UserLayout>
      <section className="p-4 md:p-10">
        {isLoading ? (
          <div className="h-screen">
            <Spinner fullScreenSpinner={true} />
          </div>
        ) : (
          <div className="flex flex-col gap-4 md:gap-10 w-full">
            <Card className="bg-white rounded-xl">
              <CardHeader className="flex flex-row justify-between items-center">
                <div className="flex flex-col gap-2">
                  <CardDescription>test</CardDescription>
                  <CardTitle>{data?.name}</CardTitle>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-[#2AD5A5] text-white"
                    >
                      Reserve Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-white">
                    <DialogHeader>
                      <DialogTitle>Venue Reservation</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-4">
                      <div className="flex gap-4">
                        <div className="flex flex-col gap-2 w-full">
                          <Label htmlFor="name">Start Time</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select start time" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                              <ScrollArea className="h-32">
                                <SelectGroup>
                                  <SelectItem value="7:00">7:00 AM</SelectItem>
                                  <SelectItem value="8:00">8:00 AM</SelectItem>
                                  <SelectItem value="9:00">9:00 AM</SelectItem>
                                  <SelectItem value="10:00">
                                    10:00 AM
                                  </SelectItem>
                                  <SelectItem value="11:00">
                                    11:00 AM
                                  </SelectItem>
                                  <SelectItem value="12:00">
                                    12:00 AM
                                  </SelectItem>
                                  <SelectItem value="13:00">
                                    13:00 PM
                                  </SelectItem>
                                  <SelectItem value="14:00">
                                    14:00 PM
                                  </SelectItem>
                                  <SelectItem value="15:00">
                                    15:00 PM
                                  </SelectItem>
                                  <SelectItem value="16:00">
                                    16:00 PM
                                  </SelectItem>
                                  <SelectItem value="17:00">
                                    17:00 PM
                                  </SelectItem>
                                  <SelectItem value="18:00">
                                    18:00 PM
                                  </SelectItem>
                                  <SelectItem value="19:00">
                                    19:00 PM
                                  </SelectItem>
                                  <SelectItem value="20:00">
                                    20:00 PM
                                  </SelectItem>
                                  <SelectItem value="21:00">
                                    21:00 PM
                                  </SelectItem>
                                  <SelectItem value="22:00">
                                    22:00 PM
                                  </SelectItem>
                                </SelectGroup>
                              </ScrollArea>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                          <Label htmlFor="name">End Time</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select start end" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                              <ScrollArea className="h-32">
                                <SelectGroup>
                                  <SelectItem value="7:00">7:00 AM</SelectItem>
                                  <SelectItem value="8:00">8:00 AM</SelectItem>
                                  <SelectItem value="9:00">9:00 AM</SelectItem>
                                  <SelectItem value="10:00">
                                    10:00 AM
                                  </SelectItem>
                                  <SelectItem value="11:00">
                                    11:00 AM
                                  </SelectItem>
                                  <SelectItem value="12:00">
                                    12:00 AM
                                  </SelectItem>
                                  <SelectItem value="13:00">
                                    13:00 PM
                                  </SelectItem>
                                  <SelectItem value="14:00">
                                    14:00 PM
                                  </SelectItem>
                                  <SelectItem value="15:00">
                                    15:00 PM
                                  </SelectItem>
                                  <SelectItem value="16:00">
                                    16:00 PM
                                  </SelectItem>
                                  <SelectItem value="17:00">
                                    17:00 PM
                                  </SelectItem>
                                  <SelectItem value="18:00">
                                    18:00 PM
                                  </SelectItem>
                                  <SelectItem value="19:00">
                                    19:00 PM
                                  </SelectItem>
                                  <SelectItem value="20:00">
                                    20:00 PM
                                  </SelectItem>
                                  <SelectItem value="21:00">
                                    21:00 PM
                                  </SelectItem>
                                  <SelectItem value="22:00">
                                    22:00 PM
                                  </SelectItem>
                                </SelectGroup>
                              </ScrollArea>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 w-full">
                        <Label htmlFor="name">Phone Number</Label>
                        <Input type="data" className="rounded-lg" />
                      </div>
                      <div className="flex flex-col gap-2 w-full">
                        <Label htmlFor="name">Number of Player</Label>
                        <Input type="data" className="rounded-lg" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Optional</Label>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Checkbox />
                            <Label htmlFor="name">
                              Find a team to play against
                            </Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox />
                            <Label htmlFor="name">
                              Find a team to play against
                            </Label>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Team Name</Label>
                        <Input type="data" className="rounded-lg" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Description</Label>
                        <Input type="data" className="rounded-lg" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="submit"
                        className="bg-[#2AD5A5] text-white"
                        variant="outline"
                      >
                        Confirm
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
            </Card>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-10">
              <div>
                <Card className="bg-white rounded-xl">
                  <CardHeader>
                    <CardTitle>Description and Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-4 text-2xl">
                      <div className="flex gap-4 justify-center items-center">
                        <GiTennisCourt />
                        <h1 className="font-bold text-2xl text-blue-500">
                          {data?.size} Players
                        </h1>
                      </div>
                      <div className="text-sm md:text-base">
                        <p>{data?.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div>
                <Card className="bg-white rounded-xl">
                  <CardHeader>
                    <CardTitle>Amenities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* grid grid-cols-2 md:grid-cols-3 */}
                    <div className="flex flex-wrap gap-4">
                      <div className="flex gap-2">
                        <Check className="w-5 h-5" />
                        <h1 className="text-sm md:text-base">Parking</h1>
                      </div>
                      <div className="flex gap-2">
                        <Check className="w-5 h-5" />
                        <h1 className="text-sm md:text-base">Drinking Water</h1>
                      </div>
                      <div className="flex gap-2">
                        <Check className="w-5 h-5" />
                        <h1 className="text-sm md:text-base">First Aid</h1>
                      </div>
                      <div className="flex gap-2">
                        <Check className="w-5 h-5" />
                        <h1 className="text-sm md:text-base">Rest Room</h1>
                      </div>
                      <div className="flex gap-2">
                        <Check className="w-5 h-5" />
                        <h1 className="text-sm md:text-base">Change Room</h1>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </section>
    </UserLayout>
  );
}

export default SingleVenuePage;
