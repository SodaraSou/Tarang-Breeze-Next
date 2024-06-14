import React from "react";
import UserLayout from "@/app/UserLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

function AboutUsPage() {
  return (
    <UserLayout>
      <div className="max-w-7xl mx-auto flex flex-col relative">
        <div className="w-full bg-white md:grid md:grid-cols-2">
          <div className="h-[300px] p-20 justify-center">
            <h1 className="text-2xl font-bold text-center md:text-start mb-4">
              About Tarang
            </h1>
            <p>
              We believe in the power of sports to bring people together, foster
              healthy competition, and build community.
            </p>
          </div>
          <div></div>
        </div>
        <div className="absolute top-0 end-20 space-y-2 hidden md:block xl:block">
          <div className="flex gap-4">
            <Card className="rounded-none border-none shadow-none">
              <CardContent className="p-0">
                <Image
                  src="/aboutusvolleyball.webp"
                  alt="Volleyball Picture"
                  width={225}
                  height={250}
                  className="rounded-l-3xl rounded-br-3xl rounded-tr-lg"
                />
              </CardContent>
            </Card>
            <Card className="rounded-none border-none shadow-none">
              <CardContent className="p-0">
                <Image
                  src="/aboutusbasketball.webp"
                  alt="Basketball Picture"
                  width={150}
                  height={150}
                  className="rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg"
                />
              </CardContent>
            </Card>
          </div>
          <div className="flex gap-4">
            <Card className="rounded-none border-none shadow-none">
              <CardContent className="p-0">
                <Image
                  src="/aboutusfootball.webp"
                  alt="Football Picture"
                  width={125}
                  height={125}
                  className="rounded-tl-3xl rounded-r-lg rounded-bl-lg"
                />
              </CardContent>
            </Card>
            <Card className="rounded-none border-none shadow-none">
              <CardContent className="p-0">
                <Image
                  src="/aboutuspingpong.webp"
                  alt="PingPong Picture"
                  height={200}
                  width={250}
                  className="rounded-r-3xl rounded-bl-3xl rounded-tl-lg"
                />
              </CardContent>
            </Card>
          </div>
        </div>
        <Card className="rounded-none border-none shadow-none text-center md:flex items-center justify-center my-28">
          <CardHeader>
            <CardTitle className="mx-20">Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-400 xl:w-3/5">
            <p>
              We're dedicated to making sports more accessible, enjoyable, and
              inclusive for everyone. We connect communities through sports,
              simplify venue booking, promote fair play, embrace diversity,
              foster a positive environment, and continuously improve our
              platform. Join us in our mission to bring people together through
              the love of the game.
            </p>
          </CardContent>
        </Card>
        <div className="bg-gray-200 h-0.5"></div>
        <Card className="rounded-none border-none shadow-none my-28">
          <CardHeader align="center">
            <CardTitle>What we offer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 justify-center text-center gap-4">
              <Card className="p-10 bg-white">
                <CardHeader>
                  <CardTitle>Venue Reservations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400">
                    Finding the perfect place to play can be challenging. Our
                    easy-to-use booking system ensures you can secure a spot
                    quickly and efficiently.
                  </p>
                </CardContent>
              </Card>
              <Card className="p-10 bg-white">
                <CardHeader>
                  <CardTitle>Team Matching</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400">
                    We make it easy to find and schedule matches with other
                    teams. Our platform allows you to connect with teams of
                    similar skill levels, ensuring a fun and competitive game
                    every time.
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
        <div className="bg-gray-200 h-0.5"></div>
        <Card className="my-28 bg-white">
          <CardHeader
            align="start"
            className="text-2xl font-bold text-center xl:text-start"
          >
            The Members of Tarang
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5">
              <div className="flex flex-col items-center">
                <Card>
                  <CardHeader className="p-0">
                    <Image
                      src="/Vitra.jpg"
                      alt="Sethy Vitra"
                      width={150}
                      height={150}
                    />
                  </CardHeader>
                </Card>
                <div className="flex flex-col gap-2 p-4 items-center">
                  <h3 className="font-bold text-xl">Sethy Vitra</h3>
                  <p className="flex flex-wrap text-sm text-gray-400">
                    Founder & CEO
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <Card>
                  <CardHeader className="p-0">
                    <Image
                      src="/Chhay.jpg"
                      alt="Sun ChengChhay"
                      width={150}
                      height={150}
                      className="object-cover h-[150px]"
                    />
                  </CardHeader>
                </Card>
                <div className="flex flex-col gap-2 p-4 items-center">
                  <h3 className="font-bold text-xl">Sun ChengChhay</h3>
                  <p className="flex flex-wrap text-sm text-gray-400">CTO</p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <Card>
                  <CardHeader className="p-0">
                    <Image
                      src="/sousodara.webp"
                      alt="Sou Sodara"
                      width={150}
                      height={150}
                    />
                  </CardHeader>
                </Card>
                <div className="flex flex-col gap-2 p-4 items-center">
                  <h3 className="font-bold text-xl">Sou Sodara</h3>
                  <p className="flex flex-wrap text-sm text-gray-400">CTO</p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <Card>
                  <CardHeader className="p-0">
                    <Image
                      src="/Mengsrun.jpg"
                      alt="Sea MengSrun"
                      width={150}
                      height={150}
                    />
                  </CardHeader>
                </Card>
                <div className="flex flex-col gap-2 p-4 items-center">
                  <h3 className="font-bold text-xl">Sea MengSrun</h3>
                  <p className="flex flex-wrap text-sm text-gray-400">CTO</p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <Card>
                  <CardHeader className="p-0">
                    <Image
                      src="/Sakhana.jpg"
                      alt="San This Sak Khakna"
                      width={150}
                      height={150}
                    />
                  </CardHeader>
                </Card>
                <div className="flex flex-col gap-2 p-4 items-center">
                  <h3 className="font-bold text-xl">San This Sak Khakna</h3>
                  <p className="flex flex-wrap text-sm text-gray-400">CTO</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </UserLayout>
  );
}

export default AboutUsPage;
