import { NavLink } from "react-router-dom"


export const Bottom = () => {
    return (
                <div className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-90 py-4 border-t border-gray-800 z-50">
                    <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between">
                        <div className="text-center sm:text-left mb-4 sm:mb-0">
                            <h3 className="text-xl text-white font-bold">READY TO STREAM?</h3>
                            <p className="text-yellow-400">GET STARTED FOR $4.99/MONTH</p>
                        </div>
                        <div className="flex gap-4">
                        <NavLink to="/signup" > 
                                <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-full transition-all duration-300">
                                Sign Up
                                </button>
                            </NavLink>
                            <NavLink to="/login" > 
                                <button className="bg-transparent border border-white text-white hover:bg-white hover:text-black font-bold py-2 px-6 rounded-full transition-all duration-300">
                                Login
                                </button>
                            </NavLink>
                        </div>
                    </div>
            </div>

            )
        }
