import React from "react";
import "../App.scss";
import ListPlayer from "../components/ListPlayer/ListPlayer";
import PlayerForm from "../components/PlayerForm/PlayerForm";

function Joueurs() {

  return (
    <>
      <PlayerForm />
      <ListPlayer />
    </>
  );
}

export default Joueurs;
