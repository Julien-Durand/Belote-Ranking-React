import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h1 className="title">
              BLR <i className="fas fa-trophy"></i>
            </h1>
          </div>
          <div className="col-md-4">
            <ul className="nav">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Accueil
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Joueurs
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Commencer une partie
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Scores
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
              <h3 className="title">Me suivre :</h3>
              <a href="https://github.com/Julien-Durand" target="_bank" className="git-icon"><i class="fab fa-github"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
