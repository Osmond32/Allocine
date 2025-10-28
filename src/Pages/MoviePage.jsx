import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MoviesService from "../Services/MoviesService";
import { Container, Tab, Tabs } from "react-bootstrap";
import CastingsTab from "../Components/CastingsTab";
import SimilarMoviesTab from "../Components/SimilarMoviesTab";
import SagaMoviesTab from "../Components/SagaMoviesTab";

const MoviePage = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState({});
    const [key, setKey] = useState("casting");
    const[isInFavorite, setIsInFavorite]= useState(false);
    const[IsInWatchList, setIsInWatchList] =useState(false);
    const navigate = useNavigate();

    const fetchMovie = async () => {
        try {
            const response = await MoviesService.getMovie(id);
            setMovie(response.data);
        } catch (error) {
            console.error(error);
        }

    }
    const addToFavorite= async () =>{
        try {
            const payload ={
                "media_type" : "movie",
                "media_id" : id,
                "favorite" :true
            }
            const response = await MoviesService.addToFavorite(payload)
           setIsInFavorite(true);
            console.log(response);
        } catch (error) {
            console.error(error)
        }
    }
       const removeToFavorite= async () =>{
        try {
            const payload ={
                "media_type" : "movie",
                "media_id" : id,
                "favorite" :false
            }
            const response = await MoviesService.addToFavorite(payload)
            setIsInFavorite(false);
            console.log(response);
        } catch (error) {
            console.error(error)
        }
    }

    const addToWatchList= async () =>{
        try {
            const payload ={
                "media_type" : "movie",
                "media_id" : id,
                "watchlist" :true
            }
            const response = await MoviesService.addToWatchList(payload)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }
     const removeToWatchList= async () =>{
        try {
            const payload ={
                "media_type" : "movie",
                "media_id" : id,
                "watchlist" :false
            }
            const response = await MoviesService.addToWatchList(payload)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    const checkFavorite = async () =>{
        try {
            let page =1;
            while(true){
                const response = await MoviesService.getFavoriteMovies(page);
                // se la lista dei film 
                let data = response.data.results;
                let exist = data.find((movie)=> movie.id ==id);
                
                if (exist!= undefined){
                    setIsInFavorite(true);

                }
                if(page>= response.data.total_pages){
                    break;
                }
                page++
            }
        } catch (error) {
           console.error(error); 
        }
    }

    const checkWatchList = async () =>{
        try {
            let page =1;
            while(true){
                const response = await MoviesService.getWatchListMovies(page);
                // se la lista dei film 
                let data = response.data.results;
                let exist = data.find((movie)=> movie.id ==id);
                
                if (exist!= undefined){
                    setIsInWatchList(true);

                }
                if(page>= response.data.total_pages){
                    break;
                }
                page++
            }
        } catch (error) {
           console.error(error); 
        }
    }

    useEffect(() => {
        fetchMovie();
        checkFavorite();
        checkWatchList();
    }, [])
    return <>
        <Container fluid className="d-flex flex-column align-items-center gap-3 col-6">
            <Container className="d-flex">

                <Container className="d-flex flex-column align-items-center gap-3">
                    <img className="col-12" src={"https://image.tmdb.org/t/p/original" + movie.poster_path} alt={"IMAGE-" + movie.title}></img>

                </Container>

                <Container className="d-flex flex-column align-items-center gap-3">
                    <h1>{movie.title ? movie.title : "Non reseigné"}  </h1>
                       <div className="d-flex justify-content-between col-10">
                        {isInFavorite ? <button className="btn btn-danger" onClick={removeToFavorite}>Retirer des favoris</button> : 
                        <button className="btn btn-success" onClick={addToFavorite}>Ajouter au favoris</button> }
                         {IsInWatchList ? <button className="btn btn-danger" onClick={removeToWatchList}>Retirer a la watchList</button> :
                        <button className="btn btn-success" onClick={addToWatchList}>Ajouter a la watch list </button> }
                       </div>

                    <h2 className="tect-decoration-underline">Description</h2>
                    <p style={{ maxHeight: "30vh", overflow: "auto", textAlign: "justify", paddingRight: "15px" }}>
                        {movie.overview ? movie.overview : "Non reseigné"}

                    </p>
                    <h2 className="text-decoration-underline"> Date de sortie</h2>
                    <p>{movie.release_date ? movie.release_date : "Non reseignè"}</p>
                    <h2 className="text-decoration-underline">Genrs</h2>
                    <div className="d-flex gap-3">
                        {movie.genres ? movie.genres.map((genre) => {
                            return <span key={genre.id} className="btn btn-info" onClick={() => { navigate("/genre/" + genre.id) }}>{genre.name}</span>

                        }) : "Non rensegnè"}
                    </div>
                    <h2 className="text-decoration-underline">Note</h2>
                    <p>{movie.vote_average ? movie.vote_average : "non renseignè"}/10</p>
                    <h2 className="text-decoration-underline">Statut</h2>
                    <p>{movie.status ? movie.status : "Non renseignè"}</p>
                    <h2 className="text-decoration-underline">Saga</h2>
                    <p>{movie.belongs_to_colletion ? movie.belongs_to_colletion.name : "Aucune Sage"}</p>
                    <h2 className="text-decoration-underline">Productions</h2>
                    <div className="d-flex gap-3">
                        {movie.production_companies ? movie.production_companies.map((compagny) => {
                            return <span className="btn btn-info" key={compagny.id}>{compagny.name}</span>

                        }) : "Non renseignè"}

                    </div>
                    <h2 className="text-decoration-underline">Pay de productions</h2>
                    <div className="d-flex gap-3">
                        {movie.countries ? movie.countries.map((country) => {
                            return <span className="btn btn-info" key={country.iso_3166_1}>{country.name}</span>


                        }) : "Non reinsegnè"}


                    </div>




                </Container>



            </Container>

            <Tabs id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3 col-10">
                <Tab eventKey={"casting"} title="Casting">
                    <CastingsTab movie={movie}> </CastingsTab>
                </Tab>
                <Tab eventKey={"similar-movies"} title="Film similaire">
                    <SimilarMoviesTab movie={movie} />
                </Tab>
                <Tab eventKey={"saga-movies"} title="Film de la saga">
                    <SagaMoviesTab movie={movie} />



                </Tab>

            </Tabs>


        </Container>


    </>;
}

export default MoviePage;