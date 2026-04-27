
import { Container, Button, Modal } from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';
import MoviesService from "../Services/MoviesService";
import { useEffect, useState } from "react";
import MoviesCarousel from "../Components/MoviesCarousel";
import { FaStar, FaRegStar, FaStarHalfAlt, FaFilm, FaTicketAlt } from 'react-icons/fa';


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

    // Funzione per stelle animate (Top Rated)
    const renderStars = (vote) => {
        const stars = [];
        let rating = Math.round(vote) / 2;
        for (let i = 1; i <= 5; i++) {
            if (rating >= i) stars.push(<FaStar key={i} color="#e6c200" className="star-anim" />);
            else if (rating > i - 1) stars.push(<FaStarHalfAlt key={i} color="#e6c200" className="star-anim" />);
            else stars.push(<FaRegStar key={i} color="#e6c200" className="star-anim" />);
        }
        return stars;
    };

    return <>
        {/* HERO SECTION */}
        <div className="hero-cinema d-flex flex-column align-items-center justify-content-center text-center mb-4">
            <h1 className="display-4 mb-3">Bienvenue au Cinéma</h1>
            <div className="hero-marquee w-100">
                <marquee behavior="scroll" direction="left" scrollamount="7">
                    🍿 Novità: Scopri i film più attesi e le stelle del cinema! 🍿
                </marquee>
            </div>
        </div>

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

        <Container fluid className="d-flex flex-column align-items-center pt-3">
            {/* CAROUSEL FILM */}
            <MoviesCarousel title={"Film à l'affiche"} movies={movies} />
            <MoviesCarousel title={"Film à venir"} movies={moviesUpComing} />

            {/* TOP RATED con stelle animate */}
            <div className="top-rated-section w-100 mt-5 mb-4">
                <h2 className="mb-3 text-center">Film meglio votati</h2>
                <div className="d-flex flex-wrap justify-content-center gap-4">
                    {moviesTopRated.slice(0, 4).map((movie) => (
                        <div key={movie.id} className="card top-rated-card p-3 text-center" style={{ width: '220px' }}>
                            <img src={"https://image.tmdb.org/t/p/original" + movie.poster_path} alt={movie.title} className="img-fluid rounded mb-2" />
                            <h5 className="mb-1">{movie.title}</h5>
                            <div className="mb-2">{renderStars(movie.vote_average)}</div>
                            <Button size="sm" variant="primary">Scopri</Button>
                        </div>
                    ))}
                </div>
            </div>

            {/* RECENSIONI UTENTI (mock) */}
            <div className="reviews-section w-100 mt-4 mb-5">
                <h2 className="mb-3 text-center">Recensioni degli spettatori</h2>
                <div className="d-flex flex-wrap justify-content-center gap-4">
                    <div className="review-ticket p-3">
                        <div className="review-stars mb-1">{renderStars(9)}</div>
                        <div className="review-text">“Un viaggio emozionante nel mondo del cinema!”</div>
                        <div className="review-author mt-2">- Sofia R.</div>
                    </div>
                    <div className="review-ticket p-3">
                        <div className="review-stars mb-1">{renderStars(8)}</div>
                        <div className="review-text">“Atmosfera vintage e film imperdibili.”</div>
                        <div className="review-author mt-2">- Marco L.</div>
                    </div>
                </div>
            </div>
        </Container>
    </>;
}

export default HomePage;