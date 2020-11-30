import React, { useEffect, useState } from "react";
import "./ListPlayer.scss";
import { useFirebaseApp, useUser } from "reactfire";

function ListPlayer() {
  const user = useUser();

  //import firebase
  const db = useFirebaseApp().firestore();

  //List state
  const [lists, setList] = useState([]);

  useEffect(() => {
    const subscriber = db
      .collection("Users")
      .doc(user.uid)
      .collection("Joueurs")
      .onSnapshot((querySnapshot) => {
        setList([]);
        if (lists) {
          querySnapshot.forEach((doc) => {
            setList((lists) => [
              ...lists,
              {
                image: doc.data().image,
                nom: doc.data().nom,
                pseudo: doc.data().pseudo,
                win: doc.data().win,
                lose: doc.data().lose
              },
            ]);
          });
        }
      });
    return () => subscriber();
  }, [db, user, lists]);

  return (
    <>
      <section className="section section-PlayerList">
        <div className="container">
          <div className="row">
            <h2 className="title col-md-12">Liste des joueurs</h2>
          </div>
          <div className="row player-container">
            {lists.map((l, index) => (
              <div className="player-card" key={index}>
                <img src={l.image} alt="profil"  className="col-6" />
                <div className="col-6">
                  <h3>{l.pseudo}</h3>
                  <div>Win: {l.win} </div>
                  <div>Lose: {l.lose}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default ListPlayer;
