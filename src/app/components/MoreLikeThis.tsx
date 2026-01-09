import { ArrowRight, ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export type Movie = {
  title: string;
  od: string;
  vote_average: number;
  poster_path: string;
  garchig: string;
  categoryTitle: string;
  id: number;
  length: string;
};
export const MovieMoreLikeThis = async (secondSearchSeeMore: number) => {
  const responseMoreLikeThis = await fetch(
    `https://api.themoviedb.org/3/movie/${secondSearchSeeMore}/similar?language=en-US&page=1`,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MY_API_KEY}`,
      },
    }
  );
  const MoreLikeThisMovies = await responseMoreLikeThis.json();
  const MoreLikeThisMoviesResults = MoreLikeThisMovies.results;
  console.log(secondSearchSeeMore);
  return { MoreLikeThisMoviesResults };
};
export const MorelikeThis = async ({
  secondSearchSeeMore,
}: {
  secondSearchSeeMore: number;
}) => {
  const { MoreLikeThisMoviesResults }: { MoreLikeThisMoviesResults: Movie[] } =
    await MovieMoreLikeThis(secondSearchSeeMore);
  console.log(secondSearchSeeMore);
  return (
    <div>
      <div className="flex justify-between pt-10">
        <div className="text-2xl font-semibold">More like this</div>
        <Link href={`/moreLikeThis/${secondSearchSeeMore}`}>
          <button className="flex justify-center items-center gap-x-2 text-sm">
            See more <ArrowRightIcon className="w-4 h-4" />
          </button>
        </Link>
      </div>
      <div className="flex justify-between pb-28 pt-8">
        {MoreLikeThisMoviesResults.slice(0, 5).map((kino) => (
          <div
            key={kino.id}
            className="flex flex-col w-[157.5px] h-[309.1px] md:w-47.5 md:h-100 bg-gray-50 rounded-lg  space-y-1"
          >
            <img
              src={`https://image.tmdb.org/t/p/original${kino.poster_path}`}
              alt=""
              className="rounded-lg"
            />
            <div className="pl-2">
              <p className="flex items-center w-[213.73px] h-5.75">
                <img src="/star.png" alt="" className="w-4 h-4" />
                {kino.vote_average.toFixed(1)}/10
              </p>
            </div>
            <div className="flex flex-col pl-2">
              <p className="text-sm md:text-lg md:w-43.5 md:h-14">
                {kino.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
