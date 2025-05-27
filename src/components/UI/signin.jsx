import { Form, NavLink, useNavigation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const signInAction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    
    // Here you would typically send data to your backend
    console.log("Form data:", data);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return { success: true, message: 'Sign up successful!' };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, message: 'Sign up failed. Please try again.' };
  }
};

const SignIn = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative h-[100vh]">
        {/* Background Image */}
        <img
          src="/login2.jpg"
          alt="Sign Up Background"
          className="w-full h-full object-cover"
          loading="eager"
        />
        
        {/* Back Arrow */}
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-white hover:text-gray-300 transition-colors z-10"
          aria-label="Go back"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Form Container */}
        <div className={`
          absolute inset-0 bg-black/40 flex flex-col items-center justify-center
          px-4 py-8
        `}>
          <div className={`
            backdrop-blur-sm bg-white/10
            rounded-xl transition-all duration-300
            w-[90vw] p-4
            sm:w-[80vw] sm:p-6
            md:w-[70vw]
            lg:w-[30vw] lg:px-8 
            hover:shadow-2xl hover:shadow-white
          `}>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 text-center">
              LOGIN
            </h1>
            
            <Form method="POST" className="space-y-4 md:space-y-6">

              {/* Username Field */}
              <div>
                <label htmlFor="username" className="block text-base lg:text-lg text-start font-medium text-white mb-2 ">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className={`
                    w-full px-4 py-3 border border-white rounded-lg
                     text-white placeholder-gray-300
                    focus:outline-none focus:ring-2 focus:ring-blue-400
                    hover:shadow-xl transition-all duration-200
                  `}
                  placeholder="Choose a username"
                  required
                />
              </div>


              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-base lg:text-lg text-start font-medium text-white mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className={`
                    w-full px-4 py-3  border border-white rounded-lg
                  text-white placeholder-gray-300
                    focus:outline-none focus:ring-2 focus:ring-blue-400
                    hover:shadow-xl transition-all duration-200
                  `}
                  placeholder="••••••••"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`
                  w-full bg-white text-gray-800 font-bold py-3  px-4 rounded-lg
                  transition-all duration-300 hover:scale-[1.02] shadow-md
                  hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400
                  ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}
                `}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Login'
                )}
              </button>
            </Form>
            <NavLink 
             to="/signup"
             className=" text-white text-xs mt-1 font-light px-4 py-1.5 rounded">
             Don't! have an account?
             <span className='text-gray-800 font-bold'>Sign Up</span> 
          </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignIn;