import { useState } from "react";
import { NavLink } from "react-router-dom";

export const Footer = ({darkMode}) => {

    //   const [isDarkMode, setIsDarkMode] = useState(true);

    //   const toggleDarkMode = () => {
    //     setIsDarkMode(!isDarkMode);
    //   };

    return (

              <footer className={`py-8 mb-20 px-6 ${darkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                        <h2 className={`text-xl font-bold ${darkMode ? 'text-yellow-500' : 'text-gray-900'}`}>MovieFlix</h2>
                        <p className="text-sm mt-1">© 2025 MovieFlix. All rights reserved.</p>
                        </div>
                        <div className="flex space-x-6">
                        <a href="#" className="hover:text-yellow-500">Terms</a>
                        <a href="#" className="hover:text-yellow-500">Privacy</a>
                        <a href="#" className="hover:text-yellow-500">Help</a>
                        <NavLink to="/contact" className="hover:text-yellow-500">Contact</NavLink>
                        </div>
                    </div>
                </footer>
//         <footer className="bg-gray-900 text-white p-4 text-center">
//             <div className="flex flex-col gap-10 lg:gap-0 lg:flex-row justify-around my-4 p-7">

//                 <div  className="flex lg:w-[40%] w-[100%] flex-col text-start  ">
//                     <h1 className="text-white mt-2 text-lg">Follow Us</h1>
//                     <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400 mx-2">
//                         <i className="fab fa-facebook-f"></i>
//                     </a>
//                     <p className="mt-5 text-sm">Welcome to Movies Pro My Website and enjoy exclusive content ! </p>
//                     <p className="mt-1 text-sm"> Stay connected with us for the latest updates !</p>
//                 </div>
//                 <div className="flex flex-row  lg:w-[28%] w-[100%] justify-between lg:justify-center gap-7 mb-4">
//                     <div className="flex flex-col justify-center text-start gap-4">
//                         <h1 className="text-white text-md  mt-2">SHOPPING</h1>
//                         <p className="text-white text-sm hover:text-gray-400 mx-2">Computer Store</p>
//                         <p className="text-white text-sm hover:text-gray-400 mx-2">Laptop Store</p>
//                         <p className="text-white text-sm hover:text-gray-400 mx-2">Accessories</p>
//                         <p className="text-white text-sm hover:text-gray-400 mx-2">Sales & Discount </p>

//                     </div>
//                     <div className="flex flex-col justify-center text-start gap-4">
//                         <h1 className="text-white text-lg mt-2">Experience</h1>
//                         <p className="text-white text-sm hover:text-gray-400 mx-2">Contact us</p>
//                         <p className="text-white text-sm hover:text-gray-400 mx-2">Payment Mehtod</p>
//                         <p className="text-white text-sm hover:text-gray-400 mx-2">Delivary</p>
//                         <p className="text-white text-sm hover:text-gray-400 mx-2">Return & Exchang</p>
//                     </div>
//                 </div>
//                 <div className="flex flex-col text-start lg:w-[28%] w-[100%] mt-2 gap-5">
//                     <h1 className="text-white text-md">NEWLETTER</h1>
//                     <p className="text-white text-sm">Be the first to know about new arrivals, sales & promos!</p>
//                     <form className="flex flex-row justify-start "> 
//                         <input type="email" placeholder="Enter your email" className="p-2 text-xs lg:text-sm border rounded-l-md" />
//                         <button type="submit" className="bg-blue-500 text-xs lg:text-sm mx-1.5 text-white p-1 rounded-r-md">Subscribe</button>
//                     </form>
//                 </div>
//             </div>
//  <hr />
//             <div className="flex justify-center gap-3.5 text-center mt-4">
//                 <p className="text-gray-600 text-sm">&copy; 2025 Movies Pro. All rights reserved. | | </p>
//                 <p className="text-gray-600 text-sm  cursor-pointer">Privacy Policy | Terms of Service</p>
//             </div>
//         </footer>
    )
}