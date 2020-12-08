import React from "react";

function Players(props) {
  let [a,b] = [0,4];

  if (props.teamchoice === 1) {
    [a,b] = [0,2]
  } 
  else if ( props.teamchoice === 2) {
    [a,b] = [2,4]
  }


  return (
    <>
      {props.teams.slice(a,b).map((teams) => (
        <div className={`player ${teams.id === props.prise ? "active" : ""}`} key={teams.id} onClick={() => props.click(teams, props.teamchoice)}>
          <img src={teams.image} alt="profil" />
          <h5 className="text-center">{teams.pseudo}</h5>
        </div>
      ))}
    </>
  );
}

export default Players;
