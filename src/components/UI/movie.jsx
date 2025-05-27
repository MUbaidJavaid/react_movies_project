import { useLoaderData } from "react-router-dom";
import { Bottom } from "./bottum.jsx";
export const MoviesDetails = () => {
    const movieDetails = useLoaderData();
      console.log(movieDetails);
        return (
          <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Poster Card Section */}
              <section className="flex-shrink-0 items-center lg:w-1/3 xl:w-1/4 w-full">
                <div className="rounded-lg h-96 w-64 mx-auto overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                  <img
                    src={movieDetails.Poster !== "N/A" ? movieDetails.Poster : "/placeholder.jpg"}
                    alt={`${movieDetails.Title} poster`}
                    className="w-full h-auto aspect-[2/3] object-cover"
                    loading="lazy"
                    onError={(e) => {
                      (e.target).src = "/placeholder.jpg";
                    }}
                  />
                </div>
                <div className="mt-4 flex justify-around text-center">
                 
                  <p className="text-gray-600 mt-1">{movieDetails.Year} • {movieDetails.Rated}</p>
                  <div className=" flex justify-center items-center gap-2">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm font-medium">
                      ⭐ {movieDetails.imdbRating}
                    </span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                      {movieDetails.Runtime}
                    </span>
                  </div>
                </div>
              </section>
      
              {/* Metadata Section */}
              <section className="flex-1 bg-white p-6 rounded-lg shadow-md">

      
                {/* Plot Section */}
                <div className="mt-8">
                <h1 className="text-xl font-bold text-gray-900">{movieDetails.Title}</h1>
                  {/* <h2 className="text-xl font-bold  text-gray-900 mb-3">Plot</h2> */}
                  <p className="text-gray-700 mt-2 text-justify leading-relaxed">{movieDetails.Plot}</p>
                </div>
      
                {/* Secondary Details */}
                <div className="mt-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-3">Additional Information</h2>
                </div>
      
                {/* IMDb Link */}
                {movieDetails.imdbID && (
                  <div className="mt-8 text-center sm:text-left">
                    <a
                      href={`https://www.imdb.com/title/${movieDetails.imdbID}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-800 hover:bg-gray-600 transition-colors duration-200"
                    >
                      View on IMDb
                    </a>
                  </div>
                )}
              </section>
            </div>
            <Bottom />
          </article>
        );
      };