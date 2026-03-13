"use client";

import Link from "next/link";
import page from "../category/page";
import { DynamicPagination } from "./DynamicPagination";
import { useParams, useSearchParams } from "next/navigation";
import useSWR from "swr";
import { movieGenreList } from "../../../utils/fetcher";
import { GenreName } from "./GenreName";
// import { useSearchParams } from "next/navigation";

export type Movie = {
  title: string;
  od: string;
  id: number;
  vote_average: number;
  poster_path: string;
  garchig: string;
  categoryTitle: string;
  length: string;
  name: string;
  total_results: number;
};

export type GenrePage = {
  id: number[];
  name: string[];
};

export const movieGenre = async (endPoint: string) => {
  const responseUpcoming = await fetch(endPoint, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_MY_API_KEY}`,
    },
  });
  const upcomingMovies = await responseUpcoming.json();
  const totalPages = upcomingMovies.total_pages;
  const upcomingMoviesResults = upcomingMovies.results;

  return { totalPages, movies: upcomingMoviesResults as Movie[] };
};
// const movieGenreAppeared = async (ids: string) => {
//   const responseAppeared = await fetch(
//     `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${ids}&page=${1}}`,
//     {
//       headers: {
//         "Content-type": "application/json",
//         Authorization: `Bearer ${process.env.NEXT_PUBLIC_MY_API_KEY}`,
//       },
//     }
//   );
//   const movieAppeared = await responseAppeared.json();
//   console.log(movieAppeared);
//   const genreTotalPages = movieAppeared.total_pages;
//   const MovieAppearedTotalResults = movieAppeared.total_results;
//   const movieAppearedResults = movieAppeared.results;

//   return { movieAppearedResults, MovieAppearedTotalResults };
// };
// const movieGenreList = async (genre_ids: string) => {
//   const responseGenrelist = await fetch(
//     "https://api.themoviedb.org/3/genre/movie/list?language=en",
//     {
//       headers: {
//         "Content-type": "application/json",
//         Authorization: `Bearer ${process.env.NEXT_PUBLIC_MY_API_KEY}`,
//       },
//     }
//   );

//   const MovieGenre = await responseGenrelist.json();
//   const MovieGenreResults = MovieGenre.genres;

//   return { MovieGenreResults };
// };
export type GenreAppearanceProps = {
  genre_ids: string;
};

export const GenreAppearance = () => {
  {
    movieGenreList;
  }
  const searchParams = useSearchParams();

  const ids = searchParams.get("ids");
  const genre_ids = searchParams.get("genre_ids");

  const currentPage = searchParams.get("page") ?? 1;

  const { data, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/discover/movie?language=en&with_genres=${genre_ids}&page=${currentPage}}`,
    movieGenre
  );

  const movies = data?.movies;

  const total_pages = data?.totalPages;
  const { data: dataGenre, isLoading: isLoadingGenre } = useSWR(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/discover/movie?language=en&with_genres=${genre_ids}&page=${currentPage}}`,
    movieGenre
  );

  // const {
  //   movieAppearedResults,
  //   MovieAppearedTotalResults,
  // }: { movieAppearedResults: Movie[]; MovieAppearedTotalResults: number } =
  //   await movieGenreAppeared(genre_ids);
  // const {
  //   MovieGenreResults,
  // }: { MovieGenreResults: { id: number; name: string }[] } =
  //   await movieGenreList(genre_ids);
  // {MovieGenreResults}

  const genre_idsArray = genre_ids?.split(",").map(Number) ?? [];

  console.log(genre_idsArray);
  const finder = genre_idsArray.map(
    (genre_id) => movies?.find(({ id }) => genre_id === id)?.name
  );
  const joined = finder.join(", ");
  console.log(finder);

  return (
    <div className="flex flex-col justify-start pt-5 w-201.5 pl-5">
      <div className=" h-7 text-xl font-semibold">titles in "{joined}"</div>
      <div className="md:grid md:grid-cols-4 grid grid-cols-2 md:gap-x-48 md:gap-y-8 pt-8">
        {movies?.slice(0, 12).map((kino) => {
          return (
            <div
              key={kino.id}
              className=" w-[157.5px] h-[309.1px] md:w-[229.73px] md:h-109.75 bg-gray-50 rounded-lg  space-y-1"
            >
              <img
                src={`https://image.tmdb.org/t/p/original${kino.poster_path}`}
                alt=""
                className="rounded-lg"
              />
              <div className="flex flex-col pl-2">
                <p className="flex items-center w-[213.73px] h-5.75">
                  <img src="./star.png" alt="" className="w-4 h-4" />
                  {kino.vote_average.toFixed(1)}/10
                </p>
              </div>
              <div className="flex flex-col pl-2">
                <p className="text-sm md:text-lg md:w-[213.73px] md:h-14">
                  {kino.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <DynamicPagination totalPage={data?.totalPages} />
    </div>
  );
};
