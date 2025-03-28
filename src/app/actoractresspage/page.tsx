"use client";
import { movies } from "@/app/data/movies";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ActorsAndActressesPage: React.FC = () => {
  const router = useRouter();

  // Extract unique actors and actresses
  const actors = Array.from(new Set(movies.map((movie) => movie.actor)));
  const actresses = Array.from(new Set(movies.map((movie) => movie.actress)));

  const [searchTerm, setSearchTerm] = useState<string>("");

  // Filter actors and actresses based on the search term
  const filteredActors = actors.filter((actor) =>
    actor.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredActresses = actresses.filter((actress) =>
    actress.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 mt-[5rem]">
      <h1 className="text-3xl font-bold mb-6 text-center text-yellow-300">
        Actors and Actresses
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search for an Hollywood or bollywood , actor or actress"
          className="w-full max-w-md px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center text-blue-400">
          Actors
        </h2>
        <div className="flex flex-wrap gap-4 justify-center">
          {filteredActors.length > 0 ? (
            filteredActors.map((actor) => (
              <button
                key={actor}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 cursor-pointer"
                onClick={() =>
                  router.push(`/actor/${encodeURIComponent(actor)}`)
                }
              >
                {actor}
              </button>
            ))
          ) : (
            <p className="text-center text-gray-500 w-full">
              No actors found matching your search.
            </p>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4 text-center text-pink-400">
          Actresses
        </h2>
        <div className="flex flex-wrap gap-4 justify-center">
          {filteredActresses.length > 0 ? (
            filteredActresses.map((actress) => (
              <button
                key={actress}
                className="px-4 py-2 bg-pink-500 text-white rounded-lg shadow-md hover:bg-pink-600 cursor-pointer"
                onClick={() =>
                  router.push(`/actress/${encodeURIComponent(actress)}`)
                }
              >
                {actress}
              </button>
            ))
          ) : (
            <p className="text-center text-gray-500 w-full">
              No actresses found matching your search.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActorsAndActressesPage;
