import { NavLink, useNavigate, useRouteError } from "react-router-dom"



export const UseError = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        // navigate("/")
        navigate(-1);
        // window.history.back()
    };


const error = useRouteError();
// console.log(error);
if (error.status === 404) {
    return (
        <div className="flex flex-col items-center text-gray-800 w-lvw  justify-center h-screen">
             <figure>
                <img src="/src/assets/404.gif" alt="Error 404" className="w-full h-full object-cover" />
                
             </figure>
                <h1 className="text-lg text-gray-700 mx-5 lg:mx-0 text-center ">The Page you were looking for could not be Found.</h1>
              <div className="flex flex-row  mt-4 gap-4">   
                    <button className=" p-4 rounded-md text-white  bg-gray-800 w-auto " onClick={handleClick}>
                        Go Back
                    </button>
                    <NavLink  className="nav-link  " to="/"> 
                            <div className="p-4 rounded-md text-white  bg-gray-800 w-auto ">
                            Back to Home 
                            </div>
                    </NavLink>

             </div>
        </div>
    )
}
}