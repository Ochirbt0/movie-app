import { log } from "console";

export type Movie = {
  title: string;
  rating: number;
  od: string;
  image: string;
};

// const sampleMovie: Movie[] = [
// ];

const movieAPI = async () => {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US@page=1",
    {
      headers: {
        "Content-type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTUxNTYwYjVhNGM5ZDI5OTNjYmQxZDIzNjg3MzM4MiIsIm5iZiI6MTc2NjQ2MjAzNy40MDUsInN1YiI6IjY5NGExMjU1MTk4OWM2YzQyNzhjZWI1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.O5EHu68s0ueTRbeCfYYDgANOsPMyX1rlU_pO5O_CAAw",
      },
    }
  );

  const data = await response.json();

  return data;
};

export const MovieCard = async () => {
  const movies = await movieAPI();
  console.log(movies);
  return (
    <div className="flex space-x-8">
      {/* {sampleMovie.map((movie) => (
        <div
          key={movie.title}
          className="w-[229.73px] h-109.75  bg-gray-50  space-y-1"
        >
          <img src={movie.image} alt="" className="w-[229.73px] h-85" />
          <p className="flex items-center">
            <img src={movie.od} alt="" className="w-4 h-4.5 pr-1 pb-1.25" />
            {movie.rating}/10
          </p>
          <p className="text-lg">{movie.title}</p>
        </div>
      ))} */}
    </div>
  );
};
