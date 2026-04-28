import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaFilm } from 'react-icons/fa';

const MovieCard = ({movie}) => {
    const navigate = useNavigate();

    return <>
        <Card className="fade-in film-border-card position-relative" style={{ width: '16rem', maxWidth: '100%' }} onClick={() => (navigate("/movie/"+movie.id))}>
            <span className="cinema-icon"><FaFilm /></span>
            <Card.Img variant="top" src={"https://image.tmdb.org/t/p/original" + movie.poster_path} />
            <Card.Body style={{maxHeight: "250px"}}>
                <Card.Title className="text-truncate">{movie.title}</Card.Title>
                <Card.Text style={{height: "40%", overflowY: "auto"}}>
                    {movie.overview}
                </Card.Text>
                <div className="d-flex flex-column align-items-center">
                <Button variant="primary" onClick={e => {e.stopPropagation(); navigate("/movie/"+movie.id)}}>Voir plus</Button>
                </div>
            </Card.Body>
        </Card>
    </>
}

export default MovieCard;