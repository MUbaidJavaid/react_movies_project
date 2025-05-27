export const getMovieDetails = async ({ params }) => {
    console.log("params", params);
    const id  = params.movieId; // Destructure the id from params if needed

    const url = `https://www.omdbapi.com//?i=${id}&apikey=${import.meta.env.VITE_API_KEY}`;
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        console.log("data", data);
        return data;
    }
    catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Rethrow the error to be handled by the calling function
    }
}