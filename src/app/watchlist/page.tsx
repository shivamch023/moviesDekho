"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { movies } from "@/app/data/movies";

const WatchlistPage: React.FC = () => {
  const router = useRouter();
  const [watchlist, setWatchlist] = useState<number[]>([]);
  const [showAllRelated, setShowAllRelated] = useState(false);

  useEffect(() => {
    const storedWatchlist = JSON.parse(
      localStorage.getItem("watchlist") || "[]"
    );
    setWatchlist(storedWatchlist);
  }, []);

  const handleMovieClick = (movieId: number) => {
    router.push(`/movies/${movieId}`);
  };

  const handleRemoveFromWatchlist = (movieId: number) => {
    const updatedWatchlist = watchlist.filter((id) => id !== movieId);
    setWatchlist(updatedWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
  };

  const watchlistedMovies = movies.filter((movie) =>
    watchlist.includes(movie.id)
  );

  const relatedMovies = movies.filter(
    (movie) =>
      !watchlist.includes(movie.id) &&
      watchlistedMovies.some(
        (watchlistedMovie) =>
          movie.genre === watchlistedMovie.genre ||
          movie.category === watchlistedMovie.category
      )
  );

  const maxRelatedMoviesToShow = 5;
  const moviesToDisplay = showAllRelated
    ? relatedMovies
    : relatedMovies.slice(0, maxRelatedMoviesToShow);

  if (watchlistedMovies.length === 0) {
    return (
      <div className="p-8 text-center text-white bg-black min-h-screen flex items-center justify-center flex-col">
        <h1 className="text-2xl font-bold">No Watchlisted Movies</h1>
        <p className="text-gray-300">
          You have not added any movies to your watchlist.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-black min-h-screen mt-[4rem]">
      <h1 className="text-3xl font-bold mb-6 text-center text-white relative">
        Watch Listed Movies
        <span className="absolute top-10 left-1/2 transform -translate-x-1/2 h-1 w-25 bg-yellow-300"></span>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {watchlistedMovies.map((movie) => (
          <div
            key={movie.id}
            className="bg-gray-900 border border-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <Image
              src={movie.image}
              alt={movie.title}
              width={400}
              height={600}
              className="rounded-t-lg w-full h-[300px] object-cover cursor-pointer"
              onClick={() => handleMovieClick(movie.id)}
            />
            <div className="p-4">
              <h2 className="text-lg font-bold mb-2 text-center text-yellow-500">
                {movie.title}
              </h2>
              <button
                onClick={() => handleRemoveFromWatchlist(movie.id)}
                className="mt-4 w-full bg-red-600 cursor-pointer text-white py-2 rounded-lg hover:bg-red-700 transition"
              >
                Remove from Watchlist
              </button>
            </div>
          </div>
        ))}
      </div>

      {relatedMovies.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Related Movies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {moviesToDisplay.map((movie) => (
              <div
                key={movie.id}
                className="bg-gray-900 border border-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <Image
                  src={movie.image}
                  alt={movie.title}
                  width={400}
                  height={600}
                  className="rounded-t-lg w-full h-[300px] object-cover cursor-pointer"
                  onClick={() => handleMovieClick(movie.id)}
                />
                <div className="p-4">
                  <h2 className="text-lg font-bold mb-2 text-center text-yellow-500">
                    {movie.title}
                  </h2>
                </div>
              </div>
            ))}
          </div>

          {relatedMovies.length > maxRelatedMoviesToShow && (
            <div className="text-center mt-6">
              <button
                onClick={() => setShowAllRelated(!showAllRelated)}
                className="bg-yellow-500 cursor-pointer text-black py-2 px-4 rounded-lg hover:bg-yellow-600 transition"
              >
                {showAllRelated ? "View Less" : "View More"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WatchlistPage;
