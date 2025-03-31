"use client";
import { movies } from "@/app/data/movies";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Function to parse release date correctly
const parseDate = (dateString: string): number => {
  return new Date(dateString).getTime();
};

const TrendingMovies: React.FC = () => {
  const router = useRouter();

  // Sort movies by release date (latest first)
  const trendingMovies = [...movies]
    .filter((movie) => parseDate(movie.releaseDate)) // Ensure valid date
    .sort((a, b) => parseDate(b.releaseDate) - parseDate(a.releaseDate)) // Sort descending
    .slice(0, 10); // Get top 10 latest movies

  // Handle movie card click
  const handleMovieClick = (movieId: number) => {
    router.push(`/movies/${movieId}`);
  };

  return (
    <div className="p-4 mt-[4rem] bg-black min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-white relative">
        Trending Movies
        <span className="absolute top-10 left-1/2 transform -translate-x-1/2 h-1 w-25 bg-yellow-300"></span>
      </h1>

      {/* Movie List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-[2rem]">
        {trendingMovies.length > 0 ? (
          trendingMovies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => handleMovieClick(movie.id)}
              className="bg-gray-900 border border-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
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
                <p className="text-xs text-gray-300">
                  <span className="text-white">Release Date :</span>{" "}
                  {movie.releaseDate}
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
