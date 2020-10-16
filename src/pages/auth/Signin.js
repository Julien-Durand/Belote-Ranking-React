import React, { useContext } from "react";
import Footer from "../../components/Footer/Footer";
import { firebaseAuth } from "../../provider/AuthProvider";
import "./auth.scss";

const Signin = () => {
  const { handleSignin, inputs, setInputs, errors } = useContext(firebaseAuth);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handleSubmit");
    handleSignin();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(inputs);
    setInputs((prev) => ({ ...prev, [name]: value }));
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
                  value={inputs.email}
                />
                <input
                  onChange={handleChange}
                  name="password"
                  type="password"
                  placeholder="Mot de passe"
                  value={inputs.password}
                />
                <button className="btn btn__success btn__simple">
                  Connexion
                </button>
                {errors.length > 0
                  ? errors.map((error) => (
                      <p style={{ color: "red" }}>{error}</p>
                    ))
                  : null}

                <div className="textSignup">
                  Pas de compte ?  
                  <a
                    href="/signup"
                    className="btn btn__info btn__simple btn__small"
                  >
                    S'inscrire
                  </a>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Signin;
