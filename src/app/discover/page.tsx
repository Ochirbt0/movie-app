"use client";

import { useSearchParams } from "next/navigation";
import page from "../category/page";
import { Genre } from "../components/Genre";
import useSWR from "swr";
import { fetcher } from "../../../utils/fetcher";

export type Genre = {
  genres: string;
  id: number;
  name: string;
};
const discover = async (ids: Genre) => {
  const { data } = useSWR(
    `${process.env.TMDB_BASE_URL}/search/movie?query=${ids}&language=en-US&page=1`,
    fetcher
  );
  // const responseDiscover = await fetch(
  //   `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${ids}&page=${1}`,
  //   {
  //     headers: {
  //       "Content-type": "application/json",
  //       Authorization: `Bearer ${process.env.NEXT_PUBLIC_MY_API_KEY}`,
  //     },
  //   }
  // );

  // const discoveredMovieGenre = await responseDiscover.json();

  // return { discoveredMovieGenre };
};

export const Genres = ({}: Genre) => {
  const searchParams = useSearchParams();

  const ids = String(searchParams.get("genre_ids")).split(",") ?? [];

  return (
    <div>
      <div>Search filter</div>
      <div></div>
    </div>
  );
};

export default Genres;
