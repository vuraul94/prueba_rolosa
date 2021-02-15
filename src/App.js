import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { useEffect, useState } from "react";
import "normalize.css";
import "./App.scss";
import FirebaseContext from "./components/context/FirebaseContext";
import UserContext from "./components/context/UserContext";
import firebase from "./config/firebase";
import { setLocalStorage, getLocalStorage } from "./utils/LocalStorage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();

  const initialUser = {
    userId: getLocalStorage("userId"),
    userName: getLocalStorage("userName"),
  };
  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    if (user) {
      setLocalStorage("userId", user.userId);
      setLocalStorage("userName", user.userName);
    }
  }, [user]);

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <FirebaseContext.Provider value={{ database: firebase.database }}>
          <ToastContainer />
          <Router>
            <div>
              <Switch>
                <Route
                  path="/Register"
                  render={() => (
                    <Register
                      userName={userName}
                      setUserName={setUserName}
                      password={password}
                      setPassword={setPassword}
                    ></Register>
                  )}
                />
                <Route
                  path="/contacts"
                  render={() => <Dashboard></Dashboard>}
                />
                <Route
                  path="/"
                  render={() => (
                    <Login
                      userName={userName}
                      setUserName={setUserName}
                      password={password}
                      setPassword={setPassword}
                    ></Login>
                  )}
                />
              </Switch>
            </div>
          </Router>
        </FirebaseContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
