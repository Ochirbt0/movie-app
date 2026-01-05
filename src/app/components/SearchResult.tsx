import { Loader2Icon, ArrowRightIcon } from "lucide-react";
import { NoResult } from "./NoResult";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
type Movie = {
  title: string;
  od: string;
  vote_average: number;
  poster_path: string;
  garchig: string;
  categoryTitle: string;
  release_date: string;
  id: number;
};

type SearchResultProps = {
  isLoading: boolean;
  searchValue: string;
  searchedResults: [];
  data: Movie[];
  setSearchValue: Dispatch<SetStateAction<string>>;
};

export const SearchResult = ({
  data,
  isLoading,
  searchedResults,
  searchValue,
  setSearchValue,
}: SearchResultProps) => {
  const handleSeeMore = () => setSearchValue("");

  return (
    <div className="z-10 relative">
      <div className="bg-white absolute w-144.25 top-10 -left-120 rounded-lg">
        {isLoading ? (
          <div className="flex justify-center items-center w-144.25 h-32">
            <Loader2Icon />
          </div>
        ) : searchedResults.length > 0 ? (
          <>
            <div>
              {data.slice(0, 5).map((information) => {
                return (
                  <div key={information.id} className="flex w-138.25 pl-3 pt-3">
                    <div className="flex h-29 border-b w-138.25">
                      <div>
                        <img
                          className="w-16.75 h-25"
                          src={`https://image.tmdb.org/t/p/original${information.poster_path}`}
                          alt=""
                        />
                      </div>
                      <div className="w-138.25 pl-4">
                        <div className="flex flex-col">
                          <div className="flex text-xl font-semibold">
                            <p>{information.title}</p>
                          </div>
                          <div className="flex items-center text-sm">
                            <img
                              src="./star.png"
                              alt=""
                              className="w-4 h-4.5"
                            />
                            {information.vote_average.toFixed(1)}
                            <p className="text-xs text-gray-500">/10</p>
                          </div>
                        </div>
                        <div className="flex justify-between pt-3">
                          <div className="text-sm">
                            {information.release_date}
                          </div>

                          <Link
                            href={`/searchSeeMoreButton/${information.id}`}
                            onClick={handleSeeMore}
                          >
                            <button className="flex items-center gap-x-2 text-sm">
                              See more
                              <ArrowRightIcon className="w-4 h-4" />
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="text-sm font-medium pl-3 w-53 h-10 content-center">
                <button>See all results for "{searchValue}"</button>
              </div>
            </div>
          </>
        ) : (
          <NoResult />
        )}
      </div>
    </div>
  );
};
