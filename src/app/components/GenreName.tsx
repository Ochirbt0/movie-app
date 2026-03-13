import { useSearchParams } from "next/navigation";
import useSWR from "swr";
const movieGenreList = async (endPoint: string) => {
  const responseGenrelist = await fetch(endPoint, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_MY_API_KEY}`,
    },
  });

  const MovieGenre = await responseGenrelist.json();
  const MovieGenreResults = MovieGenre.name;
  return { MovieGenreResults };
};
export const GenreName = () => {
  const searchParams = useSearchParams();

  const ids = searchParams.get("ids");
  const genre_ids = searchParams.get("genre_ids");

  const currentPage = searchParams.get("page") ?? 1;

  const { data, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/genre/movie/list?language=en`,
    movieGenreList
  );

  console.log(data);
  return <div>GenreName</div>;
};
