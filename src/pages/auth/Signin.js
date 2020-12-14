import React, { useState } from "react";
import { useFirebaseApp } from "reactfire";
import { useHistory } from "react-router";
import "firebase/auth";
import "./auth.scss";
import { Link } from "react-router-dom";

const Signin = () => {
  
  
 
  // User State
  const [user, setUser] = useState({
    email: "",
    password: "",
    error: "",
  });

  // onChange function
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
      error: "",
    });
  };

  // Import firebase
  const firebase = useFirebaseApp();
  const history = useHistory();
  
  // Submit function (Log in user)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Log in code here.
    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        history.replace("/");
      })
      .catch((error) => {
        // Update the error
        setUser({
          ...user,
          error: error.message,
        });
      });
  };

  return (
    <>
      <div className="wrapper">
        <section className="section section-auth">
          <div className="container">
            <div className="row">
              <form onSubmit={handleSubmit}>
                <div className="title-header">
                  <h1>Welcome Back</h1>
                  <h5>Sign in !</h5>
                </div>
                <input
                  onChange={handleChange}
                  name="email"
                  placeholder="Email"
                />
                <input
                  onChange={handleChange}
                  name="password"
                  type="password"
                  placeholder="Mot de passe"
                />
                <button className="btn btn__success btn__simple" type="submit">
                  Connexion
                </button>
                {user.error && <p style={{ color: "red" }}>{user.error}</p>}
              
                <div className="textSignup">
                  Pas de encore de compte ?
                  <Link tp="/signup" className="btn btn__info btn__simple btn__small" >
                    S'inscrire
                  </Link>
                </div>
              </form>
              
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Signin;
