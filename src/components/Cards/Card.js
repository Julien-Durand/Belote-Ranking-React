import React from "react";
import { Link } from "react-router-dom";
import "../../App.scss";
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
        
        <Link to={props.link} className={`btn ${props.btnStyle} ${props.btnColor} ${props.btnSize}`}>
        
        {props.textBtn}
        </Link>
      </div>
    </div>
  );
}

export default Card;
