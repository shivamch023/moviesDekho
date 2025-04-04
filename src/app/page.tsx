import React from "react";
import MoviesPage from "./components/MoviesPage/MoviesPage";
import TopRatedMovies from "./components/TopImdbMovie/TopImdbMovie";

const page = () => {
  return (
    <div className="p-1 bg-black">
      <MoviesPage />
      <TopRatedMovies />
    </div>
  );
};

export default page;
