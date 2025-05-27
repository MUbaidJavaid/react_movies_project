import MovieWebsite from './pages/Home.jsx'
import AboutUs from './pages/About.jsx'
import  Contact, { contactData }  from './pages/Contact.jsx'
import MoviesModServices from "./pages/Services.jsx"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppLayout } from './components/AppLayout/index.jsx'
import { Movies } from './pages/Movies.jsx'
import { UseError } from './pages/useError.jsx'
import { getMoviesData } from './api/GetApiData.jsx'
import { MoviesDetails } from './components/UI/movie.jsx'
import { getMovieDetails } from './api/GetMovieDetail.jsx'
import SignUp, { signUpAction } from './components/UI/signup.jsx'
import SignIn, { signInAction } from './components/UI/signin.jsx'
import { ResponsiveMoviePage } from './pages/MoviesCustom.jsx'
// import { Loading } from './components/UI/loading.jsx'
function App() {

  const router = createBrowserRouter([

    {
      path: '/',
      element: <AppLayout />,
      loader: getMoviesData,
      errorElement: <UseError />,
      children: [

        {
          path: '/',
          element: <MovieWebsite />,
          loader: getMoviesData
        },
        {
          path: '/about',
          element: <AboutUs />
        },
        {
          path: '/contact', 
          element: <Contact />,
          action: contactData
        },
        {
          path: '/services', 
          element: <MoviesModServices />
        },
        {
          path: '/movies', 
          element: <Movies />,
          loader: getMoviesData
        },
        {
          path: '/movie/:movieId',
          element: <MoviesDetails />,
          loader: getMovieDetails
        },
        {
        path: '/moviepage', 
        element: <ResponsiveMoviePage />,
        loader: getMoviesData
      }
        
      ]

    },
    {
      path: '/signup', 
      element: <SignUp />,
      action: signUpAction
    },
    {
      path: '/login', 
      element: <SignIn />,
      action: signInAction
    }
  ])


  return ( <RouterProvider router={router} /> )
}

export default App
