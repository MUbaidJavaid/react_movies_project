import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Bottom } from '../components/UI/bottum';

// Sample team data
const teamMembers = [
  {
    name: "Sarah Chen",
    role: "Founder & CEO",
    bio: "Former Netflix executive with a passion for connecting audiences with stories that matter.",
    image: "/teamMember0.jpg"
  },
  {
    name: "Marcus Johnson",
    role: "Chief Technology Officer",
    bio: "Ex-Google engineer who believes in building technology that enhances the movie experience, not distracts from it.",
    image: "/teamMember1.jpg"
  },
  {
    name: "Priya Sharma",
    role: "Head of Content",
    bio: "Film critic turned curator with an encyclopedic knowledge of cinema from around the world.",
    image: "/teamMember2.jpg"
  },
  {
    name: "CINE.AI",
    role: "Recommendation Engine",
    bio: "Our proprietary AI that analyzes viewing patterns and critic reviews to suggest your next favorite film.",
    image: "/teamMember3.jpg"
  }
];

// Sample testimonials
const testimonials = [
  { quote: "Movies Mod transformed how I discover films. It's like having a film critic in my pocket.", author: "James Rivera, Film Enthusiast" },
  { quote: "Best platform since Netflix. Their curation is unmatched in the industry.", author: "Lisa Wong, User since 2022" },
  { quote: "As a filmmaker, I appreciate how Movies Mod brings attention to independent cinema.", author: "David Chen, Independent Director" }
];

// Tech stack with logos
const techStack = [
  { name: "React", logo: "/react_logo.png" },
  { name: "JavaScript", logo: "/js_logo.png" },
  { name: "Tailwind CSS", logo: "/tailwindCss_logo.webp" },
  { name: "HTML", logo: "/html_logo.png" }
];

// Stats for the mission section
const stats = [
  { value: "10M+", label: "Movies Curated" },
  { value: "3.2M", label: "Active Users" },
  { value: "180+", label: "Countries Reached" }
];

// Sample movie posters (replace with your actual image paths)
const samplePosters = [
  "/bg0.jpg",
  "/bg1.jpg",
  "/bg2.jpeg",
  "/bg3.jpg",
  "/bg2.jpeg",
  "/bg2.jpeg",
  "/bg2.jpeg",
  "/bg2.jpeg",
];

const AboutUs = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [posters, setPosters] = useState(samplePosters);

  // Fetch movie data with standard fetch API instead of SWR
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Using a try/catch to handle potential API key issues
        // You can uncomment this when you have your API key
        
        const apiKey = import.meta.env.VITE_API_KEY || 'fallback_key';
        const response = await fetch(`https://www.omdbapi.com//?i=tt3896198&apikey=${import.meta.env.VITE_API_KEY}&s=titanic&&page=1&plot=full`);
        const data = await response.json();
        
        if (data.Search) {
          const moviePosters = data.Search
            .filter(movie => movie.Poster !== "N/A")
            .map(movie => movie.Poster)
            .slice(0, 8);
          setPosters(moviePosters);
        }
        else {
            console.error("No movies found or invalid API key.");
            }
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchMovies();
  }, []);

  // Testimonial rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-[#0F0F0F] text-white font-sans overflow-x-hidden">
      {/* Hero Section with Dynamic Movie Collage */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Floating Movie Posters Background */}
        <div className="absolute inset-0 z-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 opacity-40">
            {posters.map((poster, index) => (
              <div 
                key={index} 
                className="transform hover:scale-110 transition-all duration-500 ease-in-out"
                style={{ 
                  animation: `float ${3 + index % 2}s ease-in-out infinite alternate`,
                  animationDelay: `${index * 0.2}s`
                }}
              >
                <img src={poster} alt="Movie Poster" className="rounded-lg shadow-2xl" />
              </div>
            ))}
          </div>
        </div>
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10"></div>
        
        {/* Hero Content */}
        <div className="container mx-auto px-4 z-20 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-wider">
            WE <span className="text-yellow-400">LIVE</span> FOR THE STORIES
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8 text-gray-300">
            Curating cinematic excellence since 2021, bringing the magic of movies to passionate fans worldwide.
          </p>
          <NavLink to="/movies" >
            <button className="bg-yellow-500 hover:bg-yellow-600 px-6 py-3 rounded-full font-bold text-black transition-all duration-300 transform hover:scale-105">
              DISCOVER OUR STORY
            </button>
          </NavLink>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Our Mission Section */}
      <section id="mission" className={`py-16 md:py-24 bg-black ${isVisible.mission ? 'animate-fadeIn' : 'opacity-0'}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            {/* Mission Text */}
            <div className="w-full md:w-1/2 mb-10 md:mb-0 md:pr-12">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center  mr-4 shadow-lg">
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">OUR MISSION</h2>
              </div>
              <p className="text-lg text-gray-300 mb-8">
                Movies Mod was born from a simple belief: everyone deserves access to great cinema. In a world overwhelmed by content, we curate the exceptional, highlighting films that move, challenge, and inspire. Our platform combines human expertise with cutting-edge technology to create a personalized journey through the world of film.
              </p>
              <p className="text-lg text-gray-300 mb-8">
                Whether you're a casual viewer or a dedicated cinephile, we're here to ensure you never waste time on mediocre content again. We believe in the power of stories to connect, educate, and transform – and we're on a mission to bring those stories to you.
              </p>
            </div>
            
            {/* Stats */}
            <div className="w-full md:w-1/2 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="bg-gray-900 p-6 rounded-xl text-center transform hover:scale-105 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className={`py-16 md:py-24 bg-gradient-to-b from-black to-gray-900 ${isVisible.team ? 'animate-fadeIn' : 'opacity-0'}`}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">MEET THE VISIONARIES</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="group relative perspective">
                <div className={`relative h-80 w-full rounded-xl overflow-hidden transform-style-3d transition-all duration-700 ${isVisible.team ? '' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: `${index * 0.3}s` }}>
                  {/* Front Side */}
                  <div className="absolute inset-0 backface-hidden group-hover:rotate-y-180 transition-all duration-700">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex flex-col justify-end p-6">
                      <h3 className="text-xl font-bold">{member.name}</h3>
                      <p className="text-yellow-400">{member.role}</p>
                    </div>
                  </div>
                  
                  {/* Back Side */}
                  <div className="absolute inset-0 bg-yellow-500 text-black p-6 flex flex-col justify-center backface-hidden rotate-y-180 group-hover:rotate-y-0 transition-all duration-700">
                    <h3 className="text-xl font-bold mb-3">{member.name}</h3>
                    <p className="text-sm">{member.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="tech" className={`py-16 md:py-24 bg-gray-900 ${isVisible.tech ? 'animate-fadeIn' : 'opacity-0'}`}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">POWERED BY INNOVATION</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {techStack.map((tech, index) => (
              <div 
                key={index} 
                className="group flex flex-col items-center transition-all duration-300 transform hover:scale-110"
                title={tech.name}
              >
                <div className="bg-gray-800 p-4 rounded-full mb-4 group-hover:bg-yellow-500 transition-colors duration-300">
                  <img src={tech.logo} alt={tech.name} className="w-16 h-16 object-contain" />
                </div>
                <p className="text-center font-medium">{tech.name}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
          <a href="https://rapidapi.com/rapihub-rapihub-default/api/imdb-top-100-movies/playground/apiendpoint_eeba8ca8-b70c-417e-8c7c-590bb0359480" target="_blank" rel="noopener noreferrer">  
            <button className="bg-yellow-500 hover:bg-yellow-600 px-6 py-3 rounded-full font-bold text-black animate-pulse transition-all duration-300 transform hover:scale-105">
              EXPLORE OUR API
            </button>
          </a>
            <p className="mt-4 text-gray-400 text-sm">Integrate movie data into your applications</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className={`py-16 md:py-24 bg-black ${isVisible.testimonials ? 'animate-fadeIn' : 'opacity-0'}`}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">WHAT CINEPHILES SAY</h2>
          
          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-900 rounded-xl p-8 md:p-12 relative ">
              
              {/* Testimonial Content */}
              <div className="min-h-32">
                {testimonials.map((item, index) => (
                  <div 
                    key={index} 
                    className={`transition-opacity  duration-2000 ${currentTestimonial === index ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}
                  >
                    <p className="text-xl md:text-2xl italic mt-10">"{item.quote}"</p>
                    <p className="text-yellow-400 font-medium">{item.author}</p>
                  </div>
                ))}
              </div>
              
              {/* Navigation Dots */}
              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, index) => (
                  <button 
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${currentTestimonial === index ? 'bg-yellow-500 w-6' : 'bg-gray-700'}`}
                    onClick={() => setCurrentTestimonial(index)}
                    aria-label={`View testimonial ${index + 1}`}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-t from-black to-gray-900 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">JOIN THE <span className="text-yellow-400">REVOLUTION</span></h2>
          <p className="text-xl max-w-2xl mx-auto mb-8 text-gray-300">
            Be part of the movement that's redefining how people discover and experience cinema.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-yellow-500 hover:bg-yellow-600 px-8 py-4 rounded-full font-bold text-black transition-all duration-300 transform hover:scale-105">
              GET STARTED
            </button>
            <button className="bg-transparent border-2 border-white hover:border-yellow-400 hover:text-yellow-400 px-8 py-4 rounded-full font-bold transition-all duration-300">
              LEARN MORE
            </button>
          </div>
        </div>
      </section>
     <Bottom />

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          100% { transform: translateY(-20px) rotate(3deg); }
        }
        
        .perspective {
          perspective: 1000px;
        }
        
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default AboutUs;