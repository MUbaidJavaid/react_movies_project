// import { NavLink } from "react-router-dom"
// import MovieCarousel from "../components/UI/movieSlider"


// export const Home = () => {


       
//     return (
//         <div className="flex flex-col items-center text-gray-800 justify-center">
//             <section className="relative lg:mx-0 h-[40vh] lg:h-[80vh] w-full overflow-hidden rounded-b-sm shadow-lg">
//                 <img
//                 src="src\assets\homePage.jpeg"
//                 alt="Contact Us"
//                 className="w-full h-full object-cover"
//                 loading="eager"
//                 />
//                 <div className="absolute backdrop-blur-sm inset-0 bg-white/5  flex flex-col   px-4">
//                     <div className=" p-8 lg:w-[50vw] rounded-xl flex flex-col my-auto text-center lg:text-start lg:mx-5 lg:my-28">
//                        <p className="text-sm md:text-md mb-2 font-bold text-white/90">EXPLORE LATEST IN  MOVIES INDUSTRIES</p>
//                         <h1 className="text-3xl md:text-5xl font-bold text-white lg:mb-4">Unlimited Movies, TVs</h1>
//                         <h1 className="text-3xl md:text-5xl font-bold text-white lg:mb-4">Shows, & More.</h1>
//                         <p className="text-sm md:text-md mb-4 text-white/90">Discover the Top Best Movies and Dramas with a catchy subtitle like Your
//                         Ultimate Guide to Must-Watch Content</p>
//                         <NavLink to="/movies" ><button className="bg-red-800 text-white w-52 px-4 py-2 mx-auto lg:mx-0 rounded-lg hover:bg-white hover:text-gray-800 transition duration-300">Explore more</button></NavLink>

//                     </div>
//                 </div>
//             </section>

//             <MovieCarousel />


//         </div>
//     )
// }


import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Sun, Moon, Play, Star, Info } from 'lucide-react';
import { useLoaderData } from 'react-router-dom';
import { Bottom } from '../components/UI/bottum';
// Simulated API fetcher
const fetcher = (url) => fetch(url).then(res => res.json());

export default function MovieWebsite({ darkMode }) {
  const movies = useLoaderData();
  console.log(movies);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const carouselRef = useRef(null);
  const prefersReducedMotion = useRef(window.matchMedia('(prefers-reduced-motion: reduce)').matches);



  const slideCount = Math.ceil(movies.Search.length / getVisibleSlides());

  function getVisibleSlides() {
    if (typeof window === 'undefined') return 1;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 4;
  }

  const [visibleSlides, setVisibleSlides] = useState(getVisibleSlides());

  useEffect(() => {
    const handleResize = () => {
      setVisibleSlides(getVisibleSlides());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slideCount);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slideCount) % slideCount);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const openTrailerModal = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };


  const transitionStyle = prefersReducedMotion.current ? {} : { transition: 'transform 0.5s ease' };

return (
    <div className={`min-h-screen ${darkMode ? 'bg-black' : 'bg-gray-100'}`}>
        <section className="relative h-96 md:h-128 w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10">
                <img 
                    src="/src/assets/bg6.webp" 
                    alt="Featured movie banner" 
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 z-20">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">Dune: Part Two</h2>
                <p className="text-lg text-gray-300 mb-6 max-w-2xl">
                    Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.
                </p>
                <div className="flex flex-wrap gap-4">
                    <button 
                        className="bg-yellow-500 text-black font-medium px-6 py-3 rounded hover:shadow-lg hover:shadow-yellow-500/30 transform hover:scale-105 active:scale-95 transition-transform"
                        aria-label="Watch Now"
                    >
                        Watch Now
                    </button>
                    <button 
                        className="bg-gray-700 text-white font-medium px-6 py-3 rounded hover:bg-gray-600 transform hover:scale-105 active:scale-95 transition-transform"
                        aria-label="Add to Watchlist"
                    >
                        + Add to Watchlist
                    </button>
                </div>
            </div>
        </section>


        <section className={`py-12 px-6 ${darkMode ? 'bg-black' : 'bg-gray-100'}`}></section>
            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Popular Movies
            </h2>
            
            <div className="relative">
                <button
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70"
                    aria-label="Previous slide"
                >
                    <ChevronLeft size={24} />
                </button>
                
                <div 
                    ref={carouselRef}
                    className="overflow-hidden"
                    aria-live="polite"
                >
                    <div 
                        className="flex"
                        style={{ 
                            ...transitionStyle,
                            transform: `translateX(-${currentIndex * 100 / visibleSlides}%)` 
                        }}
                    >
                        {movies.Search.map((movie) => (
                            <div 
                                key={movie.imdbID} 
                                className={`px-2 ${
                                    visibleSlides === 1 ? 'w-full' : 
                                    visibleSlides === 2 ? 'w-1/2' : 
                                    'w-1/4'
                                }`}
                            >
                                <div className="movie-card bg-gray-800 rounded-lg overflow-hidden shadow-lg h-full hover:transform hover:translate-y-2 transition-all duration-300">
                                    <div className="relative aspect-[2/3]">
                                        <img
                                            src={movie.Poster}
                                            alt={`${movie.Title} poster`}
                                            className="w-full h-full object-cover transition-opacity opacity-0 duration-300"
                                            loading="lazy"
                                            decoding="async"
                                            onLoad={(e) => e.target.classList.remove('opacity-0')}
                                        />
                                        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                            {/* {movie.imdbRating} */}1.6
                                        </div>
                                        <button
                                            onClick={() => openTrailerModal(movie)}
                                            className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/40 transition-opacity"
                                            aria-label={`Watch ${movie.Title} trailer`}
                                        >
                                            <div className="bg-yellow-500/90 p-3 rounded-full">
                                                <Play className="text-black" size={24} />
                                            </div>
                                        </button>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-medium text-white text-sx mb-1">{movie.Title}</h3>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-gray-400 text-sm">{movie.Year}</span>
                                            <div className="flex items-center">
                                                <Star size={16} className="text-yellow-500 mr-1" />
                                                {/* <span className="text-white">{movie.stars}</span> */}
                                            </div>
                                        </div>
                                        <button
                                            className="mt-2 text-sm font-medium text-yellow-500 hover:text-yellow-400 flex items-center"
                                            aria-label={`More info about ${movie.Title}`}
                                        >
                                            <Info size={4} className="mr-1" /> More Info
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                <button
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70"
                    aria-label="Next slide"
                >
                    <ChevronRight size={24} />
                </button>
            </div>
            
            <div className="flex justify-center gap-1 mt-8">
                {[...Array(slideCount)].map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goToSlide(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                            currentIndex === i ? 'w-6 bg-yellow-500' : 'w-3 bg-gray-500'
                        }`}
                        aria-label={`Go to slide ${1 + 1}`}
                        aria-current={currentIndex === i ? 'true' : 'false'}
                    />
                ))}
            </div>
         <Bottom />


    </div>
);
  }
