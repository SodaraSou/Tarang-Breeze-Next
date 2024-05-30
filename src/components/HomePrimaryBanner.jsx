"use client";

import Image from "next/image";
// import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  //   CarouselNext,
  //   CarouselPrevious,
} from "@/components/ui/carousel";

function HomePrimaryBanner() {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
      opts={{
        loop: true,
      }}
      className="max-w-7xl mx-auto"
    >
      <CarouselContent className="max-w-7xl">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="flex flex-col md:flex-row justify-between p-10 border-none shadow-none rounded-none">
              <div className="w-full md:w-1/2 flex justify-center mb-10 md:mb-0">
                <Image
                  src="/football.png"
                  alt="football"
                  width={300}
                  height={300}
                />
              </div>
              <div className="w-full md:w-1/2 text-center md:text-left md:p-16">
                <h1 className="font-bold text-4xl mb-4">Football</h1>
                <p>
                  Join Tarang to find a football team to play with or compete
                  against. Discover venues to book for your matches and immerse
                  yourself in the world of football.
                </p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  );
}

export default HomePrimaryBanner;
