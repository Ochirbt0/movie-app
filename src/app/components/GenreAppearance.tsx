import Link from "next/link";

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
};

const movieGenreAppeared = async (ids: string) => {
  const responseAppeared = await fetch(
    `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${ids}&page=${1}`,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MY_API_KEY}`,
      },
    }
  );
  const movieAppeared = await responseAppeared.json();

  const movieAppearedResults = movieAppeared.results;
  console.log(movieAppearedResults);

  return { movieAppearedResults };
};
const movieGenreList = async (genre_ids: string) => {
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

  return { MovieGenreResults };
};
type GenreAppearanceProps = {
  genre_ids: string;
};

export const GenreAppearance = async ({ genre_ids }: GenreAppearanceProps) => {
  const { movieAppearedResults }: { movieAppearedResults: Movie[] } =
    await movieGenreAppeared(genre_ids);
  console.log(genre_ids); // array bolgoj maplaad irj bga genre-s aa find hiine . taviad name avna(find hiihde)

  const {
    MovieGenreResults,
  }: { MovieGenreResults: { id: number; name: string }[] } =
    await movieGenreList(genre_ids);

  const genre_idsArray: number[] = genre_ids.split(",").map(Number);
  console.log(genre_idsArray);
  const finder = genre_idsArray.map(
    (genre_id) => MovieGenreResults.find(({ id }) => genre_id === id)?.name
  );
  const joined = finder.join(", ");
  // console.log(movieAppearedResults);

  return (
    <div className="flex flex-col justify-start pt-5 w-201.5 pl-5">
      <div className=" h-7 text-xl font-semibold">
        {movieAppearedResults.length} titles in "{joined}"
      </div>
      <div className="md:grid md:grid-cols-4 grid grid-cols-2 md:gap-x-48 md:gap-y-8 pt-8">
        {movieAppearedResults.slice(0, 12).map((kino) => {
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
    </div>
  );
};
