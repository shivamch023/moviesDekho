"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { FaDownload, FaEye, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { movies } from "@/app/data/movies";

const MovieDetailsPage: React.FC = () => {
  const { movieId } = useParams();
  const router = useRouter();

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userAction, setUserAction] = useState<string | null>(null);
  const [watchlist, setWatchlist] = useState<number[]>(() => {
    // Get watchlist from localStorage
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("watchlist") || "[]");
    }
    return [];
  });
  const [showAllMovies, setShowAllMovies] = useState(false);

  const movieIdStr = Array.isArray(movieId) ? movieId[0] : movieId;
  const currentMovie = movies.find(
    (movie) => movie.id === parseInt(movieIdStr || "", 10)
  );

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

  const relatedMovies = movies.filter(
    (movie) =>
      movie.genre === currentMovie.genre && movie.id !== currentMovie.id
  );

  const handleMovieClick = (movieId: number) => {
    router.push(`/movies/${movieId}`);
  };

  const handleLike = () => {
    if (userAction === "dislike") {
      setDislikes((prev) => prev - 1);
    }
    if (userAction !== "like") {
      setLikes((prev) => prev + 1);
      setUserAction("like");
    } else {
      setLikes((prev) => prev - 1);
      setUserAction(null);
    }
  };

  const handleDislike = () => {
    if (userAction === "like") {
      setLikes((prev) => prev - 1);
    }
    if (userAction !== "dislike") {
      setDislikes((prev) => prev + 1);
      setUserAction("dislike");
    } else {
      setDislikes((prev) => prev - 1);
      setUserAction(null);
    }
  };

  const handleWatchlist = (movieId: number) => {
    const updatedWatchlist = watchlist.includes(movieId)
      ? watchlist.filter((id) => id !== movieId) // Remove if already in watchlist
      : [...watchlist, movieId]; // Add to watchlist

    setWatchlist(updatedWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
  };

  const displayedMovies = showAllMovies
    ? relatedMovies
    : relatedMovies.slice(0, 5);

  return (
    <div className="p-4 bg-black mt-[5rem] min-h-screen">
      <div
        className="flex flex-col lg:flex-row items-center lg:items-start bg-gradient-to-r from-black via-gray-900 to-gray-800 text-black p-6 rounded-lg shadow-lg"
        style={{
          borderStyle: "solid",
          borderWidth: "3px",
          borderImage: "linear-gradient(to top, #FFD700, transparent) 1",
          borderRadius: "8px",
        }}
      >
        <div className="w-full lg:w-1/3 flex justify-center lg:justify-end lg:p-4 p-0">
          <Image
            src={currentMovie.image}
            alt={currentMovie.title}
            width={500}
            height={500}
            className="rounded-lg shadow-lg h-[330px] w-full lg:h-[560px] lg:w-[700px]"
          />
        </div>
        <div className="w-full lg:w-2/3 lg:p-4 p-0 text-white mt-4">
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
            <span className="font-semibold text-white">Release Date:</span>{" "}
            {currentMovie.releaseDate}
          </p>
          <p className="mb-2 text-gray-300">
            <span className="font-semibold text-white">IMDb Rating:</span>{" "}
            {currentMovie.imdbRating}/10
          </p>
          <div className="mt-6 flex gap-4">
            <button
              onClick={handleLike}
              className={`px-4 py-2 text-white cursor-pointer rounded-lg shadow-md flex items-center gap-2 transition ${
                userAction === "like"
                  ? "bg-green-700"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              <FaThumbsUp /> {likes}
            </button>
            <button
              onClick={handleDislike}
              className={`px-4 py-2 text-white cursor-pointer rounded-lg shadow-md flex items-center gap-2 transition ${
                userAction === "dislike"
                  ? "bg-red-700"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              <FaThumbsDown /> {dislikes}
            </button>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <button className="py-2 px-8 bg-gradient-to-r to-rose-500 flex items-center gap-1 justify-center from-yellow-500 text-white rounded-lg  hover:scale-108 cursor-pointer duration-300 transition-all">
              Download <FaDownload />
            </button>
            <button className="py-2 px-8 bg-gradient-to-r to-rose-500 flex items-center gap-1 justify-center from-yellow-500 text-white rounded-lg  hover:scale-108 cursor-pointer duration-300 transition-all">
              Watch Now <FaEye />
            </button>

            <button
              onClick={() => handleWatchlist(currentMovie.id)}
              className={`px-6 py-2 text-white rounded-lg flex cursor-pointer items-center justify-center gap-2 shadow-md transition ${
                watchlist.includes(currentMovie.id)
                  ? "bg-red-700"
                  : "bg-gray-500 hover:bg-gray-600"
              }`}
            >
              {watchlist.includes(currentMovie.id)
                ? "Remove from Watchlist -"
                : "Add to Watchlist +"}{" "}
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-yellow-500 mb-4">
          Related Movies
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {displayedMovies.length > 0 ? (
            displayedMovies.map((movie) => (
              <div
                key={movie.id}
                onClick={() => handleMovieClick(movie.id)}
                className="bg-gray-900 border border-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-104 cursor-pointer"
              >
                <Image
                  src={movie.image}
                  alt={movie.title}
                  width={400}
                  height={600}
                  className="rounded-t-lg w-full h-[300px] object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-bold mb-2 text-center text-yellow-500">
                    {movie.title}
                  </h2>
                  <p className="text-sm text-gray-300 mb-1">
                    <span className="text-white">Category:</span>{" "}
                    {movie.category}
                  </p>
                  <p className="text-sm text-gray-300 mb-1">
                    <span className="text-white">Genre:</span> {movie.genre}
                  </p>
                  <p className="text-xs text-gray-300 mb-1">
                    <span className="text-white">Starring:</span> {movie.actor}{" "}
                    & {movie.actress}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center w-full min-h-[100px] bg-gray-900">
              <p className="text-gray-300 text-center text-lg md:text-base sm:text-sm px-4 ">
                No related movies found.
              </p>
            </div>
          )}
        </div>
        {relatedMovies.length > 5 && !showAllMovies && (
          <button
            onClick={() => setShowAllMovies(true)}
            className="mt-4 py-2 px-8 bg-gradient-to-r to-rose-500 flex items-center gap-1 justify-center from-yellow-500 text-white rounded-lg  hover:scale-105 cursor-pointer duration-300 transition-all"
          >
            View More
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieDetailsPage;
