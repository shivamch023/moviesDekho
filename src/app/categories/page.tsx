"use client";
import { movies } from "@/app/data/movies";
import { useRouter } from "next/navigation";

const CategoriesPage: React.FC = () => {
  const router = useRouter();

  // Extract unique categories
  const categories = Array.from(new Set(movies.map((movie) => movie.category)));

  return (
    <div className="p-4 mt-[5rem] ">
      <h1 className="text-3xl font-bold mb-6 text-center text-yellow-300">
        Movie Categories
      </h1>

      <div className="flex flex-wrap gap-4 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            className="px-4 py-2 bg-yellow-500 text-black rounded-lg shadow-md hover:bg-yellow-600 cursor-pointer"
            onClick={() =>
              router.push(`/category/${encodeURIComponent(category)}`)
            }
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
