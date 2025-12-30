import { Key } from "lucide-react";

export type Movie = {
  title: string;
  od: string;
  vote_average: number;
  poster_path: string;
};

const movieFromTMDB = async (movieCategory: string) => {
  const responseMovies = await fetch(
    `https://api.themoviedb.org/3/movie/${movieCategory}?language=en-US@page=1`,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MY_API_KEY}`,
      },
    }
  );

  const pageTwoAPIMovies = await responseMovies.json();
  const pageTwoAPIMoviesResults = pageTwoAPIMovies.results;

  return { pageTwoAPIMoviesResults };
};

export default async function Page({
  params,
}: {
  params: Promise<{ movieCategory: string }>;
}) {
  const { movieCategory } = await params;

  const moviesPage2 = await movieFromTMDB(movieCategory);
  const { pageTwoAPIMoviesResults }: { pageTwoAPIMoviesResults: Movie[] } =
    await movieFromTMDB(movieCategory);

  console.log(moviesPage2);

  return (
    <div className="">
      <div className="">
        <div>
          <p>{movieCategory}</p>
        </div>
        <div className="md:flex md:justify-center md:items-center">
          <div className=" w-360 md:pl-10 md:grid md:grid-cols-5 grid grid-cols-2 md:gap-8 pb-8">
            {pageTwoAPIMoviesResults
              .map((data) => {
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
                        <img src="/star.png" alt="" className=" pr-1 pb-1.25" />
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
              })
              .slice(0, 20)}
          </div>
        </div>
      </div>
    </div>
  );
}
