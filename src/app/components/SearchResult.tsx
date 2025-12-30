export type Movie = {
  title: string;
  od: string;
  vote_average: number;
  poster_path: string;
  garchig: string;
  categoryTitle: string;
  releaseDate: string;
};

export const SearchResult = ({ data }: { data: Movie[] }) => {
  return (
    <div className="w-144.25 h-182.25">
      <div>
        {data
          .map((information) => {
            return (
              <div key={information.title}>
                <div>
                  <img
                    src={`https://image.tmdb.org/t/p/original${info.poster_path}`}
                    alt=""
                  />
                </div>
                <div>
                  <div>
                    <div>
                      <p>{information.title}</p>
                    </div>
                    <div>
                      <img
                        src="./star.png"
                        alt=""
                        className="w-4 h-4.5 pr-1 pb-1.25"
                      />
                      {information.vote_average.toFixed(1)}/10
                    </div>
                  </div>
                  <div>
                    <div>{information.releaseDate}</div>
                    <div>
                      <button>see more</button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
          .slice(0, 5)}
      </div>
    </div>
  );
};
