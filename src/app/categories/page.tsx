"use client";
import { movies } from "@/app/data/movies";
import { useRouter } from "next/navigation";
import GenresPage from "../components/Genre/Genre";

const CategoriesPage: React.FC = () => {
  const router = useRouter();

  // Count movies in each category
  const categoryCounts = movies.reduce<Record<string, number>>((acc, movie) => {
    acc[movie.category] = (acc[movie.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="p-4 mt-[6rem]">
      <h1 className="text-3xl font-bold mb-6 text-center text-white relative">
        Movie Categories
        <span className="absolute top-10 left-1/2 transform -translate-x-1/2 h-1 w-25 bg-yellow-300"></span>
      </h1>

      {/* ✅ Total Movies Count */}
      <div className="text-center text-white text-lg mb-6">
        <strong>Total Movies ✅ :</strong> {movies.length}
      </div>

      {/* Category Buttons with Count */}
      <div className="flex flex-wrap gap-4 justify-center mt-[1rem]">
        {Object.entries(categoryCounts).map(([category, count]) => (
          <button
            key={category}
            className="px-4 py-2 bg-rose-500 text-white rounded-lg shadow-md hover:bg-rose-700 cursor-pointer"
            onClick={() =>
              router.push(`/category/${encodeURIComponent(category)}`)
            }
          >
            {category} ({count})
          </button>
        ))}
      </div>
      <GenresPage />
    </div>
  );
};

export default CategoriesPage;
