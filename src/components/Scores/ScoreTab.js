import React from "react";
import Players from "../Game/Manches/Players/Players";
import "./ScoreTab.scss";

function ScoreTab(props) {
  const handleClick = (e) => {};

  const showScoreTeam = (value, manche, team) => {
    if (manche === 1) {
      let scoreM = value.slice(manche, manche + 1).map((item) => {
        return team === 1 ? item.score.scoreTeam1 : item.score.scoreTeam2;
      });
      return scoreM;
    } else if (manche > 9) {
      let scoreM = value.slice(manche - 8, manche - 7).map((item) => {
        return team === 1 ? item.score.scoreTeam1 : item.score.scoreTeam2;
      });
      return scoreM;
    } else {
      let scoreM = value.slice(manche + 3, manche + 4).map((item) => {
        return team === 1 ? item.score.scoreTeam1 : item.score.scoreTeam2;
      });
      return scoreM;
    }
  };

  const showTotal = (value, team) => {
    let total = value.slice(0, 1).map((item) => {
      return team === 1 ? item.scoreTeam1 : item.scoreTeam2;
    });
    return total;
  };

  const showPrise = (value, manche, team) => {
    if (manche === 1) {
      let prise = value.slice(manche, manche + 1).map((item, i) => {
        if (item.score.preneurTeam === team) {
        return <img src={item.score.preneur.image} alt="Preneur" key={i} />;
        } else {
          return null;
        }
      });
      return prise;
    } else if (manche > 9) {
      let prise = value.slice(manche - 8, manche - 7).map((item, i) => {
        if (item.score.preneurTeam === team) {
          return <img src={item.score.preneur.image} alt="Preneur" key={i} />;
        } else {
          return null;
        }
      });
      return prise;
    } else {
      let prise = value.slice(manche + 3, manche + 4).map((item, i) => {
        if (item.score.preneurTeam === team) {
          return <img src={item.score.preneur.image} alt="Preneur" key={i} />;
        } else {
          return null;
        }
      });
      return prise;
    }
  };

  const nbManche = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <>
      <div className="table">
        <div className="table-cell first-cell"></div>
        <div className="table-cell">
          <h3>Team</h3>
          <div className="block-player">
            <Players teamchoice={1} teams={props.team} click={handleClick} />
          </div>
        </div>
        <div className="table-cell">
          <h3>Team</h3>
          <div className="block-player">
            <Players teamchoice={2} teams={props.team} click={handleClick} />
          </div>
        </div>

        {nbManche.map((item) => {
          return (
            <div className="strucTab" key={item}>
              <div className="table-cell cell-feature">{item}</div>
              <div className="tabScoreTeam">
                <div className="table-cell">
                  <span className="priseP">
                    {showPrise(props.dataGame, item, 1)}
                  </span>
                  <p>{showScoreTeam(props.dataGame, item, 1)}</p>
                </div>
                <div className="table-cell">
                  <span className="priseP">
                    {showPrise(props.dataGame, item, 2)}
                  </span>
                  <p>{showScoreTeam(props.dataGame, item, 2)}</p>
                </div>
              </div>
            </div>
          );
        })}
        <div className="strucTab">
          <div className="table-cell cell-feature tot">Total</div>
          <div className="tabScoreTeam">
            <div className="table-cell">
              <p>{showTotal(props.dataGame, 1)}</p>
            </div>
            <div className="table-cell">
              <p>{showTotal(props.dataGame, 2)}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ScoreTab;
