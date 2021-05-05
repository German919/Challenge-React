import React, {useState} from "react";
import {useLocation} from "wouter";
import axios from "axios";
const Formulario = () => {

    const EMAIL = "challenge@alkemy.org"
    const PASS = "react"

    const [datos, setDatos] = useState({
        email:"",
        password:""
    })
    
    const [errors, setErrors] = useState({
        email:"",
        password:""
    });

    const [location, setLocation] = useLocation()
    const validate = (values) => {

      const errors = {}
        
      if(!values.email){
          errors.email = "Debe completar el campo email"
      }else if(!values.password){
          errors.password = "Debe completar el campo password"
      }else if(values.email !== EMAIL ){
          errors.email = "Email incorrecto"
      }else if(values.password !== PASS){
          errors.password = "Password incorrecta"
      }
    
      return errors;
    }
    
    const submit = (e) => {
        e.preventDefault()
        const result = validate(datos)
        setErrors(result)
    
        if(!Object.keys(result).length){
          console.log("Formulario enviado!!!")
          axios.post("http://challenge-react.alkemy.org/", datos)
            .then(res => (
              localStorage.setItem("token",  res.data.token),
              setLocation("/home")
            ))
            .catch( err => alert("Error en la API " + err) )
        } 
    }
    
    const handleInputChange = (e) =>{
        setDatos({
          ...datos,
          [e.target.name] : e.target.value,
        })
    }

    const handleBlur = (e) =>{
      handleInputChange(e)
      const resultsErrors = validate(datos)
      setErrors(resultsErrors)
    }

    return (
        
        <div className="App">
        <form onSubmit={submit} className="form"> 
          <input 
              className="input-email" 
              type="email" 
              placeholder="email" 
              name= "email"
              onChange={handleInputChange} 
              onBlur={handleBlur}  
              />
          {
            errors.email && <label className="label-email">{errors.email} </label>  
          }
          <input 
              className="input-pass" 
              type="password" 
              placeholder="password"
              name="password" 
              onChange={handleInputChange}
              onBlur={handleBlur} 
              /> 
           {
            errors.password && <label className="label-email">{errors.password} </label>
           } 
          <button className="button-login">Login</button>
        </form>
    </div>
    )
}

export default Formulario;