import axios from "axios"
import {TOKEN} from "./config";

function getPeoples(page){    // funzione get peoples
    return axios.get("https://api.themoviedb.org/3/person/popular?language=it-IT&page=" +page,{
        headers : {
            "Authorization" : "Bearer " + TOKEN
        }
    })
}

function getPeople(id){
    return axios.get("https://api.themoviedb.org/3/person/" + id +"?language=it-IT", {
        headers : {
            "Authorization" : "Bearer " + TOKEN
        }
    })
}

export default{
    getPeoples,
    getPeople

}