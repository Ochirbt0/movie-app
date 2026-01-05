"use client";

import { useState } from "react";

type GenreClientProps = {
  genres: string;
};

export const GenreClient = ({ genres }: GenreClientProps) => {
  const [torluud, setTorluud] = useState();

  return (
    <div>
      <div className="border-b w-134.25 h-15">
        <div className="font-bold">Genres</div>
        <div>See lists of movies by genre</div>
      </div>
      
    </div>
  );
};
