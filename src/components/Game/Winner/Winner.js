import React from "react";
import Players from "../Manches/Players/Players";
import "./Winner.scss";

function Winner(props) {

  const handleClick = (e) => {
  };

  return (
    <>
      {props.score1 > props.score2 && (
        <div className="winBloc col-md-6">
          <div className="row col-md-12">
            <Players teamchoice={1} teams={props.team} click={handleClick} />
          </div>
          <h4>
            Avec : <span className="win_txt">{props.score1}</span> points contre{" "}
            <span className="lose_txt">{props.score2}</span>
          </h4>
        </div>
      )}
      {props.score1 < props.score2 && (
        <div className="winBloc col-md-6">
          <div className="row col-md-12">
            <Players teamchoice={2} teams={props.team} onClick={handleClick} />
          </div>
          <h4>
            Avec : <span className="win_txt">{props.score2}</span> points contre{" "}
            <span className="lose_txt">{props.score1}</span>
          </h4>
        </div>
      )}
      <div className="col-md-6 img_win">
      <img src="/images/success.png" alt="Grand gagnants" />
      </div>
    </>
  );
}

export default Winner;
