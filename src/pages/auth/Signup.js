import React, { useContext } from "react";
import { firebaseAuth } from "../../provider/AuthProvider";
import { withRouter } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import "./auth.scss";

const Signup = (props) => {
  const { handleSignup, inputs, setInputs, errors } = useContext(firebaseAuth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit");
    //wait to signup
    await handleSignup();
    //push home
    props.history.push("/");
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
                  value={inputs.email}
                />
                <input
                  onChange={handleChange}
                  name="password"
                  placeholder="Mot de passe (6 caractère min)"
                  type="password"
                  value={inputs.password}
                />
                <button className="btn btn__success btn__simple">
                  Créer son compte
                </button>
                {errors.length > 0
                  ? errors.map((error) => <p style={{ color: "red" }}>{error}</p>)
                  : null}
              </form>
            </div>
          </div>
        </section>
        </div>
      <Footer />
    </>
  );
};

export default withRouter(Signup);
