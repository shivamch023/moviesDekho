"use client";
import { movies } from "@/app/data/movies";
import { useRouter } from "next/navigation";

const GenresPage: React.FC = () => {
  const router = useRouter();

  // Extract unique genres
  const genres = Array.from(new Set(movies.map((movie) => movie.genre)));

  return (
    <div className="p-4 mt-[5rem]">
      <h1 className="text-3xl font-bold mb-6 text-center text-white relative">
        Movie Genres
        <span className="absolute top-10 left-1/2 transform -translate-x-1/2 h-1 w-25 bg-yellow-300"></span>
      </h1>

      <div className="flex flex-wrap gap-4 justify-center mt-[1rem]">
        {genres.map((genre) => (
          <button
            key={genre}
            className="px-4 py-2 bg-yellow-500 text-black rounded-lg shadow-md hover:bg-yellow-600 cursor-pointer"
            onClick={() => router.push(`/genre/${encodeURIComponent(genre)}`)}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenresPage;
