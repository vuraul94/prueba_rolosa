import React, { useContext } from "react";
import { Redirect, useHistory } from "react-router-dom";
import styled from "styled-components";
import FirebaseContext from "../components/context/FirebaseContext";
import UserContext from "../components/context/UserContext";
import CredentialsForm from "../components/CredentialsForm";
import { toast } from "react-toastify";

const Login = ({ userName, setUserName, password, setPassword }) => {
  const history = useHistory();
  const firebase = useContext(FirebaseContext);
  const { user, setUser } = useContext(UserContext);

  const login = () => {
    const userRef = firebase.database().ref("/users");
    if (!userName || userName.trim() === "") {
      toast.error("No ha ingresado el usuario");
    } else if (!password || password.trim() === "") {
      toast.error("No ha ingresado la contraseña");
    } else {
      userRef
        .orderByChild("userName")
        .equalTo(userName)
        .once("value", (snap) => {
          const data = snap.val();
          if (data) {
            const userId = Object.keys(data)[0];
            if (data[userId].password === password) {
              setUser({ userId: userId, userName });
              history.push("/contacts");
            } else {
              toast.error(
                "El usuario no se encuentra registrado o la contraseña es incorrecta"
              );
            }
          } else {
            toast.error(
              "El usuario no se encuentra registrado o la contraseña es incorrecta"
            );
          }
        });
    }
  };

  const goToRegister = () => {
    history.push("/Register");
  };

  return (
    <StyledLogin>
      {user.userId && <Redirect to="/contacts" />}
      <div className="form-box">
        <h2>Iniciar Sesión</h2>
        <CredentialsForm
          userName={userName}
          setUserName={setUserName}
          password={password}
          setPassword={setPassword}
          action={login}
          actionLabel="Acceder"
          secondaryAction={goToRegister}
          secondaryActionLabel="Registrar"
        ></CredentialsForm>
      </div>
    </StyledLogin>
  );
};

const StyledLogin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .form-box {
    background-color: #f3f3f3;
    border-radius: 1rem;
    padding: 2rem;
    margin-top: 4rem;
    width: 40%;
  }
`;

export default Login;
