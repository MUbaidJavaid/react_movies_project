import { NavLink } from "react-router-dom"
export const MovieCard = ({ movie }) => {

    return (
      <div className="border border-gray-200 lg:w-44 w-24 rounded-sm shadow-md overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col justify-center items-center">     
      <div className="w-full lg:h-60 h-32 bg-cover"> {/* Maintain 2:3 aspect ratio */}
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"}
          alt={movie.Title}
          className="object-cover w-full h-full"
          loading="lazy"
        />
      </div>
      <NavLink to={`/movie/${movie.imdbID}`} className="w-full text-center text-sm font-semibold text-gray-800   hover:bg-gray-100 transition duration-300">
          <button className="bg-gray-700 text-white text-xs py-2 w-full rounded-b-sm hover:bg-gray-900 transition duration-300">
            wathch now
          </button>
      </NavLink>
      </div>
      )
}