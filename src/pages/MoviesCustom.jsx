import { Film, X, PlayCircle } from 'lucide-react';
import { MovieCard } from '../components/UI/movieUpDataCart';
import { Bottom } from '../components/UI/bottum';
import { useLoaderData } from 'react-router-dom';
import { useState, useEffect, useCallback, useMemo } from 'react';
// ResponsiveMoviePage removed as it was unused and all logic is now handled in AppLayout.

export const ResponsiveMoviePage = () => {
  const darkMode = false; // Set this as needed or pass as a prop

  const sampleMovies = useLoaderData();
  const [searchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [sortOption] = useState('popularity');
  const [page, setPage] = useState(1);
  const [watchlist, setWatchlist] = useState([]);
  const [activeTrailer, setActiveTrailer] = useState(null);

  // Debounce search input
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timerId);
  }, [searchTerm]);

  // Filter and sort movies
  const filteredAndSortedMovies = useMemo(() => {
    if (!sampleMovies || !Array.isArray(sampleMovies.Search)) return [];
    const filtered = sampleMovies.Search.filter(movie =>
      movie.Title?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
    return [...filtered].sort((a, b) => {
      switch (sortOption) {
        case 'year-desc': return parseInt(b.Year) - parseInt(a.Year);
        case 'year-asc': return parseInt(a.Year) - parseInt(b.Year);
        case 'rating': return parseFloat(b.imdbRating || 0) - parseFloat(a.imdbRating || 0);
        case 'title': return a.Title.localeCompare(b.Title);
        default: return 0;
      }
    });
  }, [sampleMovies, debouncedSearchTerm, sortOption]);

  // Pagination logic
  const paginatedMovies = useMemo(() => {
    return filteredAndSortedMovies.slice(0, page * 8);
  }, [filteredAndSortedMovies, page]);

  // Loading state
  const loading = !sampleMovies || !sampleMovies.Search;

  // Load more movies
  const loadMore = useCallback(() => {
    if (loading || page * 8 >= filteredAndSortedMovies.length) return;
    setPage(prev => prev + 1);
  }, [loading, page, filteredAndSortedMovies.length]);

  const toggleWatchlist = useCallback((movie) => {
    setWatchlist(prev => prev.some(m => m.imdbID === movie.imdbID)
      ? prev.filter(m => m.imdbID !== movie.imdbID)
      : [...prev, movie]
    );
  }, []);

  const displayMovies = paginatedMovies;

  const showEmptyState = !loading && displayMovies.length === 0;

  if (showEmptyState) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <main className="max-w-7xl mx-auto px-4 py-6">
          <div className={`text-center py-16 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <Film size={64} className="mx-auto mb-4" />
            <h2 className="text-2xl font-medium mb-2">No movies available</h2>
            <p className="mb-4">We couldn't find any movies to display</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-yellow-500 rounded hover:bg-yellow-400"
            >
              Try Again
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (loading && displayMovies.length === 0) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
        <main className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`rounded-lg overflow-hidden shadow animate-pulse ${
                  darkMode ? 'bg-gray-800' : 'bg-gray-200'
                }`}
              >
                <div className="aspect-[2/3] w-full bg-gray-700" />
                <div className="p-3 space-y-2">
                  <div className={`h-4 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`} />
                  <div className="flex justify-between">
                    <div className={`h-3 w-16 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`} />
                    <div className={`h-3 w-8 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`} />
                  </div>
                  <div className={`h-8 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`} />
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  // Normal state
  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayMovies.map((movie, index) => (
            <MovieCard
              key={`${movie.imdbID}-${index}`}
              movie={movie}
              inWatchlist={watchlist.some(m => m.imdbID === movie.imdbID)}
              onWatchlistToggle={() => toggleWatchlist(movie)}
              onPlayTrailer={() => setActiveTrailer(movie)}
              darkMode={darkMode}
            />
          ))}
        </div>

        {loading && displayMovies.length > 0 && (
          <div className="flex justify-center mt-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-t-2 border-yellow-500"></div>
          </div>
        )}

        {displayMovies.length < filteredAndSortedMovies.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={loadMore}
              className="px-4 py-2 bg-yellow-500 rounded hover:bg-yellow-400"
            >
              Load More
            </button>
          </div>
        )}
      </main>

      {/* Trailer modal */}
      {activeTrailer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/90"
            onClick={() => setActiveTrailer(null)}
          ></div>

          <div className="relative w-full max-w-3xl bg-black rounded-lg overflow-hidden">
            <div className="aspect-video w-full">
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <PlayCircle size={48} className="mx-auto mb-4 text-yellow-500" />
                  <p>Trailer for {activeTrailer.Title}</p>
                  <p className="text-sm text-gray-500">Video would play here in production</p>
                </div>
              </div>
            </div>
            <div className="p-4 flex justify-between items-center">
              <div>
                <h3 className="font-medium">{activeTrailer.Title} ({activeTrailer.Year})</h3>
                <p className="text-sm text-gray-400">{activeTrailer.Runtime}</p>
              </div>
              <button
                onClick={() => setActiveTrailer(null)}
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700"
                aria-label="Close trailer"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      <Bottom />
    </div>
);}
// No prop validation needed as ResponsiveMoviePage is removed and AppLayout does not take props.