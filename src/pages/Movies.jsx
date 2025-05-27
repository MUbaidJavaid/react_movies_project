import { useLoaderData } from "react-router-dom";
import { MovieCard } from "../components/UI/Cart";
import { Bottom } from "../components/UI/bottum";

export const Movies = ({ darkMode }) => {
  const sampleMovie = useLoaderData(); 
  console.log('Sample Movies:', sampleMovie);
  console.log('Movies:', sampleMovie.Search);
  if (!sampleMovie || !Array.isArray(sampleMovie.Search)) {
    return <div className="text-center text-red-500">No movies found.</div>;
  }
  if (sampleMovie.Error) {
    return <div className="text-center text-red-500">{sampleMovie.Error}</div>;
  }
  if (sampleMovie.Response === "False") {
    return <div className="text-center text-red-500">No movies found.</div>;
  }

  return (
    <>
      <div
        className={`flex flex-row flex-wrap my-16 gap-3 gap-y-12 lg:mx-32 justify-center animate-fade-in ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}
      >
        {Array.isArray(sampleMovie.Search) && sampleMovie.Search.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            darkMode={darkMode}
            movie={movie}
          />
        ))}
      </div>
      <Bottom />
    </>
  );
}