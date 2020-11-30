import React, { useState, useEffect } from "react";
import { useFirebaseApp, useUser } from "reactfire";
import "./Team.scss";

function Team() {
  //user
  const user = useUser();
  //import firebase
  const db = useFirebaseApp().firestore();

  const [submitted, setSubmitted] = useState(false);

  //Players list
  const [player, setPlayer] = useState([]);
  //team state
  const [team, setTeam] = useState([
    {
      nom: "",
    },
    {
      nom: "",
    },
    {
      nom: "",
    },
    {
      nom: "",
    },
  ]);

  useEffect(() => {
    const dataPlayers = db
      .collection("Users")
      .doc(user.uid)
      .collection("Joueurs")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setPlayer((player) => [
            ...player,
            {
              id: doc.id,
              nom: doc.data().nom,
              pseudo: doc.data().pseudo,
              image: doc.data().image,
            },
          ]);
        });
      });
    return () => dataPlayers();
  }, [db, user]);

  //onChange function
  const handleChange = (numberSelect) => (e) => {
    const value = e.target.value;
    let newTeam = [...team];
    newTeam[numberSelect] = player[value];
    setTeam(newTeam);
  };

  //submit function (add players in team)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (team[0].id && team[1].id && team[2].id && team[3].id) {
      db.collection("Users")
        .doc(user.uid)
        .collection("Play")
        .doc("Teams")
        .set({
          team
        })
        .then(() => {
          console.log("Document successfully written!");
          setSubmitted(true);
          db.collection("Users")
            .doc(user.uid)
            .collection("Play")
            .doc("Info")
            .set({
              isOk: true,
              scoreTeam1: 0,
              scoreTeam2: 0
            });
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    }
  };
  return (
    <div className={`team-form row ${submitted ? "hidden" : "active"}`}>
      <h2>Création des équipes</h2>
      <form onSubmit={handleSubmit} className="row">
        <div className="col-md-6 form-group">
          <h4>Equipe :</h4>
          <select onChange={handleChange(0)} defaultValue={"DEFAULT"}>
            <option value="DEFAULT" disabled hidden>
              Choisir un joueur
            </option>
            {player.map((i, index) => (
              <option value={index} key={index}>
                {i.pseudo}
              </option>
            ))}
          </select>
          <select onChange={handleChange(1)} defaultValue={"DEFAULT"}>
            <option value="DEFAULT" disabled hidden>
              Choisir un joueur
            </option>
            {player.map((i, index) => (
              <option value={index} key={index}>
                {i.pseudo}
              </option>
            ))}
          </select>
          {team[0].image && <img src={team[0].image} alt="profil" />}
          {team[1].image && <img src={team[1].image} alt="profil" />}
        </div>
        <div className="col-md-6 form-group">
          <h4>Equipe :</h4>
          <select onChange={handleChange(2)} defaultValue={"DEFAULT"}>
            <option value="DEFAULT" disabled hidden>
              Choisir un joueur
            </option>
            {player.map((i, index) => (
              <option value={index} key={index}>
                {i.pseudo}
              </option>
            ))}
          </select>
          <select onChange={handleChange(3)} defaultValue={"DEFAULT"}>
            <option value="DEFAULT" disabled hidden>
              Choisir un joueur
            </option>
            {player.map((i, index) => (
              <option value={index} key={index}>
                {i.pseudo}
              </option>
            ))}
          </select>
          {team[2].image && <img src={team[2].image} alt="profil" />}
          {team[3].image && <img src={team[3].image} alt="profil" />}
        </div>
        <div className="col-md-12">
          <button className="btn btn__success" type="submit">
            Commencer
          </button> 
        </div>
      </form>
    </div>
  );
}

export default Team;
