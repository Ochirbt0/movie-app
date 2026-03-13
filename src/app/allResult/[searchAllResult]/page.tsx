"use client";

import { Movie } from "@/lib/types";
import { useParams, useSearchParams } from "next/navigation";
import useSWR from "swr";

export const searchedAllResults = async (endPoint: string) => {
  const responseUpcoming = await fetch(endPoint, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_MY_API_KEY}`,
    },
  });
  const allResult = await responseUpcoming.json();
  const totalPages = allResult.total_pages;
  const searchedMoviesResults = allResult.results;

  return { totalPages, movies: searchedMoviesResults as Movie[] };
};

export const page = () => {
  const params = useParams();
  const searchAllResult = params.searchAllResult as string;

  //   const MoreLikeThisMoviesNextResults =
  //     params.MoreLikeThisMoviesNextResults as string;
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page") ?? 1;
  const { data, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/search/movie?query=${searchAllResult}&language=en-US&page=${currentPage}`,
    searchedAllResults
  );
  const movies = data?.movies;
  const total_pages = data?.totalPages;

  return <div>page</div>;
};
export default page;
