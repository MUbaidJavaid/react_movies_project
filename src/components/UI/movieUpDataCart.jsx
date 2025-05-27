import { Heart, PlayCircle, Star } from "lucide-react";
import React, { useState } from "react";

export const MovieCard = React.forwardRef(({ movie, inWatchlist, onWatchlistToggle, onPlayTrailer, darkMode }, ref) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    
    const handleImageLoad = () => {
      setImageLoaded(true);
    };
    
    const handleImageError = () => {
      setImageError(true);
    };
    
    return (
      <div 
        ref={ref}
        className={`rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        {/* Poster with aspect ratio */}
        <div className="relative aspect-[2/3] w-full overflow-hidden">
          {/* Loading skeleton */}
          {!imageLoaded && !imageError && (
            <div className={`absolute inset-0 animate-pulse ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
          )}
          
          {/* Actual image or fallback */}
          <img
            src={imageError ? "/api/placeholder/300/450" : movie.Poster}
            alt={`${movie.Title} poster`}
            className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            loading="lazy"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
          
          {/* Overlay controls */}
          <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/70 flex flex-col justify-between p-3">
            <div className="flex justify-end">
              <button 
                onClick={onWatchlistToggle}
                className="p-1 rounded-full bg-black/50 hover:bg-black/70"
                aria-label={inWatchlist ? `Remove ${movie.Title} from watchlist` : `Add ${movie.Title} to watchlist`}
              >
                <Heart size={16} className={inWatchlist ? 'text-yellow-500 fill-yellow-500' : 'text-white'} />
              </button>
            </div>
            <button
              onClick={onPlayTrailer}
              className="bg-yellow-500 text-gray-900 text-xs md:text-sm font-medium p-2 rounded flex items-center justify-center gap-1"
              aria-label={`Watch ${movie.Title} trailer`}
            >
              <PlayCircle size={16} />
              Play Trailer
            </button>
          </div>
          
          {/* IMDb rating badge */}
          <div className="absolute top-2 left-2 bg-yellow-500 text-gray-900 text-xs px-1.5 py-0.5 rounded flex items-center">
            <Star size={12} className="mr-0.5" />
            {movie.imdbRating}
          </div>
        </div>
        
        {/* Movie info */}
        <div className="p-3">
          <h3 className="font-medium text-sm md:text-base line-clamp-1">{movie.Title}</h3>
          <div className="flex justify-between items-center mt-1 mb-3">
            <span className="text-xs md:text-sm text-gray-400">{movie.Year}</span>
            <span className="text-xs bg-gray-700 text-gray-300 px-1.5 py-0.5 rounded">
              {movie.Runtime ? movie.Runtime.split(' ')[0] : 'N/A'} min
            </span>
          </div>
          <button
            className={`w-full text-xs md:text-sm py-2 rounded font-medium transition-colors ${
              darkMode 
                ? 'bg-yellow-500 hover:bg-yellow-400 text-gray-900'
                : 'bg-yellow-600 hover:bg-yellow-500 text-white'
            }`}
            aria-label={`Watch ${movie.Title}`}
          >
            Watch Now
          </button>
        </div>
      </div>
    );
  });