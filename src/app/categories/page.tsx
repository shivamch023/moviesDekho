"use client";
import { movies } from "@/app/data/movies";
import { useRouter } from "next/navigation";

const CategoriesPage: React.FC = () => {
  const router = useRouter();

  // Extract unique categories
  const categories = Array.from(new Set(movies.map((movie) => movie.category)));

  return (
    <div className="p-4 mt-[5rem] h-[50vh] ">
      <h1 className="text-3xl font-bold mb-6 text-center text-white relative">
        Movie Categories
        <span className="absolute top-10 left-1/2 transform -translate-x-1/2 h-1 w-25 bg-yellow-300"></span>
      </h1>

      <div className="flex flex-wrap gap-4 justify-center mt-[1rem]">
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
