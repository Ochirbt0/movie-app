import Link from "next/link";

export type Movie = {
  title: string;
  od: string;
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
  //   console.log(movieAppearedResults);
  return { movieAppearedResults };
};
const movieGenreList = async (genre_names: string) => {
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
  const MovieGenreNames = MovieGenre.name;
  console.log(MovieGenreResults);
  return { MovieGenreResults };
};
type GenreAppearanceProps = {
  genre_ids: string;
  //   genre_names: string;
};

export const GenreAppearance = async ({ genre_ids }: GenreAppearanceProps) =>
  //   { genre_names }: GenreAppearanceProps
  {
    const { movieAppearedResults }: { movieAppearedResults: Movie[] } =
      await movieGenreAppeared(genre_ids);
    // console.log(genre_ids);
    // const name = (genre_ids: string) => {
    //   genre_ids === genre_ids ? MovieGenreResults.name : null;
    // };
    // console.log(name);
    const { MovieGenreResults }: { MovieGenreResults: Movie[] } =
      await movieGenreList(genre_ids);
    console.log(MovieGenreResults);
    return (
      <div>
        <div>
          {movieAppearedResults.length} titles in "{}"
        </div>
        <div></div>
      </div>
    );
  };
