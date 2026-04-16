import { Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaFilm } from 'react-icons/fa';

const MoviesCarousel = ({title, movies}) => {
    const navigate = useNavigate();
    return <>
     <h2>{title}</h2>
            <Carousel className="col-6 fade-in">
                {movies.map((movies) => {
                    return <Carousel.Item key={movies.id} className="position-relative">
                        <span className="cinema-icon"><FaFilm /></span>
                        <img onClick={()=> navigate('/movie/' +movies.id)} className="block w-100 rounded cursor" src={"https://image.tmdb.org/t/p/original" + movies.backdrop_path}></img>
                        <Carousel.Caption>
                            <h2>{movies.title}</h2>
                        </Carousel.Caption>
                    </Carousel.Item>
                })}

            </Carousel>
    </>;
}

export default MoviesCarousel;