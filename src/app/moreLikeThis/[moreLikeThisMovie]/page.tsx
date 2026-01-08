import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
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
export const MovieMoreLikeThis = async (moreLikeThisMovie: number) => {
  const responseMoreLikeThisMovie = await fetch(
    `https://api.themoviedb.org/3/movie/${moreLikeThisMovie}/similar?language=en-US&page=1`,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MY_API_KEY}`,
      },
    }
  );
  const MoreLikeThisMoviesNext = await responseMoreLikeThisMovie.json();
  const MoreLikeThisMoviesNextResults = MoreLikeThisMoviesNext.results;
  console.log(MoreLikeThisMoviesNextResults);
  return { MoreLikeThisMoviesNextResults };
};

export default async function Page({
  params,
}: {
  params: Promise<{ moreLikeThisMovie: number }>;
}) {
  const { moreLikeThisMovie } = await params;

  const {
    MoreLikeThisMoviesNextResults,
  }: { MoreLikeThisMoviesNextResults: Movie[] } = await MovieMoreLikeThis(
    moreLikeThisMovie
  );
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
          {MoreLikeThisMoviesNextResults.slice(0, 10).map((kinonuud) => {
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
      </div>
    </div>
  );
}
