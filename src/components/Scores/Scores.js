import React, { useState, useEffect } from "react";
import { useFirebaseApp, useUser } from "reactfire";
import ScoreTab from "./ScoreTab";
import "./Scores.scss";

function Scores() {
  //user
  const user = useUser();
  //import firebase
  const db = useFirebaseApp().firestore();

  const [games, setGames] = useState([]);

  const [choice, setChoice] = useState(false);

  useEffect(() => {
    const subGame = db
      .collection("Users")
      .doc(user.uid)
      .collection("Games")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setGames((games) => [...games, doc.data().game]);
        });
      });
    return () => subGame();
  }, [db, user]);

  const [theGame, setTheGame] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setTheGame(games[value]);
    setChoice(true);
  };
  return (
    <>
      <div className="row select-game">
        <div className="search col-md-12">
          <h2>Score :</h2>
          <select
            className="selectGame"
            onChange={handleChange}
            defaultValue={"DEFAULT"}
          >
            <option value="DEFAULT" disabled hidden>
              Choisir une partie
            </option>
            {games.map((value, i) => (
              <option value={i} key={i}>
                {value[0].date} - {value[13].team[0].pseudo} &{" "}
                {value[13].team[1].pseudo} VS {value[13].team[1].pseudo} &{" "}
                {value[13].team[3].pseudo}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-12">
          {choice && <ScoreTab dataGame={theGame} />}
        </div>
      </div>
    </>
  );
}

export default Scores;
