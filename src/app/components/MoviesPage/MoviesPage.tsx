"use client";
import { movies } from "@/app/data/movies";
import { useState } from "react";
import Image from "next/image";

const MoviesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState<number>(10); // Number of movies to show initially

  // Filter movies based on the search query
  const filteredMovies = movies.filter((movie) =>
    Object.values(movie)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  // Handle showing more movies
  const showMoreMovies = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  return (
    <div className="p-4 mt-[4rem] bg-black min-h-screen">
      <h1 className="text-3xl p-2 font-bold mb-6 text-center text-white">
        All Movies
      </h1>

      {/* Search Bar */}
      <div className="flex items-center justify-center mb-6 space-x-2">
        <input
          type="text"
          className="w-1/2 p-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-md"
          placeholder="Search by movie name, genre, actor, actress, or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="p-2 bg-yellow-500 text-black rounded-lg shadow-md hover:bg-yellow-600 cursor-pointer">
          Search
        </button>
      </div>

      {/* Movie List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {filteredMovies.length > 0 ? (
          filteredMovies.slice(0, visibleCount).map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-900 border border-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
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
                  Category: {movie.category}
                </p>
                <p className="text-sm text-gray-300 mb-1">
                  Genre: {movie.genre}
                </p>
                <p className="text-xs text-gray-300 mb-1">
                  Starring: {movie.actor} & {movie.actress}
                </p>

                {/* Action Buttons */}
                <div className="flex justify-between items-center mt-4">
                  <button className="w-[48%] cursor-pointer text-nowrap py-2 bg-yellow-500 text-black rounded-lg shadow-md hover:bg-yellow-600 transition-all">
                    Watch Now
                  </button>

                  <button className="w-[48%] cursor-pointer py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all">
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-300">No movies found.</p>
        )}
      </div>

      {/* Show More Button */}
      {filteredMovies.length > visibleCount && (
        <div className="flex justify-center mt-6">
          <button
            onClick={showMoreMovies}
            className="p-3 bg-yellow-500 text-black rounded-lg shadow-md hover:bg-yellow-600 cursor-pointer"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default MoviesPage;
