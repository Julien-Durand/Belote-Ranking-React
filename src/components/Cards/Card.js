import React from "react";
import "../../App.scss";
import { Button } from "../Button/Button";
import "./Card.scss";

function Card(props) {
  return (
    <div className="card">
      <div className="card-header">
        <img src={props.src} alt={props.alt} className="image-center" />
      </div>
      <div className="card-body">
        <div className="row">
          <div className="text-center col-md-12">
            <h4 className="card-title">{props.title}</h4>
            <hr className={props.line} />
          </div>
        </div>
        <div className="row">
          <div className="card-desc text-center">{props.desc}</div>
        </div>
      </div>
      <div className="card-footer text-center">
        <Button
          buttonStyle={props.btnStyle}
          buttonColor={props.btnColor}
          buttonSize={props.btnSize}
          link={props.link}
        >
          {props.textBtn}
        </Button>
      </div>
    </div>
  );
}

export default Card;
