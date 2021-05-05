import React, { useEffect, useState } from "react";
import {apiUrl} from "../../services/api";
import "./index.css";
import {useLocation} from "wouter"
const HeroeDetails = ({params}) => {

    const [infoHeroe, setInfoHeroe] = useState();
    const [location, setLocation] = useLocation()

    if(!localStorage.getItem("token")){
        setLocation("/home")
    }
    useEffect(()=>{
        fetch(`${apiUrl}/10225574111128075/${params.id}`)
            .then( data => data.json())
            .then( res => setInfoHeroe(res))     
        },[])

    const volver = () => {
        setLocation("/home")
    }

    const logout = () =>{
        localStorage.removeItem("token")
        setLocation("/")
    }

    return (
        <>
        
        {
            infoHeroe && 
            <>
            <h1>{infoHeroe.name}</h1>
            <button onClick={logout} className="button-logout">Salir</button>
            <div className="container-details">
                <div className="container-details-img">
                    <img src={infoHeroe.image.url} />
                </div>
                <div>   
                    <h3>INFORMACION</h3>
                    <div className="container-details-names">
                        <h5><span>Nombre Completo:</span> {infoHeroe.biography["full-name"] } </h5>
                        <h5><span>Alias:</span> {infoHeroe.biography.aliases[0]} -- {infoHeroe.biography.aliases[1]}</h5>
                    </div> 

                    <div className="container-details-appearance">
                        <h5><span>Color Ojos:</span> {infoHeroe.appearance["eye-color"]} </h5>
                        <h5><span>Color Pelo:</span> {infoHeroe.appearance["hair-color"]} </h5>
                        <h5><span>Altura:</span> {infoHeroe.appearance.height[1]} </h5>
                        <h5><span>Peso:</span> {infoHeroe.appearance.weight[1]} </h5>
                    </div> 

                    <div className="container-details-work">
                        <h5><span>Ocupacion:</span> {infoHeroe.work.occupation} </h5>
                        <h5><span>Base:</span> {infoHeroe.work.base} </h5>  
                    </div>   
                    <button onClick={volver}>Volver</button>
                </div>
            </div>
        </>
        }
       
        </>
    )
}

export default HeroeDetails;