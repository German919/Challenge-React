import React, { useEffect, useState } from "react";
import {useLocation} from "wouter";

const HomeList = ({listSuperHeroes, setListSuperHeroes}) => {

    const[location, setLocation] = useLocation()

    const powerstats =[
        {name : "combat",  cantidad: 0}, 
        {name : "durability", cantidad: 0}, 
        {name : "intellingence", cantidad: 0},
        {name : "power", cantidad: 0},
        {name : "speed", cantidad: 0 },
        {name : "Strength", cantidad: 0}
    ]
    
    let contCombat = 0;
    let contDurability = 0;
    let contIntelligence= 0;
    let contPower= 0;
    let contSpeed = 0;
    let contStrength = 0;
    let peso = 0;
    let altura = 0;
    
    const handleDetails = (id) => {
        setLocation(`/home/details/${id}`)
    }

    const handleEliminar = (object) => {
        setListSuperHeroes(listSuperHeroes.filter(heroe =>heroe.id !== object.id)) 
        alert(`${object.name} con id ${object.id} eliminado` )
    }

    // ACUMULA EL POWERSTATS DE LOS SUPERHEROES DEL EQUIPO
    listSuperHeroes.forEach( heroe => {
         
        contCombat = parseInt(heroe.powerstats.combat !== "null" ? heroe.powerstats.combat : 0) 
        powerstats[0].cantidad += parseInt(contCombat)

        contDurability = parseInt(heroe.powerstats.durability !== "null" ? heroe.powerstats.durability : 0)
        powerstats[1].cantidad += parseInt(contDurability)

        contIntelligence = parseInt(heroe.powerstats.intelligence !== "null" ? heroe.powerstats.intelligence : 0)
        powerstats[2].cantidad += parseInt(contIntelligence) 

        contPower = parseInt(heroe.powerstats.power !== "null" ? heroe.powerstats.power : 0)
         powerstats[3].cantidad += parseInt(contPower)

        contSpeed = parseInt(heroe.powerstats.speed !== "null" ? heroe.powerstats.speed : 0) 
        powerstats[4].cantidad += parseInt(contSpeed)

        contStrength = parseInt(heroe.powerstats.strength !== "null" ? heroe.powerstats.strength : 0)
        powerstats[5].cantidad += parseInt(contStrength)
        
        peso += parseInt(heroe.appearance.weight[1]) 
        altura += parseInt(heroe.appearance.height[1])     
    
        }
    )
    //**********************     FIN     ********************************    

    //***********ORDENA LOS POWERSTATS DE MAYOR A MENOR***************** */
    powerstats.sort((a,b)=> (a.cantidad < b.cantidad) ? 1 : -1)
   
    return(
        <>
        <h1>{listSuperHeroes.name} </h1>
    
        <h3 className="title-info-equipo">Información del Equipo</h3> 
            <div className="container-info-group"> 
                <div className="powerstats">
                    <h3>Acumulativo Powerstats</h3>
                    <div className="powerstats-acumu">  
                        <div>
                            <h5><span>{powerstats[0].name}:</span> {powerstats[0].cantidad} </h5>  
                            <h5><span>{powerstats[1].name}:</span> {powerstats[1].cantidad} </h5>
                            <h5><span>{powerstats[2].name}:</span> {powerstats[2].cantidad} </h5>
                        </div>
                        <div>
                            <h5><span>{powerstats[3].name}:</span> {powerstats[3].cantidad} </h5>
                            <h5><span>{powerstats[4].name}:</span> {powerstats[4].cantidad} </h5>
                            <h5><span>{powerstats[5].name}:</span> {powerstats[5].cantidad} </h5>
                        </div>    
                    </div>
                </div>   
                <div className="container-promedios">
                    <h3> Promedios </h3>
                    <div className="apariencia-promedio">
                        <h5><span>Peso:</span>{peso}kg</h5>
                        <h5><span>Altura:</span>{altura}cm</h5>
                    </div>
                </div>
            </div>    
        <div className="container-card">
        {  
            listSuperHeroes.map( (superheroe, i)  =>(
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
                        <button onClick={()=>handleDetails(superheroe.id)}>Detalle</button>
                        <button onClick={()=>handleEliminar(superheroe)} >Eliminar</button>       
                    </div>
                </div>
                 )
            )
        }
        
        </div>

       </> 
    )
}

export default HomeList;