import Formulario from "./components/formulario";
import './App.css';
import {Route} from "wouter";
import Home from "./components/home";
import HeroeDetails from './components/details';

function App() {

  return (
      <>
        <Route component={Formulario} path="/" exact />            
        <Route component={Home} path="/home" />
        <Route component={HeroeDetails} path="/home/details/:id" />      
      </>

  );
}

export default App;
