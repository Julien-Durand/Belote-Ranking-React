import React, { useState } from "react";
import { useFirebaseApp } from "reactfire";
import { useHistory } from "react-router";
import "firebase/auth";
import "./auth.scss";

const Signup = () => {
  const history = useHistory();

  //import firebase
  const firebase = useFirebaseApp();

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

  // Submit (Create account)
  const handleSubmit = async (e) => {
    e.preventDefault();
    await firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        history.replace("/");
        //Sign out user
        // firebase.auth().signOut();
      })
      .catch((error) => {
        console.log(error);
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
                  <h1>Créer un compte</h1>
                  <h5>Sign up !</h5>
                </div>
                <div className="text-intro">
                  Créer un compte pour toute ta team !
                </div>
                <input
                  onChange={handleChange}
                  name="email"
                  placeholder="email"
                />
                <input
                  onChange={handleChange}
                  name="password"
                  placeholder="Mot de passe (6 caractère min)"
                  type="password"
                />
                <button className="btn btn__success btn__simple" type="submit">
                  Créer son compte
                </button>
                {user.error && <p style={{ color: "red" }}>{user.error}</p>}
              </form>
              
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Signup;
