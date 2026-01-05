import { movieGenreList } from "../../../utils/fetcher";

export type Movie = {
  title: string;
  od: string;
  vote_average: number;
  poster_path: string;
  garchig: string;
  categoryTitle: string;
  release_date: string;
  id: number;
};

export const GenreList = async () => {
  const { MovieGenreResults }: { MovieGenreResults: Movie[] } =
    await movieGenreList();

  return (
    <div>
      <div>
        {/* {MovieGenreResults.map((genres) => {
          return <button>{}</button>;
        })} */}
      </div>
    </div>
  );
};
