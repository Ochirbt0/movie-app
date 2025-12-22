import { title } from "process";

import React from "react";

export type Movie = {
  title: string;
  rating: number;
  od: string;
  image: string;
};

const sampleMovie: Movie[] = [
  {
    title: "Dear Santa",
    rating: 6.9,

    od: "./Star.png",
    image: "./dearsanta.jpg",
  },
  {
    title: "How To Train Your Dragon Live Action",
    rating: 6.9,

    od: "",
    image: "",
  },
];

export const MovieCard = () => {
  return <div></div>;
};
