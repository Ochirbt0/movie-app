import { MovieCard } from "./components/MovieCard";
import { Scroll } from "./components/Scroll";

export default function Home() {
  return (
    <div className="w-full bg-red-50">
      <Scroll />
      <MovieCard />
    </div>
  );
}
