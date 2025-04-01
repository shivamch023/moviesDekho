"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { movies, Movie } from "@/app/data/movies";
import { IoMdArrowRoundBack } from "react-icons/io";

const ActressMoviesPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const actressParam = params?.actress;

  const decodedactress =
    typeof actressParam === "string" ? decodeURIComponent(actressParam) : "";

  const filteredMovies: Movie[] = movies.filter(
    (movie) => movie.actress.toLowerCase() === decodedactress.toLowerCase()
  );
  const handleMovieClick = (movieId: number) => {
    router.push(`/movies/${movieId}`);
  };

  return (
    <div className="p-4 bg-black min-h-screen mt-[5rem] relative">
      {/* Page Title */}
      <h1 className="text-2xl font-bold mb-4 text-center text-white relative">
        Movies Starring {decodedactress}
        <span className="absolute bottom-[-5px] left-1/2 transform -translate-x-1/2 w-20 h-1 bg-yellow-500"></span>
        <button
          onClick={() => router.back()}
          className="flex absolute bottom-0 gap-2 px-4 py-2 items-center justify-center rounded-lg bg-gray-700 text-white hover:bg-yellow-500 hover:text-black cursor-pointer shadow-md text-[1rem]"
        >
          <h5 className="flex items-center justify-center gap-2">
            <IoMdArrowRoundBack />
          </h5>
        </button>
      </h1>

      {/* Movies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => handleMovieClick(movie.id)}
              className="bg-gray-900 border cursor-pointer rounded-lg shadow-md hover:shadow-xl transition-transform duration-300 hover:scale-104 text-yellow-300"
            >
              <Image
                src={movie.image}
                alt={movie.title}
                width={400}
                height={600}
                className="rounded-t-lg w-full h-[300px] object-cover"
              />
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
                <p className="text-xs text-gray-400 mt-2">
                  <span className="text-white">Staring :</span> {movie.actor} &{" "}
                  {movie.actress}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 w-full">
            No movies found starring {decodedactress}.
          </p>
        )}
      </div>
    </div>
  );
};

export default ActressMoviesPage;
