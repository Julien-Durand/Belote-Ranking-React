import React, { useRef } from "react";
import { Button } from "../Button/Button";
import Card from "../Cards/Card";
import "../../App.scss";
import "./HeroSection.scss";

function HeroSection() {
  const posRef = useRef();

  const handleDownClick = () =>
    posRef.current.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="wrapper">
      <div className="page-header">
        <div className="item item2 clover"></div>
        <div className="item item3 clover clover__min"></div>
        <div className="item item4 diamond"></div>
        <div className="item item5 spade"></div>
        <div className="item item6 heart"></div>
        <div className="item item7 heart"></div>
        <div className="container">
          <div className="container-center brand">
            <h1>
              BLR <i className="fas fa-trophy"></i>
            </h1>
            <h3>
              Belote Ranking est une application pour compter les points et
              garder en souvenir les parties avec vos amis !
            </h3>
            <button onClick={handleDownClick}>
              <Button
                buttonStyle="btn__round"
                buttonSize="btn__regular"
                buttonColor="btn__primary"
              >
                Commencer
              </Button>
            </button>
          </div>
        </div>
      </div>
      <section className="section" ref={posRef}>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <Card
                src="/images/joueur.png"
                alt="Ajouter un joueur"
                title="Créer une liste de joueurs"
                line="line__primary"
                desc="Ajoute des joueurs à ta liste pour faire équipe avec eux ou jouer contre !"
                btnStyle="btn__simple__def"
                btnColor="btn__primary"
                link="Joueurs"
                textBtn="Ajouter un joueur"
              />
            </div>
            <div className="col-md-4">
              <Card
                src="/images/game.png"
                alt="Lancer une partie de belote"
                line="line__success"
                title="Commencer une partie"
                desc="C'est partie pour une petite belote entre amis. Aller pas le temps de niaiser !"
                btnStyle="btn__simple__def"
                btnColor="btn__success"
                link="Belote"
                textBtn="Let's go"
              />
            </div>
            <div className="col-md-4">
              <Card
                src="/images/score.png"
                alt="Revoir les scores"
                line="line__info"
                title="Revoir les scores"
                desc="Retrouve l'historique des parties de belote, victoire, defaite, les stats sont là"
                btnStyle="btn__simple__def"
                btnColor="btn__info"
                link="Score"
                textBtn="Voir l'historique"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HeroSection;
