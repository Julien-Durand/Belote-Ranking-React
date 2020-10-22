import React from "react";
import { useUser } from "reactfire";
import "../App.scss";
import Signin from "./auth/Signin";

function Joueurs() {
  const user = useUser();

  return (
    <>
     {user && (
        <h1>Helllo Joueur</h1>
     )} 
     { !user && <Signin />}    
    </>
  );
}

export default Joueurs;
