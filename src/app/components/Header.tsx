import { ChevronDown, VectorSquare } from "lucide-react";
import { SearchButton } from "./SearchButton";
import Link from "next/link";
import { GenreList } from "./GenreList";

export const Header = () => {
  return (
    <div className="h-14.75 flex justify-center items-center">
      <div className="flex w-7xl h-9 justify-between items-center">
        <Link href="/">
          <div className="flex space-x-2 justify-center items-center">
            <img src="/film.png" alt="" className="w-5 h-5" />
            <p className="text-indigo-700 font-bold text-base">Movie Z</p>
          </div>
        </Link>
        <div className="flex justify-center items-center space-x-3">
          <div className="flex w-24.25 h-9 border justify-center rounded-md">
            <div className="flex items-center justify-center gap-x-1">
              <button onClick={GenreList}>
                <ChevronDown className="w-4 h-4" />
                Genre
              </button>
              {/* <GenreList /> */}
            </div>
          </div>
          <div className=" w-94.75 md:block hidden">
            <SearchButton />
          </div>
        </div>
        <div className="w-9 h-9 flex border justify-center items-center rounded-md">
          <button>
            <img src="./moon.png" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};
