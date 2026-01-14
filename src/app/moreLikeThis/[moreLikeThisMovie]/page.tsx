"use client";

import { DynamicPagination } from "@/app/components/DynamicPagination";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import useSWR from "swr";
export type Movie = {
  title: string;
  od: string;
  vote_average: number;
  poster_path: string;
  backdrop_path: string;
  id: number;
  overview: string;
  runtime: string;
  genres: [];
  popularity: number;
  release_date: string;
  adult: false;
  vote_count: number;
  credits: string;
  department: string;
  crew: string;
  name: string;
  cast: string;
  known_for_department: string;
};

export const moviePaginationMorelikeThis = async (endPoint: string) => {
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

export const Page = () => {
  const params = useParams();
  const moreLikeThisMovie = params.moreLikeThisMovie as string;

  const MoreLikeThisMoviesNextResults =
    params.MoreLikeThisMoviesNextResults as string;
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page") ?? 1;
  const { data, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/${moreLikeThisMovie}/similar?language=en-US&page=${currentPage}`,
    moviePaginationMorelikeThis
  );
  const movies = data?.movies;
  const total_pages = data?.totalPages;
  console.log(total_pages);
  return (
    <div className="flex flex-wrap justify-center md:items-center md:space-x-8">
      <div className="flex flex-col">
        <div className="flex pb-8 pt-13 justify-between">
          <p className="text-2xl font-semibold">More like this</p>
          <Link href="/category/upcoming">
            <button className="flex items-center gap-x-2 pr-10">
              See more <ArrowRightIcon className="w-4 h-4" />
            </button>
          </Link>
        </div>

        <div className="md:grid md:grid-cols-5 grid grid-cols-2 gap-8 md:space-x-8 pb-8">
          {isLoading
            ? "Loading..."
            : movies?.slice(0, 10).map((kinonuud) => {
                return (
                  <div
                    key={kinonuud.title}
                    className=" w-[157.5px] h-[309.1px] md:w-[229.73px] md:h-109.75 bg-gray-50 rounded-lg  space-y-1"
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/original${kinonuud.poster_path}`}
                      alt=""
                      className="rounded-lg"
                    />
                    <div className="flex flex-col pl-2">
                      <p className="flex items-center w-[213.73px] h-5.75">
                        <img src="./star.png" alt="" className="w-4 h-4" />
                        {kinonuud.vote_average.toFixed(1)}/10
                      </p>
                    </div>
                    <div className="flex flex-col pl-2">
                      <p className="text-sm md:text-lg md:w-[213.73px] md:h-14">
                        {kinonuud.title}
                      </p>
                    </div>
                  </div>
                );
              })}
        </div>
        <DynamicPagination totalPage={data?.totalPages} />
      </div>
    </div>
  );
};
export default Page;
