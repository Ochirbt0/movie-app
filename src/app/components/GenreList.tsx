import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { MouseEvent } from "react";
import page from "../category/page";
import { MovieGenreMap } from "./MovieGenreMap";

type Genre = {
  genres: string;
  id: number;
  name: string;
};
export const movieGenreList = async () => {
  const responseGenrelist = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?language=en",
    {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MY_API_KEY}`,
      },
    }
  );

  const MovieGenre = await responseGenrelist.json();
  const MovieGenreResults = MovieGenre.genres;
  const MovieGenreNames = MovieGenre.name;
  console.log(MovieGenre);
  return { MovieGenreResults };
};
// const discover = async () => {
//   const responseDiscover = await fetch(
//     `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${genreIds}&page=${page}`
//   );
// };
export const GenreList = async () => {
  const { MovieGenreResults }: { MovieGenreResults: Genre[] } =
    await movieGenreList();

  return (
    <div className="w-100 h-70">
      <div className="w-134.25 h-15 pt-5 pl-5">
        <div className="font-bold pr-5">Genres</div>
        <div className="border-b pr-5">See lists of movies by genre</div>
      </div>
      <MovieGenreMap MovieGenreResults={MovieGenreResults} />
    </div>
  );
};
