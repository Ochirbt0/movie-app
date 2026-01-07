"use client";

import { ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { MouseEvent, useState } from "react";
export type Genre = {
  genres: string;
  id: number;
  name: string;
};

export const MovieGenreMap = ({
  MovieGenreResults,
}: {
  MovieGenreResults: Genre[];
}) => {
  const { push } = useRouter();
  const searchParams = useSearchParams();

  const ids = String(searchParams.get("genre_ids")).split(",") ?? [];

  const [genre_ids, setGenre_ids] = useState(ids);

  const handleGenresIds = (id: string) => () => {
    const foundId = genre_ids.find((idd) => idd === id);

    let gendesIds;

    if (foundId) {
      gendesIds = genre_ids.filter((genderId) => genderId !== id);
      setGenre_ids(gendesIds);
    } else {
      gendesIds = [...genre_ids, id];

      setGenre_ids(gendesIds);
    }

    push(`/discover?genre_ids=${gendesIds.join(",")}`);
  };

  return (
    <div className="pt-8 pl-5 flex flex-wrap gap-x-4 gap-y-4">
      {MovieGenreResults.map((genres) => {
        function handleSeeMore(
          event: MouseEvent<HTMLAnchorElement, MouseEvent>
        ): void {
          throw new Error("Function not implemented.");
        }

        return (
          <div key={genres.id} className="font-semibold">
            <button
              className="h-5 flex items-center justify-center border rounded-full text-xs gap-x-2"
              onClick={handleGenresIds(String(genres.id))}
            >
              <div className="flex pl-2.5">
                {genres.name}
                <ChevronRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        );
      })}
    </div>
  );
};
