import React, { useState } from "react";
import { useFirebaseApp, useUser } from "reactfire";
import "./PlayerForm.scss";

function PlayerForm() {
  const user = useUser();

  //Player state
  const [player, setPlayer] = useState({
    pseudo: "",
    nom: "",
    error: "",
  });

  //onChange function
  const handleChange = (e) => {
    setPlayer({
      ...player,
      [e.target.name]: e.target.value,
      error: "",
    });
  };

  //import firebase
  const db = useFirebaseApp().firestore();

  //submit function ( add Player data )
  const handleSubmit = (e) => {
    e.preventDefault();

    // Add a new document in collection
    if (!player.pseudo) {
      setPlayer({
        ...player,
        error: "Champs vide...",
      });
    } else {
      db.collection("Users")
        .doc(user.uid)
        .collection("Joueurs")
        .add({
          pseudo: player.pseudo,
          nom: player.nom,
          image: pictureList.link,
          win: 0,
          lose: 0
        })
        .then(function () {
          console.log("Document successfully written!");
          setPlayer({
            ...player,
            pseudo: "",
            nom: "",
          });
          setPictureList({
            ...pictureList,
            link: pictures[0].link,
            label: pictures[0].label
          });
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });
    }
  };

  //profil picture data
  const pictures = [
    {
      label: "Batman",
      link: "/images//profils/batman.png",
    },
    {
      label: "Brutus",
      link: "/images//profils/brutus.png",
    },
    {
      label: "Captain",
      link: "/images//profils/captain.png",
    },
    {
      label: "Deadpool",
      link: "/images//profils/deadpool.png",
    },
    {
      label: "Finn",
      link: "/images//profils/finn.png",
    },
    {
      label: "Flash",
      link: "/images//profils/flash.png",
    },
    {
      label: "Hulk",
      link: "/images//profils/hulk.png",
    },
    {
      label: "Ice King",
      link: "/images//profils/ice-king.png",
    },
    {
      label: "Iron Man",
      link: "/images//profils/iron-man.png",
    },
    {
      label: "Jake",
      link: "/images//profils/jake.png",
    },
    {
      label: "Jerry",
      link: "/images//profils/jerry.png",
    },
    {
      label: "Joker",
      link: "/images//profils/joker.png",
    },
    {
      label: "Popeye",
      link: "/images//profils/popeye.png",
    },
    {
      label: "Rick",
      link: "/images//profils/rick.png",
    },
    {
      label: "Saitama",
      link: "/images//profils/saitama.png",
    },
    {
      label: "Schtroumpf",
      link: "/images//profils/smurf.png",
    },
  ];
  const [pictureList, setPictureList] = useState({
    label: pictures[0].label,
    link: pictures[0].link
  });

  const handleChangePicture = (e) => {
   
    setPictureList({
      ...pictureList,
      label: pictures[e.target.value].label,
      link: pictures[e.target.value].link,
    });
    
  };
  // console.log(pictureList.label);
  return (
    <>
      <section className="section section-playerForm">
        <div className="container">
          <div className="row ">
            <form onSubmit={handleSubmit} className="col-md-6">
              <h4>Ajouter un joueur à la liste</h4>
              <div className="row profil-pic">
                <img src={pictureList.link} alt={pictureList.label} />
                <select onChange={handleChangePicture} className="select-pic">
                  {pictures.map((i, index) => (
                    <option value={index} key={index}>
                      {i.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <input
                type="text"
                onChange={handleChange}
                name="pseudo"
                placeholder="Pseudo du joueur"
                id="pseudo"
                value={player.pseudo}
              />
              <input
                type="text"
                onChange={handleChange}
                name="nom"
                placeholder="Nom du joueur"
                value={player.nom}
              />
            
              {player.error && (
                <span style={{ color: "red" }}>{player.error}</span>
              )}
              <button className="btn btn__success" type="submit">
                Ajouter
              </button>
            </form>
            <div className="col-md-6 block-image">
              <img src="/images/joueur.png" alt="Ajouter des joueurs" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PlayerForm;
