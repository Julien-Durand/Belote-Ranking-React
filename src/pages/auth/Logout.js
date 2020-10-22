import React from 'react';
import { useFirebaseApp } from 'reactfire';
import 'firebase/auth';
import { useHistory } from "react-router";

const Logout = () => {
  const history = useHistory();
  // Import firebase
  const firebase = useFirebaseApp();

  // Log out function
  const handleClick = () => {
    firebase.auth().signOut();
    history.replace("/signin");
  }

  return (
    <>
      <button onClick={handleClick} className="btn btn__danger btn__simple">Déconnection</button>
    </>

    
  )
};

export default Logout;