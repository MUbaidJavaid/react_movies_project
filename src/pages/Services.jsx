import { useState, useEffect, useRef } from 'react';
import { Play, Download, Users, Brain, Star, ChevronRight, Search, X } from 'lucide-react';
import { Bottom } from '../components/UI/bottum';


// Mock data for demonstration
const TRENDING_MOVIES = [
  { 
    id: 1, 
    backdrop: "/src/assets/bg0.jpg",
    title: "Inception"
  },
  { 
    id: 2, 
    backdrop: "/src/assets/bg1.jpg",
    title: "Interstellar"
  },
  { 
    id: 3, 
    backdrop: "/src/assets/bg2.jpeg",
    title: "The Dark Knight"
  }
];

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Chen ",
    role: "Premium Subscriber",
    quote: "Movies Mod completely replaced my other streaming services. The AI recommendations are spot on!",
    avatar: "/src/assets/teamMember0.jpg"
  },
  {
    id: 2,
    name: "Michael Johnson ",
    role: "Family Plan User",
    quote: "The family plan is perfect for us. Each person gets their own profile with tailored recommendations.",
    avatar: "/src/assets/teamMember1.jpg"
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "Movie Enthusiast",
    quote: "Offline downloads changed how I watch movies during travel. The quality is exceptional.",
    avatar: "/src/assets/teamMember2.jpg"
  }
];

// Sample API response
const SAMPLE_MOVIES = [
  {
    id: "tt1375666",
    title: "Inception",
    poster: "/src/assets/movies0.jpg",
    year: "2010",
    rating: "8.8"
  },
  {
    id: "tt0816692",
    title: "Interstellar",
    poster: "/src/assets/movies1.jpg",
    year: "2014",
    rating: "8.6"
  },
  {
    id: "tt7286456",
    title: "Joker",
    poster: "/src/assets/movies2.jpg",
    year: "2019",
    rating: "8.4"
  },
  {
    id: "tt1853728",
    title: "Django Unchained",
    poster: "/src/assets/movies3.jpg",
    year: "2012",
    rating: "8.4"
  }
];

// Neural network SVG component
const NeuralNetworkSVG = () => (
  <svg viewBox="0 0 200 100" className="w-full h-32">
    <g fill="none" stroke="#FCD34D" strokeWidth="1">
      {/* Nodes */}
      <circle cx="30" cy="30" r="5" />
      <circle cx="30" cy="50" r="5" />
      <circle cx="30" cy="70" r="5" />
      
      <circle cx="100" cy="20" r="5" />
      <circle cx="100" cy="40" r="5" />
      <circle cx="100" cy="60" r="5" />
      <circle cx="100" cy="80" r="5" />
      
      <circle cx="170" cy="30" r="5" />
      <circle cx="170" cy="50" r="5" />
      <circle cx="170" cy="70" r="5" />
      
      {/* Connections */}
      <line x1="35" y1="30" x2="95" y2="20" />
      <line x1="35" y1="30" x2="95" y2="40" />
      <line x1="35" y1="30" x2="95" y2="60" />
      <line x1="35" y1="30" x2="95" y2="80" />
      
      <line x1="35" y1="50" x2="95" y2="20" />
      <line x1="35" y1="50" x2="95" y2="40" />
      <line x1="35" y1="50" x2="95" y2="60" />
      <line x1="35" y1="50" x2="95" y2="80" />
      
      <line x1="35" y1="70" x2="95" y2="20" />
      <line x1="35" y1="70" x2="95" y2="40" />
      <line x1="35" y1="70" x2="95" y2="60" />
      <line x1="35" y1="70" x2="95" y2="80" />
      
      <line x1="105" y1="20" x2="165" y2="30" />
      <line x1="105" y1="20" x2="165" y2="50" />
      <line x1="105" y1="20" x2="165" y2="70" />
      
      <line x1="105" y1="40" x2="165" y2="30" />
      <line x1="105" y1="40" x2="165" y2="50" />
      <line x1="105" y1="40" x2="165" y2="70" />
      
      <line x1="105" y1="60" x2="165" y2="30" />
      <line x1="105" y1="60" x2="165" y2="50" />
      <line x1="105" y1="60" x2="165" y2="70" />
      
      <line x1="105" y1="80" x2="165" y2="30" />
      <line x1="105" y1="80" x2="165" y2="50" />
      <line x1="105" y1="80" x2="165" y2="70" />
    </g>
  </svg>
);

// Service cards
const ServiceCard = ({ title, description, icon, visual, interactive }) => {
  return (
    <div className="service-card bg-black bg-opacity-70 rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-800">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div className="bg-yellow-500 p-2 rounded-lg mr-3">
            {icon}
          </div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        {visual}
      </div>
      <p className="text-gray-300 mb-6">{description}</p>
      {interactive}
    </div>
  );
};

// MovieGrid component for API demo
const MovieGrid = ({ data }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
      {data.map(movie => (
        <div key={movie.id} className="relative group">
          <img src={movie.poster} alt={movie.title} className="w-full rounded-md" />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
            <div className="text-center p-2">
              <p className="font-bold text-sm">{movie.title}</p>
              <p className="text-xs text-yellow-400">{movie.year} • ⭐ {movie.rating}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Download progress bar
const DownloadProgressBar = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 300);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
      <div 
        className="bg-yellow-500 h-2.5 rounded-full transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      ></div>
      <p className="text-xs text-gray-400 mt-1">Downloading "The Matrix" - {progress}%</p>
    </div>
  );
};

// Price calculator slider
const PriceCalculator = () => {
  const [profiles, setProfiles] = useState(2);
  const basePrice = 4.99;
  const additionalProfilePrice = 2.50;
  
  const totalPrice = basePrice + (profiles - 1) * additionalProfilePrice;
  
  return (
    <div className="mt-4">
      <div className="flex justify-between mb-2">
        <span>Number of profiles: {profiles}</span>
        <span className="font-bold text-yellow-400">${totalPrice.toFixed(2)}/month</span>
      </div>
      <input
        type="range"
        min="1"
        max="5"
        value={profiles}
        onChange={(e) => setProfiles(parseInt(e.target.value))}
        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
      />
      <div className="flex justify-between text-xs text-gray-400 mt-1">
        <span>1 profile</span>
        <span>5 profiles</span>
      </div>
    </div>
  );
};

// API Demo Component
const ApiDemo = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const handleSearch = (value) => {
    setQuery(value);
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setResults(SAMPLE_MOVIES);
      setLoading(false);
    }, 800);
  };
  
  return (
    <div className="bg-black bg-opacity-70 p-6 rounded-xl border border-gray-800">
      <h3 className="text-xl font-bold mb-4">Try Our API</h3>
      <div className="relative">
        <input
          className="w-full bg-gray-800 text-white rounded-lg py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {loading ? (
            <div className="animate-spin h-5 w-5 border-2 border-yellow-500 border-t-transparent rounded-full"></div>
          ) : (
            <Search className="h-5 w-5 text-gray-400" />
          )}
        </div>
      </div>
      {results && <MovieGrid data={results} />}
    </div>
  );
};

// Testimonial component
const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="relative overflow-hidden h-64">
      <div 
        className="transition-transform duration-500 ease-in-out h-full flex" 
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {TESTIMONIALS.map((testimonial) => (
          <div key={testimonial.id} className="min-w-full px-4">
            <div className="bg-black bg-opacity-70 p-6 rounded-xl h-full border border-gray-800">
              <div className="flex items-center gap-2 mb-4">
                <div className=' w-12 h-12'>
                <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover rounded-full mr-4" />
                </div>

                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-yellow-400">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-300 italic">"{testimonial.quote}"</p>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {TESTIMONIALS.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${index === currentIndex ? 'bg-yellow-500' : 'bg-gray-600'}`}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

// Hero Carousel
const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % TRENDING_MOVIES.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="hero-carousel relative h-screen md:h-70vh lg:h-80vh">
      {TRENDING_MOVIES.map((movie, index) => (

        // <div key={movie.id}
        // className={` bg-gradient-to-t from-black/80 via-black/50 to-transparent h-[80vh] z-10 absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
        // <img 
        //     src={movie.backdrop}
        //     alt="Featured movie banner" 
        //     className="w-full h-full object-cover"
        //     loading="lazy"
        //     decoding="async"
        // />
        
        <div 
          key={movie.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          style={{
            height: '100%',
            width: '100%',
            backgroundImage: `url(${movie.backdrop})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
          }}
        > 
           <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/90"></div> 
        </div>
      ))}
      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
          YOUR GATEWAY TO<br/>
          <span className="text-yellow-400">UNLIMITED</span> ENTERTAINMENT
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-8">
          Stream, download, and discover content tailored just for you
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-full transition-all duration-300 flex items-center justify-center">
            Start Streaming <ChevronRight className="ml-2 h-5 w-5" />
          </button>
          <button className="border-2 border-white hover:bg-white hover:text-black font-bold py-3 px-8 rounded-full transition-all duration-300 flex items-center justify-center">
            View Plans <ChevronRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {TRENDING_MOVIES.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-yellow-500' : 'bg-gray-600'}`}
            onClick={() => setCurrentSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

// Main component
export default function MoviesModServices() {
  const [activeNow, setActiveNow] = useState(2845);
  
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly increase or decrease the active users count
      setActiveNow(prev => {
        const change = Math.floor(Math.random() * 10) - 5;
        return Math.max(2500, prev + change);
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <HeroCarousel />
      
      {/* Service Cards */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Explore Our Premium Services
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {/* Premium Streaming */}
          <ServiceCard
            title="Premium Streaming"
            description="Experience cinema-quality streaming with 4K HDR and Dolby Atmos sound. Enjoy the latest blockbusters and exclusive content."
            icon={<Play className="h-6 w-6 text-black" />}
            visual={<span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">4K</span>}
            interactive={
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-400">
                  <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                  {activeNow.toLocaleString()} watching now
                </span>
                <button className="bg-transparent border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black px-4 py-1 rounded-full text-sm transition-all duration-300">
                  Learn More
                </button>
              </div>
            }
          />
          
          {/* AI Recommendations */}
          <ServiceCard
            title="AI Recommendations"
            description="Our advanced machine learning algorithm analyzes your viewing habits to suggest content you'll love."
            icon={<Brain className="h-6 w-6 text-black" />}
            visual={<NeuralNetworkSVG />}
            interactive={
              <div className="grid grid-cols-4 gap-2 mt-2">
                {['Action', 'Comedy', 'Drama', 'Horror'].map((genre) => (
                  <button 
                    key={genre}
                    className="bg-gray-800 hover:bg-yellow-500 hover:text-black text-xs py-1 px-2 rounded-full transition-all duration-300"
                  >
                    {genre}
                  </button>
                ))}
              </div>
            }
          />
          
          {/* Offline Downloads */}
          <ServiceCard
            title="Offline Downloads"
            description="Download movies and shows to watch offline. Perfect for travel or areas with limited connectivity."
            icon={<Download className="h-6 w-6 text-black" />}
            visual={null}
            interactive={
              <div>
                <DownloadProgressBar />
                <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 rounded-lg transition-all duration-300 mt-7">
                  Try Demo
                </button>
              </div>
            }
          />
          
          {/* Family Plans */}
          <ServiceCard
            title="Family Plans"
            description="Share the experience with your loved ones. Create up to 5 profiles with personalized recommendations."
            icon={<Users className="h-6 w-6 text-black" />}
            visual={
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-2 border-gray-800"></div>
                ))}
              </div>
            }
            interactive={<PriceCalculator />}
          />
        </div>
      </section>
      
      {/* Technical Showcase */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Powerful API Integration
          </h2>
          <p className="text-center text-gray-300 max-w-2xl mx-auto mb-12">
            Integrate Movies Mod into your applications with our developer-friendly API. Access our vast database of movies and shows.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <ApiDemo />
            
            <div className="bg-black bg-opacity-70 p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-bold mb-4">API Features</h3>
              <ul className="space-y-4">
                {[
                  "Comprehensive movie and TV show database",
                  "Real-time streaming statistics",
                  "Personalized recommendations",
                  "Content filtering and parental controls"
                ].map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center mt-1 mr-3">
                      <span className="text-xs text-black font-bold">{index + 1}</span>
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-6 w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 rounded-lg transition-all duration-300">
                Access Developer Documentation
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Social Proof */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          What Our Users Say
        </h2>
        
        <TestimonialCarousel />
        
        <div className="mt-12 text-center">
          <div className="flex items-center justify-center mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="h-6 w-6 fill-yellow-500 text-yellow-500" />
            ))}
          </div>
          <p className="text-xl font-bold">4.9 out of 5 stars</p>
          <p className="text-gray-400">Based on 10,000+ reviews</p>
        </div>
      </section>
      
      {/* Call-to-Action */}
      <Bottom />
    </div>
  );
}