"use client";
import { movies } from "@/app/data/movies";
import { useState } from "react";
import { Search } from "lucide-react"; // Add a search icon from lucide-react

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showResults, setShowResults] = useState<boolean>(false);

  // Filter movies based on the search query
  const filteredMovies = movies.filter((movie) =>
    Object.values(movie)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  // Handle search action
  const handleSearch = () => {
    setShowResults(true);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Search Movies</h1>

      <div className="flex items-center mb-4 space-x-2">
        <input
          type="text"
          className="w-full p-2 border rounded-lg shadow-sm"
          placeholder="Search by movie name, genre, actor, actress, or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="p-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 flex items-center"
        >
          <Search className="h-5 w-5" />
        </button>
      </div>

      {showResults && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <div
                key={movie.id}
                className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg"
              >
                <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
                <p className="text-gray-600 mb-1">Category: {movie.category}</p>
                <p className="text-gray-600 mb-1">Genre: {movie.genre}</p>
                <p className="text-sm text-gray-500">
                  Starring: {movie.actor} & {movie.actress}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No movies found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
