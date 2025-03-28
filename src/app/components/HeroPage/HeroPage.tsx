import { Movie, movies } from "@/app/data/movies";
import { GetServerSideProps } from "next";

interface Props {
  hero: string;
  filteredMovies: Movie[];
}

const HeroPage: React.FC<Props> = ({ hero, filteredMovies }) => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">
        Movies Featuring {hero.toUpperCase()}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg"
            >
              <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
              <p className="text-gray-600 mb-1">Category: {movie.category}</p>
              <p className="text-gray-600 mb-1">Genre: {movie.genre}</p>
              <p className="text-sm text-gray-500">
                Starring: {movie.actor} & {movie.actress}
              </p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No movies found for {hero}.
          </p>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const hero = params?.hero as string;

  // Filter movies by actor or actress matching the hero
  const filteredMovies = movies.filter(
    (movie) =>
      movie.actor.toLowerCase() === hero.toLowerCase() ||
      movie.actress.toLowerCase() === hero.toLowerCase()
  );

  return {
    props: { hero, filteredMovies },
  };
};

export default HeroPage;
