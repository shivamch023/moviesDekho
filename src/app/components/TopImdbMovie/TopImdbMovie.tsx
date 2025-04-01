"use client";
import { movies } from "@/app/data/movies";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const TopRatedMovies: React.FC = () => {
  const router = useRouter();

  // Filter movies with IMDb rating 8.0 or higher
  const topRatedMovies = movies.filter((movie) => movie.imdbRating >= "8.0");

  // State to track the number of visible movies
  const [visibleMoviesCount, setVisibleMoviesCount] = useState(5);

  // Handle "View More" button click
  const handleViewMore = () => {
    setVisibleMoviesCount((prevCount) => prevCount + 5);
  };

  // Handle movie card click
  const handleMovieClick = (movieId: number) => {
    router.push(`/movies/${movieId}`);
  };

  return (
    <div className="p-4 mt-[4rem] bg-black min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-white relative">
        Top Imdb 8.0+ Rated Movies & Web Series
        <span className="absolute top-10 left-1/2 transform -translate-x-1/2 h-1 w-25 bg-yellow-300"></span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {topRatedMovies.length > 0 ? (
          topRatedMovies.slice(0, visibleMoviesCount).map((movie) => (
            <div
              key={movie.id}
              onClick={() => handleMovieClick(movie.id)}
              className="bg-gray-900 border border-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-104 cursor-pointer"
            >
              {/* Movie Image */}
              <Image
                src={movie.image}
                alt={movie.title}
                width={400}
                height={600}
                className="rounded-t-lg w-full h-[300px] object-cover"
              />
              {/* Movie Details */}
              <div className="p-4">
                <h2 className="text-lg font-bold mb-2 text-center text-yellow-500">
                  {movie.title}
                </h2>

                <p className="text-sm text-gray-300 mb-1">
                  <span className="text-white">Category :</span>{" "}
                  {movie.category}
                </p>
                <p className="text-sm text-gray-300 mb-1">
                  <span className="text-white">Genre :</span> {movie.genre}
                </p>
                <p className="text-xs text-gray-300 mb-1">
                  <span className="text-white">Starring :</span> {movie.actor} &{" "}
                  {movie.actress}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-300">
            No top-rated movies found.
          </p>
        )}
      </div>

      {visibleMoviesCount < topRatedMovies.length && (
        <div className="text-center mt-6">
          <button
            onClick={handleViewMore}
            className="py-2 px-8 bg-gradient-to-r to-rose-500  gap-1 justify-center from-yellow-500 text-white rounded-lg  hover:scale-105 cursor-pointer duration-300 transition-all"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default TopRatedMovies;
