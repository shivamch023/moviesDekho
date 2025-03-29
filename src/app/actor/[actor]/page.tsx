"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { movies, Movie } from "@/app/data/movies";
import { IoMdArrowRoundBack } from "react-icons/io";

const ActorMoviesPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const actorParam = params?.actor;

  const decodedActor =
    typeof actorParam === "string" ? decodeURIComponent(actorParam.trim()) : "";

  const filteredMovies: Movie[] = movies.filter(
    (movie) => movie.actor.toLowerCase().trim() === decodedActor.toLowerCase()
  );

  const handleMovieClick = (movieId: number) => {
    router.push(`/movies/${movieId}`);
  };

  return (
    <div className="p-4 bg-black min-h-screen mt-[4rem] relative">
      {/* Page Title */}
      <div className="relative flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-yellow-500 hover:text-black cursor-pointer shadow-md text-[1rem]"
        >
          <IoMdArrowRoundBack />
          Back
        </button>
        <h1 className="text-2xl font-bold mb-4 text-center text-white relative w-full">
          Movies Starring {decodedActor}
          <span className="absolute bottom-[-5px] left-1/2 transform -translate-x-1/2 w-20 h-1 bg-yellow-500"></span>
        </h1>
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => handleMovieClick(movie.id)}
              className="bg-gray-900 cursor-pointer border rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 text-yellow-300"
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
                <span className="text-white">Category :</span> {movie.category}
                </p>
                <p className="text-sm text-gray-300"><span className="text-white">Genre :</span> {movie.genre}</p>
                <p className="text-xs text-gray-400 mt-2">
                <span className="text-white">Staring :</span> {movie.actor} & {movie.actress}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 w-full">
            No movies found starring {decodedActor}.
          </p>
        )}
      </div>
    </div>
  );
};

export default ActorMoviesPage;
