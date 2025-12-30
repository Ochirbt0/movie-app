import Link from "next/link";

export type Movie = {
  title: string;
  od: string;
  vote_average: number;
  poster_path: string;
};

const moviePopular = async () => {
  const responsePopular = await fetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US@",
    {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MY_API_KEY}`,
      },
    }
  );

  const popularMovies = await responsePopular.json();
  const popularMoviesResults = popularMovies.results;

  return { popularMoviesResults };
};

export const Popular = async () => {
  const { popularMoviesResults }: { popularMoviesResults: Movie[] } =
    await moviePopular();
  const category3 = "Popular";
  return (
    <div className="flex flex-wrap justify-center md:space-x-8">
      <div className="flex flex-col">
        <div className="flex pb-8 pt-13 justify-between">
          <p className="text-2xl font-semibold">{category3}</p>
          <Link href="/category/popular">
            <button className="pr-10">see more</button>
          </Link>
        </div>

        <div className="md:grid md:grid-cols-5 grid grid-cols-2  gap-8 md:space-x-8 pb-8">
          {popularMoviesResults
            .map((info) => {
              return (
                <div
                  key={info.title}
                  className="w-[157.5px] h-[309.1px] md:w-[229.73px] md:h-109.75 bg-gray-50 rounded-lg  space-y-1"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original${info.poster_path}`}
                    alt=""
                    className="rounded-lg"
                  />
                  <div className="flex flex-col pl-2">
                    <p className="flex items-center w-[213.73px] h-5.75">
                      <img
                        src="./star.png"
                        alt=""
                        className="w-4 h-4.5 pr-1 pb-1.25"
                      />
                      {info.vote_average.toFixed(1)}/10
                    </p>
                  </div>
                  <div className="flex flex-col pl-2">
                    <p className="text-sm md:text-lg md:w-[213.73px] md:h-14">
                      {info.title}
                    </p>
                  </div>
                </div>
              );
            })
            .slice(0, 10)}
        </div>
      </div>
    </div>
  );
};
