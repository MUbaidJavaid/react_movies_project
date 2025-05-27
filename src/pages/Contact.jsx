import { 
    EnvelopeIcon, 
    PhoneIcon, 
    MapPinIcon 
  } from '@heroicons/react/24/outline';
  import { 
    FaFacebook as FacebookIcon,
    FaTwitter as TwitterIcon,
    FaInstagram as InstagramIcon,
    FaLinkedin as LinkedinIcon
  } from 'react-icons/fa';
import { Form, useNavigation } from 'react-router-dom';
import { Bottom } from '../components/UI/bottum';


  export const contactData = async ({ request }) => {
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




const Contact = () => {
   const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Overlay */}
      <section className="relative mx-4 lg:h-[60vh] overflow-hidden rounded-b-lg shadow-lg">
        <img
          src="/contact0.jpg"
          alt="Contact Us"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
          <div className="backdrop-blur-sm bg-white/10 p-8 rounded-xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
            <p className="text-xl md:text-2xl text-white/90">We'd love to hear from you!</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a message</h2>
            <Form method='POST' action='/contact' className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 border border-gray-300  rounded-lg  focus:outline-gray-600  transition-all"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium  text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-gray-600  transition-all"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-gray-600 transition-all"
                  placeholder="Your message..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 hover:scale-[1.02] shadow-md
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
                  'Send Message'
                )}
                
              </button>
            </Form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>
              
              <div className="space-y-5">
                <ContactInfoCard
                  icon={<EnvelopeIcon className="h-6 w-6 text-blue-600" />}
                  title="Email"
                  content="contact@example.com"
                  link="mailto:contact@example.com"
                />

                <ContactInfoCard
                  icon={<PhoneIcon className="h-6 w-6 text-blue-600" />}
                  title="Phone"
                  content="+1 234 567 890"
                  link="tel:+1234567890"
                />

                <ContactInfoCard
                  icon={<MapPinIcon className="h-6 w-6 text-blue-600" />}
                  title="Address"
                  content="123 Movie St, Film City, CA 90210"
                  link="https://maps.google.com"
                />
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Follow Us</h2>
              <div className="flex justify-center sm:justify-start gap-4">
                <SocialIcon 
                  href="https://facebook.com" 
                  icon={<FacebookIcon className="h-6 w-6" />}
                  label="Facebook"
                />
                <SocialIcon 
                  href="https://twitter.com" 
                  icon={<TwitterIcon className="h-6 w-6" />}
                  label="Twitter"
                />
                <SocialIcon 
                  href="https://instagram.com" 
                  icon={<InstagramIcon className="h-6 w-6" />}
                  label="Instagram"
                />
                <SocialIcon 
                  href="https://linkedin.com" 
                  icon={<LinkedinIcon className="h-6 w-6" />}
                  label="LinkedIn"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Bottom />
    </div>
   
  );
   
};

// Reusable Contact Info Card Component
const ContactInfoCard = ({ icon, title, content, link }) => (
  <a href={link} className="group block">
    <div className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
      <div className="p-2 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors duration-200">
        {icon}
      </div>
      <div>
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-gray-600 group-hover:text-blue-600 transition-colors duration-200">
          {content}
        </p>
      </div>
    </div>
  </a>
);

// Reusable Social Icon Component
const SocialIcon = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-3 bg-gray-50 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 hover:scale-110"
    aria-label={label}
  >
    {icon}
  </a>
);

export default Contact;