import React from "react";
import "./ScoreForm.scss";

function ScoreForm(props) {
  return (
    <>
      <div className="row search">
        <h2>Partie :</h2>
        <select className="selectGame">
          <option value="t">t</option>
        </select>
      </div>
    </>
  );
}

export default ScoreForm;
