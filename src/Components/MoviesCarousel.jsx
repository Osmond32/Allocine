import MovieCard from "./MovieCard";

const MoviesCarousel = ({ title, movies }) => {
    return <>
        <h2 className="mb-3 w-100 text-start">{title}</h2>
        {/* Contenitore a scorrimento orizzontale */}
        <div className="d-flex overflow-auto gap-3 pb-4 w-100" style={{ scrollBehavior: 'smooth' }}>
            {movies.map((movie) => (
                <div key={movie.id} className="flex-shrink-0">
                    <MovieCard movie={movie} />
                </div>
            ))}
        </div>
    </>;
}

export default MoviesCarousel;