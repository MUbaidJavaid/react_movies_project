import { Outlet, useNavigation, useLoaderData } from "react-router-dom";
import Header from "../UI/header";
import { Footer } from "../UI/footer";
import { Loading } from "../UI/loading";
import { UseError } from "../../pages/useError";
import { useState, useEffect, useMemo, useCallback } from "react";

// Custom hook for movie-related logic
function useMovieData(initialMovies) {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('popularity');
  const [loading, setLoading] = useState(false); // Added loading state

  // Debounce search input

  
  useEffect(() => {
    setLoading(true);
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setLoading(false);
    }, 500);

    return () => {
      clearTimeout(timerId);
      setLoading(false);
    };
  }, [searchTerm]);

  // Filter and sort movies
  const filteredAndSortedMovies = useMemo(() => {
    if (!initialMovies?.Search) return [];
    const filtered = initialMovies.Search.filter(movie =>
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
  }, [initialMovies, debouncedSearchTerm, sortOption]);

  // Pagination
  const paginatedMovies = useMemo(() => {
    return filteredAndSortedMovies.slice(0, page * 8);
  }, [filteredAndSortedMovies, page]);

  // Load more movies
  const loadMore = useCallback(() => {
    if (loading || page * 8 >= filteredAndSortedMovies.length) return;
    setPage(prev => prev + 1);
  }, [loading, page, filteredAndSortedMovies.length]);

  return {
    movies: paginatedMovies,
    loading,
    hasMore: page * 8 < filteredAndSortedMovies.length,
    searchTerm,
    setSearchTerm,
    sortOption,
    setSortOption,
    loadMore
  };
}

// Main AppLayout component
export const AppLayout = () => {
  const navigation = useNavigation();
  const sampleMovies = useLoaderData();
  const [darkMode, setDarkMode] = useState(true);
  const [watchlist] = useState([]);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeTrailer, setActiveTrailer] = useState(null);
  const {
    movies,
    searchTerm,
    setSearchTerm,
    sortOption,
    setSortOption,
    loadMore,
    hasMore,
    loading
  } = useMovieData(sampleMovies);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Movies', path: '/movies' },
    { name: 'Movies_', path: '/moviepage' },
    { name: 'Contact', path: '/contact' }
  ];

  if (navigation.state === "loading") return <Loading />;
  if (navigation.state === "error") return <UseError />;

  return (
    <>
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        navItems={navItems}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        watchlist={watchlist}
        setIsWatchlistOpen={setIsWatchlistOpen}
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        sortOption={sortOption}
        setSortOption={setSortOption}
        activeTrailer={activeTrailer}
        setActiveTrailer={setActiveTrailer}
        movies={movies}
      />

      <Outlet
        context={{
          darkMode,
          setDarkMode,
          //  toggleWatchlist,
          // movies,
          //  watchlist,
          // isWatchlistOpen,
          // setIsWatchlistOpen,
          // isFilterOpen,
          // sortOption,
          // setSortOption,
          // activeTrailer,
          // setActiveTrailer,
          // loadMore,
          // hasMore,
          // sampleMovies: sampleMovies
        }}
      />

      <Footer />
    </>
  );
};
