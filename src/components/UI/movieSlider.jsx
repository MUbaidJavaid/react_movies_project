import { useEffect, useRef, useState } from 'react';
import { NavLink, useLoaderData } from 'react-router-dom';

const MovieCarousel = ({ autoSlideInterval = 3000 }) => {
  const data = useLoaderData();
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Debounce function
  const debounce = (func, delay) => {
    let timeoutId;
    return function(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  };

  // Initialize and handle resize
  useEffect(() => {
    const updateSlidesPerView = () => {
      const width = window.innerWidth;
      setSlidesPerView(width >= 1024 ? 4 : width >= 640 ? 2 : 1);
    };

    updateSlidesPerView();
    const debouncedResize = debounce(updateSlidesPerView, 100);
    window.addEventListener('resize', debouncedResize);
    
    return () => {
      window.removeEventListener('resize', debouncedResize);
    };
  }, []);

  // Handle data loading
  useEffect(() => {
    if (data?.Search) {
      setIsLoading(false);
    }
  }, [data]);

  // Auto-slide logic
  useEffect(() => {
    if (isLoading || isHovered || !data?.Search) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        const totalSlides = Math.ceil(data.Search.length / slidesPerView);
        return (prev + 1) % totalSlides;
      });
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [data?.Search, slidesPerView, isHovered, autoSlideInterval, isLoading]);

  // Scroll to current slide
  useEffect(() => {
    if (!carouselRef.current || isLoading || !data?.Search) return;

    const carousel = carouselRef.current;
    const slideWidth = carousel.scrollWidth / data.Search.length;
    carousel.scrollTo({
      left: currentIndex * slideWidth * slidesPerView,
      behavior: 'smooth'
    });
  }, [currentIndex, slidesPerView, data?.Search, isLoading]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!data?.Search || data.Search.length === 0) {
    return <div className="text-center py-8 text-gray-500">No movies found</div>;
  }

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        ref={carouselRef}
        className="flex overflow-hidden snap-x w-[80vw] lg:w-[60vw] my-10 snap-mandatory scrollbar-hide"
        style={{ scrollBehavior: 'smooth' }}
      >
        {data.Search.map((movie) => (
          <div 
            key={movie.imdbID}
            className="flex-shrink-0 w-1/3 lg:w-1/4 p-2 snap-start"
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2 mt-2">
        {Array.from({ length: Math.ceil(data.Search.length / slidesPerView) }).map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 -mt-9 rounded-full ${
              currentIndex === index ? 'bg-gray-800' : 'bg-gray-300'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

// Movie Card Component
const MovieCard = ({ movie }) => {
  const handleImageError = (e) => {
    e.target.src = '/placeholder.jpg';
  };

  return (
    <div className="border lg:w-44 w-28 sm:w-40 border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col h-full">
      <div className="w-full lg:h-60  h-36 sm:h-52 bg-cover aspect-[2/3] bg-gray-100 relative">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"}
          alt={movie.Title}
          className="object-cover w-full h-full"
          loading="lazy"
          onError={handleImageError}
        />
      </div>
      <NavLink to={`/movie/${movie.imdbID}`} className="w-full text-center text-sm font-semibold text-gray-800   hover:bg-gray-100 transition duration-300">
          <button className="bg-gray-700 text-white text-xs py-2 w-full rounded-b-sm hover:bg-gray-900 transition duration-300">
            wathch now
          </button>
      </NavLink>
    </div>
  );
};

export default MovieCarousel;