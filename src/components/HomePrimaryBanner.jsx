"use client";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  //   CarouselNext,
  //   CarouselPrevious,
} from "@/components/ui/carousel";
import FootballBanner from "./FootballBanner";
import FootballFieldBanner from "./FootballFieldBanner";
import BadmintonBanner from "./BadmintonBanner";
import BadmintonCourtBanner from "./BadmintonCourtBanner";
import VolleyballBanner from "./VolleyballBanner";
import VolleyballCourtBanner from "./VolleyballCourtBanner";
import PingPongBanner from "./PingPongBanner";
import PingPongTableBanner from "./PingPongTableBanner";

function HomePrimaryBanner() {
  const banners = [
    <FootballBanner />,
    <FootballFieldBanner />,
    <BadmintonBanner />,
    <BadmintonCourtBanner />,
    <VolleyballBanner />,
    <VolleyballCourtBanner />,
    <PingPongBanner />,
    <PingPongTableBanner />,
  ];
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
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  );
}

export default HomePrimaryBanner;
