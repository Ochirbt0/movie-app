"use client";
import { DynamicPagination } from "@/app/components/DynamicPagination";
import { Key } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import useSWR from "swr";

export type Movie = {
  title: string;
  od: string;
  vote_average: number;
  poster_path: string;
};

export const movieUpcomingSecond = async (endPoint: string) => {
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
  const movieCategory = params.movieCategory as string;

  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page") ?? 1;
  const { data, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/${movieCategory}?language=en-US&page=${currentPage}`,
    movieUpcomingSecond
  );
  const movies = data?.movies;
  const total_pages = data?.totalPages;
  console.log(total_pages);

  return (
    <div className="">
      <div className="flex flex-col">
        <div className="flex w-360 h-9 pb-16 pt-13 pl-110">
          <p className="text-3xl font-bold">{movieCategory}</p>
        </div>
        <div className="md:flex md:flex-col md:justify-center md:items-center">
          <div className=" w-360 md:pl-10 md:grid md:grid-cols-5 grid grid-cols-2 md:gap-8 pb-8">
            {isLoading
              ? "Loading..."
              : movies?.slice(0, 10).map((data) => {
                  return (
                    <div
                      key={data.title}
                      className="w-[157.5px] h-[309.1px] md:w-[229.73px] md:h-109.75 bg-gray-50 rounded-lg  space-y-1"
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
                        alt=""
                        className="rounded-lg"
                      />
                      <div className="md:flex md:justify-center md:items-center md:flex-col pl-2">
                        <p className="md:flex md:items-center md:w-[213.73px] md:h-5.75">
                          <img
                            src="/star.png"
                            alt=""
                            className=" pr-1 pb-1.25"
                          />
                          {data.vote_average.toFixed(1)}/10
                        </p>
                      </div>
                      <div className="flex flex-col pl-2">
                        <p className="text-sm md:text-lg md:w-[213.73px] md:h-14">
                          {data.title}
                        </p>
                      </div>
                    </div>
                  );
                })}
          </div>

          <DynamicPagination totalPage={data?.totalPages} />
        </div>
      </div>
    </div>
  );
};
export default Page;
