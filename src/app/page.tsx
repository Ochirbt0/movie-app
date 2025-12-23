import { MovieCard } from "./components/MovieCard";
import { Scroll } from "./components/Scroll";

const sampleMovie = async () => {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/upcoming?language=en-US@page=1",
    {
      headers: {
        "Content-type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTUxNTYwYjVhNGM5ZDI5OTNjYmQxZDIzNjg3MzM4MiIsIm5iZiI6MTc2NjQ2MjAzNy40MDUsInN1YiI6IjY5NGExMjU1MTk4OWM2YzQyNzhjZWI1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.O5EHu68s0ueTRbeCfYYDgANOsPMyX1rlU_pO5O_CAAw",
      },
    }
  );
};

export default function Home() {
  return (
    <div className="w-full">
      <Scroll />
      <div className="flex flex-col">
        <div className="flex pt-13">
          <p className="text-2xl">Upcoming</p>
          <button>see more</button>
        </div>
        <MovieCard />
      </div>
    </div>
  );
}
