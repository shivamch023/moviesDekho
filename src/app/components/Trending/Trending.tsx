"use client";
import { movies } from "@/app/data/movies";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const TrendingMovies: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter();

  // Sort movies by ID (newest first) and limit to 10 movies
  const trendingMovies = movies.sort((a, b) => b.id - a.id).slice(0, 10);

  // Filter movies based on the search query
  const filteredMovies = trendingMovies.filter((movie) =>
    Object.values(movie)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  // Handle movie card click
  const handleMovieClick = (movieId: number) => {
    router.push(`/movies/${movieId}`);
  };

  return (
    <div className="p-4 mt-[5rem] bg-black min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-white relative">
        Trending Movies
        <span className="absolute top-10 left-1/2 transform -translate-x-1/2 h-1 w-25 bg-yellow-300"></span>
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
        <button className="py-2 px-8 bg-gradient-to-r to-rose-500 flex items-center gap-1 justify-center from-yellow-500 text-white rounded-lg  hover:scale-105 cursor-pointer duration-300 transition-all">
          Search
        </button>
      </div>

      {/* Movie List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
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
          <p className="text-center text-gray-300">No movies found.</p>
        )}
      </div>
    </div>
  );
};

export default TrendingMovies;
