"use client";
import { movies } from "@/app/data/movies";
import { useRouter } from "next/navigation";

const GenresPage: React.FC = () => {
  const router = useRouter();

  // Count movies in each genre
  const genreCounts = movies.reduce<Record<string, number>>((acc, movie) => {
    acc[movie.genre] = (acc[movie.genre] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="p-4 mt-[2rem]">
      <h1 className="text-3xl font-bold mb-6 text-center text-white relative">
        Movie Genres
        <span className="absolute top-10 left-1/2 transform -translate-x-1/2 h-1 w-25 bg-yellow-300"></span>
      </h1>

      <div className="flex flex-wrap gap-4 justify-center mt-[1rem]">
        {Object.entries(genreCounts).map(([genre, count]) => (
          <button
            key={genre}
            className="px-4 py-2 bg-rose-500 text-white rounded-lg shadow-md hover:bg-rose-700 cursor-pointer"
            onClick={() => router.push(`/genre/${encodeURIComponent(genre)}`)}
          >
            {genre} ({count})
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenresPage;
