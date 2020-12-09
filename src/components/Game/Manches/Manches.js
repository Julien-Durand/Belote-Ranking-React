import React, { useState, useEffect, useLayoutEffect } from "react";
import { useFirebaseApp, useUser } from "reactfire";
import { Button } from "../../Button/Button";
import ScoreTab from "../../Scores/ScoreTab";
import ScoreTeam from "../ScoreTeam/ScoreTeam";
import Winner from "../Winner/Winner";
import "./Manches.scss";
import Players from "./Players/Players";

function Manches(props) {
  const user = useUser();
  //import firebase
  const db = useFirebaseApp().firestore();

  const [mancheAlreadySav, setMancheAlready] = useState(false);

  const [end, setEnd] = useState(false);
  const [game, setGame] = useState([]);

  // const txtBtn = "Enregistrer";
  const [txtBtn, setTxt] = useState();

  //btn text manche
  useLayoutEffect(() => {
    if (props.manche === 12) {
      setTxt("Terminer la partie !");
    } else if (mancheAlreadySav) {
      setTxt("Changer");
    } else {
      setTxt("Enregistrer");
    }
  }, [props.manche, mancheAlreadySav]);

  //manche X state
  const [score, setScore] = useState({
    mancheId: props.manche,
    scoreTeam1: "",
    scoreTeam2: "",
    preneur: "",
    preneurTeam: "",
    error: "",
  });

  const [teamScore, setTeamScore] = useState({
    team1: 0,
    team2: 0,
  });
  const [scoreBefore, setBefore] = useState({
    scoreBefore1: 0,
    scoreBefore2: 0,
  });

  //update win team
  const [winners, setWinners] = useState();

  useEffect(() => {
    if (
      teamScore.team1 + score.scoreTeam1 >
      teamScore.team2 + score.scoreTeam2
    ) {
      setWinners(1);
    } else if (
      teamScore.team1 + score.scoreTeam1 ===
      teamScore.team2 + score.scoreTeam2
    ) {
      setWinners(0);
    } else {
      setWinners(2);
    }
  }, [teamScore, score]);

  //Update input/prise
  useEffect(() => {
    db.collection("Users")
      .doc(user.uid)
      .collection("Play")
      .doc("Manche" + props.manche)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setScore({
            mancheId: props.manche,
            scoreTeam1: doc.data().score.scoreTeam1,
            scoreTeam2: doc.data().score.scoreTeam2,
            preneur: doc.data().score.preneur,
          });
          setBefore({
            scoreBefore1: doc.data().score.scoreTeam1,
            scoreBefore2: doc.data().score.scoreTeam2,
          });
          setMancheAlready(true);
        }
      });
  }, [db, user, props.manche]);

  useEffect(() => {
    if (!mancheAlreadySav) {
      db.collection("Users")
        .doc(user.uid)
        .collection("Play")
        .doc("Info")
        .get()
        .then((doc) => {
          if (doc.exists) {
            setTeamScore({
              team1: doc.data().scoreTeam1,
              team2: doc.data().scoreTeam2,
            });
          }
        });
    }
  }, [db, user, mancheAlreadySav]);

  //onChange Input Score team 1
  const handleChangeScore1 = (e) => {
    if (e.target.validity.valid) {
      setScore({
        ...score,
        [e.target.name]: parseInt(e.target.value),
        scoreTeam2: e.target.value > 160 ? 0 : 162 - e.target.value,
        error: "",
      });
    }
  };
  //OnChange Input Score team 2
  const handleChangeScore2 = (e) => {
    if (e.target.validity.valid) {
      setScore({
        ...score,
        [e.target.name]: parseInt(e.target.value),
        scoreTeam1: e.target.value > 160 ? 0 : 162 - e.target.value,
        error: "",
      });
    }
  };
  //Select preneur
  const handleClick = (player, teamNumber) => {
    setScore({
      ...score,
      preneur: player,
      preneurTeam: teamNumber
    });
  };

  //add final data
  useEffect(() => {
    if (end && game.length === 14) {
      db.collection("Users").doc(user.uid).collection("Games").add({ game });
      let data = [
        "Manche1",
        "Manche2",
        "Manche3",
        "Manche4",
        "Manche5",
        "Manche6",
        "Manche7",
        "Manche8",
        "Manche9",
        "Manche10",
        "Manche11",
        "Manche12",
        "Info",
        "Teams",
      ];
      //Delete current data game
      for (let i = 0; i < data.length; i++) {
        db.collection("Users")
          .doc(user.uid)
          .collection("Play")
          .doc(data[i])
          .delete();
      }
    }
  }, [end, user, game, db]);

  //end game
  const closeGame = () => {
    db.collection("Users")
      .doc(user.uid)
      .collection("Play")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setGame((game) => [...game, doc.data()]);
        });
      });
    setEnd(true);
  };

  //submit function
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!score.preneur) {
      setScore({
        ...score,
        error: "Séléctionner un preneur !",
      });
    } else if (isNaN(score.scoreTeam1) || isNaN(score.scoreTeam2)) {
      setScore({
        ...score,
        error: "Il manque un score !",
      });
    } else {
      db.collection("Users")
        .doc(user.uid)
        .collection("Play")
        .doc("Manche" + props.manche)
        .set({ score })
        .then(() => {
          console.log("Document successfully written!");
          db.collection("Users")
            .doc(user.uid)
            .collection("Play")
            .doc("Info")
            .update({
              scoreTeam1: mancheAlreadySav
                ? score.scoreTeam1 + teamScore.team1 - scoreBefore.scoreBefore1
                : score.scoreTeam1 + teamScore.team1,
              scoreTeam2: mancheAlreadySav
                ? score.scoreTeam2 + teamScore.team2 - scoreBefore.scoreBefore2
                : score.scoreTeam2 + teamScore.team2,
              winner: winners,
            });

          props.manche === 12 ? closeGame() : props.onClick(props.manche);
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    }
  };

  let prevManche = props.manche - 1;
  //nav previous manche
  const handleClickNavLeft = () => {
    props.onSelect(prevManche - 1);
  };

  //nav next manche
  const handleClickNavRight = () => {
    props.onClick(props.manche);
  };

  return (
    <>
      {!end && (
        <div className="col-md-12 text-center header-manche">
          {prevManche !== 0 && (
            <i
              className="fas fa-chevron-circle-left"
              onClick={handleClickNavLeft}
            ></i>
          )}
          <h3>Manche {props.manche}</h3>
          {prevManche !== 11 && (
            <i
              className="fas fa-chevron-circle-right"
              onClick={handleClickNavRight}
            ></i>
          )}
        </div>
      )}
      {!end && (
        <form onSubmit={handleSubmit} className="row form-manche">
          <div className="col-md-12 bloc-team">
            <Players
              teams={props.teams}
              teamchoice={1}
              click={handleClick}
              prise={score.preneur.id}
            />
            <div className="row wrappe-score">
              <ScoreTeam score={teamScore.team1} className="scoreT" />
              <input
                type="number"
                max="282"
                min="0"
                pattern="[0-9]*"
                onChange={handleChangeScore1}
                name="scoreTeam1"
                placeholder="Nombre de points"
                id="scoreTeam1"
                value={score.scoreTeam1}
              />
            </div>
          </div>
          <div className="col-md-12 bloc-team">
            <Players
              teams={props.teams}
              teamchoice={2}
              click={handleClick}
              prise={score.preneur.id}
            />
            <div className="row wrappe-score">
              <ScoreTeam score={teamScore.team2} className="scoreT" />
              <input
                type="number"
                max="282"
                min="0"
                pattern="[0-9]*"
                onChange={handleChangeScore2}
                name="scoreTeam2"
                placeholder="Nombre de points"
                id="scoreTeam2"
                value={score.scoreTeam2}
              />
            </div>
          </div>
          {score.error && <span style={{ color: "red" }}>{score.error}</span>}
          <div className="col-md-12">
            <button className="btn btn__success" type="submit">
              {txtBtn}
            </button>
          </div>
        </form>
      )}

      {end && (
        <div className="endgame">
          <h2 className="col-md-12">Winner</h2>
          <Winner
            score1={teamScore.team1 + score.scoreTeam1}
            score2={teamScore.team2 + score.scoreTeam2}
            team={props.teams}
          />
          <ScoreTab dataGame={game} />
          <div className="leave">
          <Button
            buttonStyle="btn__simple"
            buttonColor="btn__success"
            buttonSize="btn__regular"
            link="Belote"
          >
            Nouvelle Partie
          </Button>
          <Button
            buttonStyle="btn__round"
            buttonColor="btn__danger"
            buttonSize="btn__regular"
            link="/"
          >
            Quitter
          </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default Manches;
