export const fetcher = async (endpoint: string) => {
  const response = await fetch(endpoint, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${process.env.NEXT_PUBLIC_MY_API_KEY}`,
    },
    cache: "force-cache",
  });
  return await response.json();
};
export const movieSearchedSeeMore = async (secondSearchSeeMore: number) => {
  const responseSearchedSeeMore = await fetch(
    `https://api.themoviedb.org/3/movie/${secondSearchSeeMore}?language=en-US`,
    {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_MY_API_KEY}`,
      },
    }
  );

  const searchedSeeMoreMovies = await responseSearchedSeeMore.json();
  return { searchedSeeMoreMovies };
};
// export const movieGenreList = async () => {
//   const responseGenrelist = await fetch(
//     "https://api.themoviedb.org/3/genre/movie/list?language=en",
//     {
//       headers: {
//         "Content-type": "application/json",
//         Authorization: `Bearer ${process.env.NEXT_PUBLIC_MY_API_KEY}`,
//       },
//     }
//   );

//   const MovieGenre = await responseGenrelist.json();
//   const MovieGenreResults = MovieGenre.name;
//   console.log(MovieGenreResults);

//   return { MovieGenreResults };
// };
