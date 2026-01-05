import { SearchResult } from "@/app/components/SearchResult";
import { log } from "console";

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

const movieSearchedSeeMore = async (secondSearchSeeMore: number) => {
  const responseSearchedSeeMore = await fetch(
    `https://api.themoviedb.org/3/movie/${secondSearchSeeMore}?language=en-US`,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MY_API_KEY}`,
      },
    }
  );

  const searchedSeeMoreMovies = await responseSearchedSeeMore.json();
  // console.log(searchedSeeMoreMovies);
  return { searchedSeeMoreMovies };
};

const creditsOfSearchedMovie = async (secondSearchSeeMore: number) => {
  const responsecreditsSearched = await fetch(
    `https://api.themoviedb.org/3/movie/${secondSearchSeeMore}/credits?language=en-US`,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MY_API_KEY}`,
      },
    }
  );

  const creditsOfSearchedSeeMoreMovies = await responsecreditsSearched.json();
  const creditsOfSearchedSeeMoreMoviesCrew =
    creditsOfSearchedSeeMoreMovies.crew;

  const foundDirector = creditsOfSearchedSeeMoreMoviesCrew.find(
    (worker: { known_for_department: string }) =>
      worker.known_for_department === "Directing"
  );

  const foundWriting = creditsOfSearchedSeeMoreMoviesCrew
    .filter(
      (worker: { known_for_department: string }) =>
        worker.known_for_department === "Writing"
    )
    .slice(0, 3)
    .map((writers: { name: string }) => writers.name)
    .join(" · ");

  const creditsOfSearchedSeeMoreMoviesCast =
    creditsOfSearchedSeeMoreMovies.cast;

  const foundActors = creditsOfSearchedSeeMoreMoviesCast
    .filter(
      (worker: { known_for_department: string }) =>
        worker.known_for_department === "Acting"
    )
    .slice(0, 3)
    .map((item: { name: string }) => item.name)
    .join(" · ");
  return {
    foundDirector: foundDirector as Movie,
    foundWriting: foundWriting as string[],
    foundActors: foundActors as string[],
  };
};

async function Page({
  params,
}: {
  params: Promise<{ secondSearchSeeMore: number }>;
}) {
  const { secondSearchSeeMore } = await params;

  const { searchedSeeMoreMovies }: { searchedSeeMoreMovies: Movie } =
    await movieSearchedSeeMore(secondSearchSeeMore);

  const { foundDirector, foundWriting, foundActors } =
    await creditsOfSearchedMovie(secondSearchSeeMore);

  const minutezadalsan = parseInt(searchedSeeMoreMovies.runtime);
  const minuteToHours = (minutezadalsan: number) => {
    const hours = Math.floor(minutezadalsan / 60);
    const minutes = minutezadalsan % 60;

    const total: any = `${hours}, ${minutes} `;
    return `${hours}h ${minutes}m `;
  };
  const total = minuteToHours(minutezadalsan);
  return (
    <div className="w-270 flex flex-col justify-center m-auto pt-13">
      <div className="flex flex-col w-270 justify-center items-center">
        <div className="flex justify-between w-270">
          <div className="flex flex-col gap-y-1">
            <div className="text-4xl font-extrabold">
              {searchedSeeMoreMovies.title}
            </div>
            <div className="text-lg font-normal">
              {searchedSeeMoreMovies.release_date} · PG · {total}
            </div>
          </div>
          <div className="flex flex-col w-20.75px h-16">
            <div className="text-xs">Rating</div>
            <div className="flex w-20.75 h-12 items-center space-x-1">
              <img src="/star.png" alt="" className="w-7 h-7" />
              <div>
                <div>{searchedSeeMoreMovies.vote_average.toFixed(1)}/10</div>
                <div className="text-xs">
                  {searchedSeeMoreMovies.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-270 h-107 space-x-8 pt-6">
          <img
            src={`https://image.tmdb.org/t/p/original${searchedSeeMoreMovies.poster_path}`}
            alt=""
            className="w-72.5 h-107 rounded-md"
          />
          <img
            src={`https://image.tmdb.org/t/p/original${searchedSeeMoreMovies.backdrop_path}`}
            alt=""
            className="w-190 h-107 rounded-md"
          />
        </div>
      </div>
      <div>
        <div>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
        </div>
        <div className="text-base pt-5">{searchedSeeMoreMovies.overview}</div>
        <div className="flex flex-col gap-y-2.5 pt-5 ">
          <div className="flex underline-offset-4 border-b h-10.25">
            <div className="font-bold w-16 h-7">Director</div>
            <div className="text-base pl-13.25">{foundDirector.name}</div>
          </div>
          <div className="flex underline-offset-4 border-b h-10.25">
            <div className="font-bold w-16 h-7">Writers</div>
            <div className="pl-13.25 text-base">{foundWriting}</div>
          </div>
          <div className="flex underline-offset-4 border-b h-10.25">
            <div className="font-bold w-16 h-7">Stars</div>
            <div className="text-base pl-13.25">{foundActors}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Page;
