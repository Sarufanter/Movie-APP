import MovieCard from "../components/MovieCard"
import { useState, useEffect } from "react";
import {searchMovies, getPopularMovies} from "../services/api"
import "../css/Home.css"
import { use } from "react";

function Home(){
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadPopularMovies = async () =>{
            try {
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)
            } catch(err){
                console.log(err)
                setError("Failed to load movies...")
            }
            finally{
                setLoading(false)
            }
        } 

        loadPopularMovies()
    }, [])

    const handleSearch = async (e)=>{
        e.preventDefault();
        if(!searchQuery.trim()) return
        if(loading) return

        setLoading(true)
        try{
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null)
        } catch(err){
            setError("Failed to search movies...")
        } finally{
            setLoading(false)
        }
    };

    return <div className="Home">
        <form onSubmit={handleSearch} className="search-form">
            <input 
            type="text" 
            className="search-input" 
            placeholder="Search for movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">Search</button>
        </form>

        {error && <div className="error-mesage">{error}</div>}

        {loading ? (<div className="loading">Loading...</div>
        ) : (  
        <div className="movies-grid">
            {movies.map(movie =>
                 (
                 <MovieCard movie={movie} key = {movie.id} />
                ))}
        </div>
        )}
       
    </div>
}

export default Home
