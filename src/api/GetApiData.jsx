
export const getMoviesData = async () => {
    const url = `https://www.omdbapi.com//?i=tt3896198&apikey=${import.meta.env.VITE_API_KEY}&s=titanic&&page=1&plot=full`;
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        return data;
    }
    catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Rethrow the error to be handled by the calling function
    }
}