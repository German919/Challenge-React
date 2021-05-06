import React, {useEffect, useState} from "react";
import "./home.css";
import {apiUrl} from "../services/api";
import HomeList from "./home-list";
import {useLocation} from "wouter";
const Home = () => {

    const [listSuperHeroes, setListSuperHeroes] = useState([]);

    const[location, setLocation] = useLocation()
    const[show, setShow] = useState(false)
    const[showIncorrect, setShowIncorrect] = useState(false)

    const [name, setName] = useState()
    const [listSuperHeroesSearch, setListSuperHeroesSearch] = useState()

    if(!localStorage.getItem("token")){
        setLocation("/")
    }
    useEffect(()=>{
        fetch(`${apiUrl}/10225574111128075/search/doc`)
          .then(res => res.json())
          .then(res => setListSuperHeroes(res.results))
    
    },[])
    
    const logout = () =>{
        localStorage.removeItem("token")
        setLocation("/")
    }

    const handleChange = (e) => {
        setName(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`${apiUrl}/10225574111128075/search/${name}`)
            .then(res => res.json())
            .then(res => setListSuperHeroesSearch(res.results))
    }
    const agregarHeroe = (superheroe) => {
        
       const idHeroe = listSuperHeroes.find(heroe=> heroe.id === superheroe.id)
     
        if(idHeroe === undefined){
            setListSuperHeroes([
                ...listSuperHeroes,
                superheroe
            ])
            setShow(true)
          
        }else if(idHeroe.id === superheroe.id){
            setShowIncorrect(true)
          
        }
    }
    
    const hideCartel = () => {
        setShow(false)
        setShowIncorrect(false)
    }
    
    return(
        <>
            {
            show  ?
            
            <div className="show-cartel">
                <h3>Se ha agregado un nuevo heroe al equipo</h3>
                <button onClick={hideCartel} >Aceptar</button>
            </div>
            : showIncorrect ? 
                <div className="show-cartel">
                    <h3>El SuperHeroe ya se encuentra en el equipo</h3>
                    <button onClick={hideCartel} >Aceptar</button>
                </div>
                : ""
            }

            <h1>Equipo de Doctors</h1>
            <button onClick={logout} className="button-logout">Salir</button>
            <form className="form-search" onSubmit={handleSubmit} >
                <div className="form-search-input">
                    <button>Buscar SuperHeroe</button>   
                    <input className="form-input" type="text" placeholder="Buscar..." onChange={handleChange} />
                </div>
            </form>
            {
            listSuperHeroesSearch !== undefined ?

            <div className="container-card">

             {  
                listSuperHeroesSearch.map( (superheroe, i)  =>(
                    <div key={i} className="card">
                        <img src={superheroe.image.url} /> 
                        <h3 className="card-name">{superheroe.name} </h3> 
                        <div>
                            <h5>Intelligence: {superheroe.powerstats.intelligence} </h5>
                            <h5>Strength: {superheroe.powerstats.strength} </h5>
                        </div> 
                        <div>
                            <h5>Speed: {superheroe.powerstats.speed} </h5>   
                            <h5>Durability:{superheroe.powerstats.durability} </h5>
                        </div>
                        <div>
                            <h5>Power: {superheroe.powerstats.power} </h5>
                            <h5>Combat:{superheroe.powerstats.combat} </h5>
                        </div>
                        <div className="card-button">
                            <button onClick={()=>agregarHeroe(superheroe)} >Agregar al equipo</button>
                        </div>
                    </div>
                ))
            }
            </div>

            :

            <HomeList 
                listSuperHeroes={listSuperHeroes}  
                setListSuperHeroes={setListSuperHeroes}    
            />
            }
        </>
    )
}

export default Home;