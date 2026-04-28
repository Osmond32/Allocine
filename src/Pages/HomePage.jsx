
import { Container, Modal } from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';
import MoviesService from "../Services/MoviesService";
import { useEffect, useState } from "react";
import MoviesCarousel from "../Components/MoviesCarousel";


const HomePage = () => {
    const [movies, setMovies] = useState([])
    const [moviesUpComing, setMoviesUpComing] = useState([]);
    const [moviesTopRated, setMoviesTopRated] = useState([]);
    const [showTrailer, setShowTrailer] = useState(false);

    const fetchMoviesPlaying = async () => {
        try {
            const response = await MoviesService.getMoviesPlaying();
            setMovies(response.data.results)
        } catch (error) {
            console.error(error);
        }
    }
    const fetchMoviesUpComing = async () => {
        try {
            const response = await MoviesService.getMoviesUpComing();
            setMoviesUpComing(response.data.results);
        } catch (error) {
            console.error(error)
        }
    }
    const fetchMoviesTopRat = async () => {
        try {
            const response = await MoviesService.getMoviesTopRated();
            setMoviesTopRated(response.data.results);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchMoviesPlaying();
        fetchMoviesUpComing();
        fetchMoviesTopRat();
    }, [])

    return <>
        {/* HERO CAROUSEL CON IMMAGINI SUGGESTIVE */}
        <Carousel className="w-100 mb-4" fade>
            {movies.slice(0, 5).map(movie => (
                <Carousel.Item key={movie.id}>
                    <img
                        className="d-block w-100"
                        src={"https://image.tmdb.org/t/p/original" + movie.backdrop_path}
                        alt={movie.title}
                        style={{ height: '60vh', objectFit: 'cover', objectPosition: 'top' }}
                    />
                            <Carousel.Caption className="bg-dark bg-opacity-75 text-white rounded p-3 d-none d-md-block">
                        <h3>{movie.title}</h3>
                        <p>{movie.overview}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>

        {/* MODAL TRAILER */}
        <Modal show={showTrailer} onHide={() => setShowTrailer(false)} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Trailer AlloCiné</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex justify-content-center">
                {/* Placeholder video, puoi sostituire con un vero trailer */}
                <iframe width="560" height="315" src="https://www.youtube.com/embed/6NUZK8G_mgE" title="Trailer" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
            </Modal.Body>
        </Modal> 

        <Container fluid className="d-flex flex-column pt-3 gap-4 mb-5 px-2 px-md-5 overflow-hidden">
            {/* CAROUSEL FILM */}
            <MoviesCarousel title={"Film à l'affiche"} movies={movies} />
            <MoviesCarousel title={"Film à venir"} movies={moviesUpComing} />
      
        </Container>
    </>;
}

export default HomePage;