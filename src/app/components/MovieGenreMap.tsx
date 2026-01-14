"use client";

import { cn } from "@/lib/utils";
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

  const ids = String(searchParams.get("genre_ids") ?? "").split(",") ?? [];

  const [genre_ids, setGenre_ids] = useState<String[]>(ids);

  console.log(genre_ids);

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

    if (id !== null) {
      push(`/discover?genre_ids=${gendesIds.filter(Boolean).join(",")}`);
    }
  };

  console.log(genre_ids);
  return (
    <div className="pt-8 flex flex-wrap gap-x-4 gap-y-4">
      {MovieGenreResults.map((genres) => {
        // console.log(MovieGenreResults);
        return (
          <div key={genres.id} className="font-semibold">
            <button
              className={cn(
                "h-5 flex items-center justify-center border rounded-full text-xs gap-x-2",
                ids.includes(String(genres?.id))
                  ? "bg-gray-500 text-white"
                  : "bg-white text-black"
              )}
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
