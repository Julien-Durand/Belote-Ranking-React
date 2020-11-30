import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { FirebaseAppProvider, AuthCheck } from "reactfire";
import firebaseConfig from "./firebase/firebaseIndex";
//Style
import "./App.scss";

// Pages
import Home from "./pages/Home";
import Joueurs from "./pages/Joueurs";
import Signup from "./pages/auth/Signup";
import Signin from "./pages/auth/Signin";
import Belote from "./pages/Belote";
import Score from "./pages/Score";

//comp
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

const PublicRoutes = () => {
  return (
    <>
      <Route exact path="/signin" component={Signin} />
      <Route exact path="/signup" component={Signup} />
    </>
  );
};

const PrivateRoutes = () => {
  return (
    <>
      <Route exact path="/Joueurs" component={Joueurs} />
      <Route exact path="/Belote" component={Belote} />
      <Route exact path="/Score" component={Score} />
    </>
  );
};

const App = () => {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Router>
        <Switch>
          <Suspense
            fallback={
              <div className="wrapper">
                <div className="container">
                  <div className="row">
                    <h3 className="text-center load">Chargement...</h3>
                  </div>
                </div>
              </div>
            }
          >
            <Navbar />
            <Route exact path="/" component={Home} />
            <AuthCheck fallback={<PublicRoutes />}>
              {/* <PublicRoutes /> */}
              <PrivateRoutes />
            </AuthCheck>
            <Footer />
          </Suspense>
        </Switch>
      </Router>
    </FirebaseAppProvider>
  );
};

export default App;
