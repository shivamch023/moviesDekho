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
  const [selectedLetter, setSelectedLetter] = useState<string | null>("All");

  // Filter actors and actresses based on the search term or selected letter
  const filteredActors = actors.filter((actor) => {
    const lowerActor = actor.toLowerCase();
    if (selectedLetter && selectedLetter !== "All") {
      return lowerActor.startsWith(selectedLetter.toLowerCase());
    }
    return lowerActor.includes(searchTerm.toLowerCase());
  });

  const filteredActresses = actresses.filter((actress) => {
    const lowerActress = actress.toLowerCase();
    if (selectedLetter && selectedLetter !== "All") {
      return lowerActress.startsWith(selectedLetter.toLowerCase());
    }
    return lowerActress.includes(searchTerm.toLowerCase());
  });

  // Generate alphabet array (A-Z) and prepend "All"
  const alphabet = [
    "All",
    ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)),
  ];

  return (
    <div className="p-4 mt-[5rem]">
      <h1 className="text-3xl font-bold mb-6 text-center text-white relative">
        Actors and Actresses
        <span className="absolute top-10 left-1/2 transform -translate-x-1/2 h-1 w-20 bg-yellow-300"></span>
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search for an actor or actress"
          className="w-full max-w-md px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none  focus:ring-2 focus:ring-yellow-500"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setSelectedLetter("All"); // Reset to "All" on search
          }}
        />
      </div>

      {/* Alphabet Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {alphabet.map((letter) => (
          <button
            key={letter}
            className={`px-3 py-1 rounded-lg shadow-md transition-transform duration-300 hover:scale-108 ${
              selectedLetter === letter
                ? "bg-yellow-500 text-white"
                : "bg-gray-700 text-gray-300 cursor-pointer hover:bg-yellow-300 hover:text-black "
            }`}
            onClick={() => {
              setSelectedLetter(letter);
              setSearchTerm(""); // Reset search term when letter is selected
            }}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Actors Section */}
      <div className="mb-8">
        <h2 className="text-4xl font-semibold mb-4 text-center text-white">
          Actors
        </h2>
        <div className="flex flex-wrap gap-4 justify-center">
          {filteredActors.length > 0 ? (
            filteredActors.map((actor) => (
              <button
                key={actor}
                className="px-4 py-2 bg-rose-500 text-white rounded-lg shadow-md hover:bg-rose-600 cursor-pointer transition-transform duration-300 hover:scale-106"
                onClick={() =>
                  router.push(`/actor/${encodeURIComponent(actor)}`)
                }
              >
                {actor}
              </button>
            ))
          ) : (
            <p className="text-center text-gray-500 w-full">
              No actors found for the selected filter.
            </p>
          )}
        </div>
      </div>

      {/* Actresses Section */}
      <div>
        <h2 className="text-4xl font-semibold mb-4 text-center text-white">
          Actresses
        </h2>
        <div className="flex flex-wrap gap-4 justify-center">
          {filteredActresses.length > 0 ? (
            filteredActresses.map((actress) => (
              <button
                key={actress}
                className="px-4 py-2 bg-rose-500 text-white rounded-lg shadow-md hover:bg-rose-600 cursor-pointer transition-transform duration-300 hover:scale-106"
                onClick={() =>
                  router.push(`/actress/${encodeURIComponent(actress)}`)
                }
              >
                {actress}
              </button>
            ))
          ) : (
            <p className="text-center text-gray-500 w-full">
              No actresses found for the selected filter.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActorsAndActressesPage;
