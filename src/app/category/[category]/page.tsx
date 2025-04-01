"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { movies, Movie } from "@/app/data/movies";
import { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

const CategoryMoviesPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const categoryParam = params?.category;

  const decodedCategory =
    typeof categoryParam === "string" ? decodeURIComponent(categoryParam) : "";

  const filteredMovies: Movie[] = movies.filter(
    (movie) => movie.category.toLowerCase() === decodedCategory.toLowerCase()
  );

  const genres = Array.from(
    new Set(filteredMovies.map((movie) => movie.genre))
  ); // Extract unique genres

  // Handle movie card click
  const handleMovieClick = (movieId: number) => {
    router.push(`/movies/${movieId}`);
  };

  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Filtered movies based on genre and search term
  const displayedMovies =
    selectedGenre === null
      ? filteredMovies.filter(
          (movie) =>
            movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            movie.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
            movie.actress.toLowerCase().includes(searchTerm.toLowerCase()) ||
            movie.genre.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : filteredMovies
          .filter((movie) => movie.genre === selectedGenre)
          .filter(
            (movie) =>
              movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              movie.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
              movie.actress.toLowerCase().includes(searchTerm.toLowerCase()) ||
              movie.genre.toLowerCase().includes(searchTerm.toLowerCase())
          );

  return (
    <div className="p-4 bg-black min-h-screen mt-[6rem] relative">
      {/* Page Title */}
      <h1 className="text-2xl md:text-4xl font-bold mb-4 text-center text-white relative">
        {decodedCategory} Movies
        <span className="absolute bottom-[-5px] left-1/2 transform -translate-x-1/2 w-20 h-1 bg-yellow-500"></span>
        <button
          onClick={() => router.back()}
          className="flex absolute bottom-0 gap-2 px-4 py-2 items-center justify-center rounded-lg bg-gray-700 text-white hover:bg-yellow-500 hover:text-black cursor-pointer shadow-md text-[1rem]"
        >
          <h5 className="flex items-center justify-center gap-2">
            {" "}
            <IoMdArrowRoundBack />
          </h5>
        </button>
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by movie name, actor, or genre"
          className="w-full max-w-md px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Genre Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        <button
          onClick={() => setSelectedGenre(null)}
          className={`px-4 py-2 rounded-xl ${
            selectedGenre === null
              ? "bg-yellow-500 text-black"
              : "bg-gray-700 text-white hover:bg-yellow-500 cursor-pointer hover:text-black"
          }`}
        >
          All Genres
        </button>
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`px-4 py-2 rounded-xl ${
              selectedGenre === genre
                ? "bg-yellow-500 text-black"
                : "bg-gray-700 text-white hover:bg-yellow-500 hover:text-black cursor-pointer"
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Movies Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
        {displayedMovies.length > 0 ? (
          displayedMovies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => handleMovieClick(movie.id)}
              className="bg-gray-900 border rounded-lg shadow-md hover:shadow-xl  text-yellow-300 transition-transform duration-300 hover:scale-104 cursor-pointer"
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
              <div className="p-3">
                <h2 className="text-lg font-semibold mb-1 text-center">
                  {movie.title}
                </h2>
                <p className="text-sm text-gray-300">
                  <span className="text-white">Category :</span>{" "}
                  {movie.category}
                </p>
                <p className="text-sm text-gray-300">
                  <span className="text-white">Genre :</span> {movie.genre}
                </p>
                <p className="text-xs text-gray-400 mt-1.4">
                  <span className="text-white">Starring :</span> {movie.actor} &{" "}
                  {movie.actress}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 w-full">
            No movies found matching your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryMoviesPage;
