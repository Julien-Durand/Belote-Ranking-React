import React, { useEffect, useState } from "react";
import { useFirebaseApp, useUser } from "reactfire";
import "../App.scss";
import Team from "../components/Game/Team/Team";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Manches from "../components/Game/Manches/Manches";

function Belote() {
  //user
  const user = useUser();
  //import firebase
  const db = useFirebaseApp().firestore();

  //check if team is add in firebase
  const [checkTeam, setCheckTeam] = useState(false);

  //import team data
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const check = db
      .collection("Users")
      .doc(user.uid)
      .collection("Play")
      .doc("Info")
      .onSnapshot((doc) => {
        if (doc.exists) {
          setCheckTeam(doc.data().isOk);
        }
      });
    return () => check();
  }, [db, user]);

  useEffect(() => {
    if (checkTeam) {
      db.collection("Users")
        .doc(user.uid)
        .collection("Play")
        .doc("Teams")
        .get()
        .then((doc) => {
          if (doc.exists) {
            setTeam(doc.data().team);
          }
        });
    }
  }, [db, user, checkTeam]);

  //create tab zone
  const nbTab = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [tabIndex, setTabIndex] = useState({
    selectedIndex: 0,
  });

  const handleSelect = (index) => {
    setTabIndex({ selectedIndex: index });
  };

  const handleButtonClick = (e) => {
    setTabIndex({ selectedIndex: e });
  };

  return (
    <>
      <section className="section section-game">
        <div className="container">
          {!checkTeam && <Team />}
          {checkTeam && (
            <Tabs
              selectedIndex={tabIndex.selectedIndex}
              onSelect={handleSelect}
            >
              <div className="tab row">
                <TabList>
                  {nbTab.map((v, i) => {
                    return (
                      <Tab key={i}>
                        <span>{v}</span>
                      </Tab>
                    );
                  })}
                </TabList>
                <div className="line"></div>
              </div>

              <div className="manche row">
                {nbTab.map((value, index) => {
                  return (
                    <TabPanel key={index}>
                      <Manches
                        teams={team}
                        manche={value}
                        onClick={handleButtonClick}
                        onSelect={handleSelect}
                      />
                    </TabPanel>
                  );
                })}
              </div>
            </Tabs>
          )}
        </div>
      </section>
    </>
  );
}

export default Belote;
