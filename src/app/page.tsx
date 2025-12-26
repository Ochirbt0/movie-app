import { MovieCard } from "./components/Moviecard";
import { Popular } from "./components/Popular";
import { Scroll } from "./components/Scroll";
import { TopRated } from "./components/TopRated";
import { Upcoming } from "./components/UpcomingMovies";

export type MovieHome = {
  title: string;
  od: string;
  vote_average: number;
  poster_path: string;
  overview: string;
  backdrop_path: string;
};

const carouselAPI = async () => {
  const responseNowPlaying = await fetch(
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US@",
    {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MY_API_KEY}`,
      },
    }
  );

  const nowPlayingMovies = await responseNowPlaying.json();
  const nowPlayingMoviesResults = nowPlayingMovies.results as MovieHome[];

  return { nowPlayingMoviesResults };
};

export const Home = async () => {
  const { nowPlayingMoviesResults } = await carouselAPI();

  return (
    <div className="w-full m-auto">
      <Scroll movies={nowPlayingMoviesResults.slice(0, 5)} />
      <Upcoming />
      <Popular />
      <TopRated />
    </div>
  );
};

export default Home;
