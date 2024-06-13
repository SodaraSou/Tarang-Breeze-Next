"use client";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import VolleyballBanner from "./VolleyballBanner";
import VolleyballCourtBanner from "./VolleyballCourtBanner";

function VolleyballPrimaryBanner() {
  const banners = [<VolleyballBanner />, <VolleyballCourtBanner />];
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
        {banners.map((banner, index) => (
          <CarouselItem key={index}>{banner}</CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

export default VolleyballPrimaryBanner;
