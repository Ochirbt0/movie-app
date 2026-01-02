"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MovieHome } from "../page";
import { Button } from "@/components/ui/button";

type ScrollProps = {
  movies: MovieHome[];
};

export const Scroll = ({ movies }: ScrollProps) => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <div className="pt-6 z-0">
      <Carousel
        plugins={[plugin.current]}
        className="w-screen"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {movies.map((kino, index) => (
            <CarouselItem key={index}>
              <div className=" w-full h-137.5 md:w-full md:justify-center md:items-center md:h-200 flex justify-center items-center">
                <div className="md:relative">
                  <div className="md:absolute">
                    <div className="block md:hidden">
                      <img
                        src={`https://image.tmdb.org/t/p/original${kino.backdrop_path}`}
                        alt=""
                      />
                    </div>
                    <div className="flex justify-between items-center pt-5 pl-5 pr-5 pb-4">
                      <div className="">
                        <div className="text-base">Now Playing</div>
                        <p className="text-xl font-semibold md:text-4xl md:font-extrabold">
                          {kino.title}
                        </p>
                      </div>
                      <div>
                        <p className="flex items-center  h-5.75">
                          <img
                            src="./star.png"
                            alt=""
                            className="w-7 h-7 pr-1 pb-1.25"
                          />
                          {kino.vote_average.toFixed(1)}/10
                        </p>
                      </div>
                    </div>
                    <div className=" text-sm pr-5 pl-5 pb-4 md:w-75.5 md:h-20 md:text-xs">
                      {kino.overview}
                    </div>
                  </div>
                  <div className="pl-5">
                    <Button variant="outline">Watch Trailer</Button>
                  </div>

                  <div className="hidden md:block">
                    <img
                      src={`https://image.tmdb.org/t/p/original${kino.backdrop_path}`}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden" />
        <CarouselNext className="hidden" />
      </Carousel>
    </div>
  );
};
