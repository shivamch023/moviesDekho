"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { FaDownload, FaEye, FaPlus } from "react-icons/fa";
import { movies } from "@/app/data/movies"; // No need to import Movie if not using it

const MovieDetailsPage: React.FC = () => {
  const { movieId } = useParams(); // movieId could be string | string[]

  // Ensure movieId is always a string
  const movieIdStr = Array.isArray(movieId) ? movieId[0] : movieId;

  // Find the current movie based on movieId
  const currentMovie = movies.find(
    (movie) => movie.id === parseInt(movieIdStr || "", 10)
  );

  // Handle case when movie is not found
  if (!currentMovie) {
    return (
      <div className="p-8 text-center text-red-500 bg-black min-h-screen">
        <h1 className="text-2xl font-bold">Movie not found</h1>
        <p className="text-gray-300">
          We could not find the movie you are looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-black mt-[5rem] min-h-screen">
      {/* Movie Details */}
      <div
        className="flex flex-col lg:flex-row items-center lg:items-start"
        style={{
          borderStyle: "solid",
          borderWidth: "3px",
          borderImage: "linear-gradient(to top, #FFD700, transparent) 1",
          borderRadius: "8px",
        }}
      >
        {/* Movie Poster */}
        <div className="w-full lg:w-1/3 flex justify-center lg:justify-end p-4">
          <Image
            src={currentMovie.image}
            alt={currentMovie.title}
            width={500}
            height={500}
            className="rounded-lg shadow-lg h-[330px] w-full lg:h-[560px] lg:w-[700px]"
          />
        </div>
        {/* Movie Info */}
        <div className="w-full lg:w-2/3 p-4 text-white mt-4">
          <h1 className="text-3xl font-bold text-yellow-500 mb-4">
            {currentMovie.title}
          </h1>
          <p className="mb-2 text-gray-300">
            <span className="font-semibold text-white">Category:</span>{" "}
            {currentMovie.category}
          </p>
          <p className="mb-2 text-gray-300">
            <span className="font-semibold text-white">Genre:</span>{" "}
            {currentMovie.genre}
          </p>
          <p className="mb-4 text-gray-300">
            <span className="font-semibold text-white">Starring:</span>{" "}
            {currentMovie.actor} & {currentMovie.actress}
          </p>
          <p className="mb-2 text-gray-300">
            <span className="font-semibold text-white">Storyline:</span>{" "}
            {currentMovie.desc}
          </p>
          <p className="mb-2 text-gray-300">
            <span className="font-semibold text-white">Duration:</span>{" "}
            {currentMovie.duration}
          </p>
          <p className="mb-2 text-gray-300">
            <span className="font-semibold text-white">ImdbRating:</span>{" "}
            {currentMovie.imdbRating}/10
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <button className="px-6 gap-2 flex items-center justify-center py-2 cursor-pointer bg-yellow-500 text-black rounded-lg shadow-md hover:bg-yellow-600 transition">
              Watch Now <FaEye />
            </button>
            <button className="px-6 gap-2 flex items-center justify-center cursor-pointer py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition">
              Download <FaDownload />
            </button>
            <button className="px-6 gap-2 flex items-center justify-center py-2 cursor-pointer bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-600 transition">
              Add to Watchlist <FaPlus />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
