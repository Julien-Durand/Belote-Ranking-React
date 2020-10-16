import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Style
import "./App.scss";

//Nav
import Navbar from "./components/Navbar/Navbar";

// Pages
import Home from "./pages/Home";
import Joueurs from "./pages/Joueurs";
import Signup from "./pages/auth/Signup";
import Signin from "./pages/auth/Signin";
import Belote from "./pages/Belote";
import Score from "./pages/Score";
import { firebaseAuth } from "./provider/AuthProvider";

function App() {
  const { token } = useContext(firebaseAuth);
  console.log(token);

  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route
            exact
            path="/Joueurs"
            render={(rProps) => (token === null ? <Signin /> : <Joueurs />)}
          />
          <Route
            exact
            path="/Belote"
            render={(rProps) => (token === null ? <Signin /> : <Belote />)}
          />
          <Route
            exact
            path="/Score"
            render={(rProps) => (token === null ? <Signin /> : <Score />)}
          />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/" component={Home} />
          <Route exact path="/Joueurs" component={Joueurs} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
