import { useParams } from "react-router-dom";
import MoviesService from "../Services/MoviesService";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import MovieCard from "../Components/MovieCard";
import Paginations from "../Components/Paginations";

const GenrePage = () => {
    const { id } = useParams();
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPages, setMaxPages] = useState(500)

    const fetchMovieByGenre = async () => {
        try {
            const response = await MoviesService.getMoviesByGenre(id,currentPage);
            setMovies(response.data.results);
            setMaxPages(response.data.total_pages);
        } catch (error) {
            console.error
        }
    }

    useEffect(() => {
        fetchMovieByGenre()
    }, [id, currentPage])


    return <>
        <Container className="d-flex flex-column align-items-cener gap-3">
            <div className="d-flex flex-wrap justify-content-center gap-3">
                {movies.map((movie) => {
                    return <MovieCard key={movie.id} movie={movie}></MovieCard>
                })}

            </div>

            <Paginations currentPage={currentPage} setCurrentPage={setCurrentPage} maxPages={maxPages}></Paginations>

        </Container>



    </>;
}

export default GenrePage;