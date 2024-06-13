"use client";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import PingPongBanner from "./PingPongBanner";
import PingPongTableBanner from "./PingPongTableBanner";

function PingPongPrimaryBanner() {
  const banners = [<PingPongBanner />, <PingPongTableBanner />];
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

export default PingPongPrimaryBanner;
