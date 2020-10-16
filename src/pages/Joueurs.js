import React, { useContext } from "react";
import Footer from "../components/Footer/Footer";
import {firebaseAuth} from "../provider/AuthProvider";
import "../App.scss";

function Joueurs() {
    const {handleSignout,} = useContext(firebaseAuth);
  return (
    <>
      <div>
        Home, login successful!!!!!!
        <button onClick={handleSignout}>sign out </button>
      </div>
      <Footer />
    </>
  );
}

export default Joueurs;
