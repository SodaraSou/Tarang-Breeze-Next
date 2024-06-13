"use client";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import FootballBanner from "./FootballBanner";
import FootballFieldBanner from "./FootballFieldBanner";

function FootballPrimaryBanner() {
  const banners = [<FootballBanner />, <FootballFieldBanner />];
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}
      opts={{
        loop: true,
      }}
      className="max-w-7xl mx-auto"
    >
      <CarouselContent className="max-w-7xl">
        {banners.map((banner, index) => (
          <CarouselItem key={index}>{banner}</CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

export default FootballPrimaryBanner;
