// import { useSearchParams } from "next/navigation";
import page from "../category/page";
import { Genre } from "../components/Genre";
import useSWR from "swr";
import { fetcher } from "../../../utils/fetcher";
import { MovieGenreMap } from "../components/MovieGenreMap";
import { GenreAppearance } from "../components/GenreAppearance";

export type Genre = {
  genres: string;
  id: number;
  name: string;
};
// const discover = async (ids: Genre) => {
//   const { data } = useSWR(
//     `${process.env.TMDB_BASE_URL}/discover/movie?list=${ids}&language=en-US&page=1`,
//     fetcher
//   );
const movieGenreListSecond = async () => {
  const responseGenrelistSecond = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?language=en",
    {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MY_API_KEY}`,
      },
    }
  );

  const MovieGenreSecond = await responseGenrelistSecond.json();
  const MovieGenreResultsSecond = MovieGenreSecond.genres;
  return { MovieGenreResultsSecond };
  // const searchedGenres = data?.results || [];
  // console.log(searchedGenres);

  // const responseDiscover = await fetch(
  //   `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${ids}&page=${1}`,
  //   {
  //     headers: {
  //       "Content-type": "application/json",
  //       Authorization: `Bearer ${process.env.NEXT_PUBLIC_MY_API_KEY}`,
  //     },
  //   }
  // );

  // const discoveredMovieGenre = await responseDiscover.json();

  // return { discoveredMovieGenre };
};

export const Genres = async ({
  searchParams,
}: {
  searchParams: Promise<{ genre_ids: string }>;
}) => {
  const { MovieGenreResultsSecond }: { MovieGenreResultsSecond: Genre[] } =
    await movieGenreListSecond();
  const params = await searchParams;
  const genre_ids = params.genre_ids;
  // console.log(genre_ids);
  return (
    <div className="w-7xl h-314.25 pt-13 flex m-auto">
      <div>
        <div className="w-7xl h-9 pl-20 text-3xl font-semibold">
          Search filter
        </div>
        <div className="w-96.75 h-88 pl-15">
          <div className="w-53.25 h-15">
            <div className="w-53.25 h-15 pt-5 pl-5">
              <div className="font-semibold text-2xl">Genres</div>
              <div className="w-53.25 text-base">
                See lists of movies by genre
              </div>
            </div>
          </div>
          <MovieGenreMap MovieGenreResults={MovieGenreResultsSecond} />
        </div>
      </div>
      <div>
        <GenreAppearance genre_ids={genre_ids} />
      </div>
    </div>
  );
};

export default Genres;
