import { Film, Search, Calendar, Star, Heart, X, Sun, Moon, PlayCircle, Filter, ChevronDown } from 'lucide-react';
import { useState } from 'react';
// import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';

const Header = ({darkMode ,setDarkMode , movies,navItems , searchTerm ,setSearchTerm ,watchlist ,setIsWatchlistOpen ,isFilterOpen ,setIsFilterOpen ,sortOption ,setSortOption}) => {
  // const [isOpen, setIsOpen] = useState(false);
  // const navRef = useRef(null);
  // const hamburgerRef = useRef(null);
  // const [darkMode, setDarkMode] = useState(true);
  //   const [searchTerm, setSearchTerm] = useState('');
  // // Enhanced click handler for mobile menu
  // useEffect(() => {
  //   const handleClick = (event) => {
  //     const isHamburger = hamburgerRef.current && hamburgerRef.current.contains(event.target);
  //     const isNavLink = event.target.closest('a[href]');
  //     const isOutside = navRef.current && !navRef.current.contains(event.target);

  //     // Close menu when:
  //     // 1. Clicking outside the navigation
  //     // 2. Clicking the hamburger when menu is open
  //     // 3. Clicking any nav link
  //     if ((isOutside && !isHamburger) || (isOpen && isHamburger) ) {
  //       setIsOpen(false);
  //     }
      
  //     // Only toggle if clicking hamburger and menu was closed
  //     if (isHamburger && !isOpen && !isNavLink) {
  //       setIsOpen(true);
  //     }
  //   };

  //   // Use mousedown instead of click for faster response
  //   document.addEventListener('mousedown', handleClick);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClick);
  //   };
  // }, [isOpen]);

  // // Close menu when resizing to desktop
  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth >= 1024) {
  //       setIsOpen(false);
  //     }
  //   };

  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);



  // const toggleDarkMode = () => {
  //   setIsDarkMode(!isDarkMode);
  // };
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
          <>
            <header className={`sticky top-0 z-10 px-4 py-3 shadow-md ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Film size={24} className={darkMode ? 'text-yellow-500' : 'text-yellow-600'} />
                <h1 className="text-lg sm:text-xl font-bold">MovieFlix</h1>
              </div>
              <nav className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                        <NavLink
                        key={item.path}
                        to={item.path}
                        className={`font-medium ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}
                        >
                        {item.name}
                      </NavLink>
                    ))}
              </nav>

              <div className="flex items-center space-x-4">
                {/* Search bar */}
                <div className={`relative hidden sm:block ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
                  <input
                    type="text"
                    placeholder="Search movies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-40 md:w-64 pl-8 pr-4 py-1 rounded-md text-sm focus:outline-none ${
                      darkMode ? 'bg-gray-700 focus:bg-gray-600' : 'bg-gray-200 focus:bg-gray-100'
                    }`}
                    aria-label="Search movies"
                  />
                  <Search size={16} className="absolute left-2 top-1/2 -translate-y-1/4" />
                </div>

                {/* Watchlist button */}
                <button 
                  onClick={() => setIsWatchlistOpen(true)}
                  className="relative p-2 rounded-full hover:bg-gray-700/50"
                  aria-label="Open watchlist"
                >
                  <Heart size={20} className={darkMode ? 'text-gray-100' : 'text-gray-900'} />
                  {watchlist.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-yellow-500 text-gray-900 text-xs w-4 h-4 rounded-full flex items-center justify-center">
                      {watchlist.length}
                    </span>
                  )}
                </button>
                
                {/* Dark mode toggle */}
                <button 
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-full hover:bg-gray-700/50"
                  aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {darkMode ? (
                    <Sun size={20} className="text-gray-100" />
                  ) : (
                    <Moon size={20} className="text-gray-900" />
                  )}
                </button>
              </div>
            </div>
          </header>

        <div className={`sm:hidden px-4 py-2 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="relative">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-8 pr-4 py-2 rounded-md text-sm focus:outline-none ${
                darkMode ? 'bg-gray-700 focus:bg-gray-600' : 'bg-gray-200 focus:bg-gray-100'
              } ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}
              aria-label="Search movies"
            />
            <Search size={16} className={`absolute left-2 top-1/2  transform -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          </div>
        </div>

        {/* Filter and sort controls */}
        <div className={`px-4 py-3 ${darkMode ? 'bg-gray-800/60' : 'bg-white/60'} backdrop-blur-sm sticky top-14 sm:top-16 z-10`}>
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm ${
                  darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-100' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                }`}
                aria-expanded={isFilterOpen}
                aria-controls="filter-dropdown"
              >
                <Filter size={14} />
                <span>Filters</span>
                <ChevronDown size={14} className={`transition-transform ${isFilterOpen ? 'rotate-180' : 'rotate-0'}`} />
              </button>
              
              {isFilterOpen && (
                <div 
                  id="filter-dropdown"
                  className={`absolute mt-2 p-3 rounded-md shadow-lg z-20 left-4 right-4 sm:left-auto sm:right-auto sm:w-64 ${
                    darkMode ? 'bg-gray-700' : 'bg-white'
                  }`}
                >
                  <div className="mb-3">
                    <label className="block text-sm font-medium mb-1">Sort by</label>
                    <select
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                      className={`w-full p-2 rounded text-sm ${
                        darkMode ? 'bg-gray-600 text-gray-100' : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <option value="popularity">Popularity</option>
                      <option value="year-desc">Newest first</option>
                      <option value="year-asc">Oldest first</option>
                      <option value="rating">Rating</option>
                      <option value="title">Title A-Z</option>
                    </select>
                  </div>
                  {/* Additional filters would go here */}
                          </div>
                          )}
                        </div>
                        
                        <div className="text-sm">
                          <span>Showing {movies.length} movies</span>
                        </div>
                        </div>
                 </div>

                      {/* Mobile menu toggle button */}
                      <div className="md:hidden flex justify-end px-4 py-2">
                        <button
                        onClick={() => setIsMenuOpen?.(prev => !prev)}
                        className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-200 text-gray-900'}`}
                        aria-label="Toggle navigation"
                        >
                        <ChevronDown size={22} className={`${isMenuOpen ? 'rotate-180' : ''} transition-transform`} />
                        </button>
                      </div>

                      {/* Mobile nav menu */}
                      {isMenuOpen && (
                        <nav className="md:hidden flex flex-col items-center space-y-2 pb-4">
                        {navItems.map((item) => (
                          <NavLink
                          key={item.path}
                          to={item.path}
                          className={`font-medium w-full text-center py-2 rounded ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}
                          onClick={() => setIsMenuOpen?.(false)}
                          >
                          {item.name}
                          </NavLink>
                        ))}
                        </nav>
                      )}
</>
  //   <div className={` ${isDarkMode ? 'bg-black' : 'bg-gray-100'}`}>
  //   {/* Header */}
  //   <header className={`py-4 px-6 flex justify-between items-center ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
  //     <div className="flex items-center">
  //       <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-yellow-500' : 'text-gray-900'}`}>
  //         MovieFlix
  //       </h1>
  //     </div>
  //     <nav className="hidden md:flex items-center space-x-6">
  //       {/* <a href="#" className={`font-medium ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'}`}>Home</a>
  //       <a href="#" className={`font-medium ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'}`}>Movies</a>
  //       <a href="#" className={`font-medium ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'}`}>TV Shows</a>
  //       <a href="#" className={`font-medium ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'}`}>Watchlist</a> */}
  //       {navItems.map((item) => (
  //         <NavLink
  //           key={item.path}
  //           to={item.path}
  //           className={`font-medium ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'}`}
  //         >
  //         {item.name}
  //         </NavLink>
  //       ))}
  //     </nav>
  //     <button 
  //       onClick={toggleDarkMode} 
  //       className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
  //       aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
  //     >
  //       {isDarkMode ? <Sun className="text-yellow-500" /> : <Moon className="text-gray-700" />}
  //     </button>
  //   </header>
  //  </div>

    // <header className="bg-gray-800 text-white sticky top-0 z-50 shadow-md">
    //   <div className="container mx-auto flex justify-between items-center p-4">
    //     <h1 className="text-lg font-bold">Get Your Movies Here</h1>
        
    //     {/* Desktop Auth Buttons */}
    //     <div className="hidden lg:flex gap-4">
    //       <NavLink to='/login'>
    //           <button className="hover:text-blue-400 transition-colors">Sign In</button>
    //       </NavLink>
          
    //       <NavLink to="/signup" >
    //          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded">Sign Up</button>
    //       </NavLink>
          
    //     </div>
        
    //     {/* Mobile Hamburger with ref */}
    //     <button 
    //       ref={hamburgerRef}
    //       className="lg:hidden p-2 focus:outline-none"
    //       aria-expanded={isOpen}
    //       aria-label="Toggle navigation"
    //     >
    //       <div className={`w-6 flex flex-col gap-1 transition-all duration-300 ${isOpen ? 'transform rotate-90' : ''}`}>
    //         <span className={`h-0.5 bg-white transition-all duration-300 ${isOpen ? 'w-6 rotate-45 translate-y-1.5' : 'w-6'}`}></span>
    //         <span className={`h-0.5 bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : 'w-6'}`}></span>
    //         <span className={`h-0.5 bg-white transition-all duration-300 ${isOpen ? 'w-6 -rotate-45 -translate-y-1.5' : 'w-6'}`}></span>
    //       </div>
    //     </button>
    //   </div>

    //   {/* Navigation Menu with ref */}
    //   <div 
    //     ref={navRef}
    //     className={`
    //       lg:flex lg:items-center lg:bg-white lg:text-gray-800
    //       ${isOpen ? 'block' : 'hidden'}
    //       transition-all duration-300 ease-in-out
    //       overflow-hidden
    //       max-h-0 lg:max-h-full
    //       ${isOpen ? 'max-h-screen' : ''}
    //     `}
    //   >
    //     <nav className="container mx-auto lg:flex lg:justify-between">
    //       <h2 className="p-4 font-bold hidden lg:block">Movies Mod</h2>
    //       <ul className="flex flex-col lg:flex-row lg:gap-6 lg:items-center bg-white text-gray-800 divide-y lg:divide-y-0 divide-gray-200">
    //         {navItems.map((item) => (
    //           <li key={item.path} className="border-b lg:border-0">
    //             <NavLink
    //               to={item.path}
    //               className={({ isActive }) => `
    //                 block p-4 transition-colors duration-200 hover:bg-gray-100 lg:hover:bg-transparent
    //                 ${isActive ? 'text-blue-500 font-medium lg:border-b-2 lg:border-blue-500' : 'text-gray-800'}
    //               `}
    //             >
    //               {item.name}
    //             </NavLink>
    //           </li>
    //         ))}
    //       </ul>
    //     </nav>
    //   </div>
    // </header>
  );
};

export default Header;