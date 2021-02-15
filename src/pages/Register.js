import React, { useContext } from "react";
import { Redirect, useHistory } from "react-router-dom";
import CredentialsForm from "../components/CredentialsForm";
import FirebaseContext from "../components/context/FirebaseContext";
import styled from "styled-components";
import UserContext from "../components/context/UserContext";
import { toast } from "react-toastify";

const Register = ({ userName, setUserName, password, setPassword }) => {
  const history = useHistory();
  const firebase = useContext(FirebaseContext);
  const { user, setUser } = useContext(UserContext);

  const register = () => {
    const userRef = firebase.database().ref(`users/`);
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
          if (!data) {
            userRef.push({ userName, password });
          } else {
            toast.error("El usuario ya existe");
          }
        });
    }
  };

  const goToRegister = () => {
    history.push("/Login");
  };

  return (
    <StyledRegister>
      {user.userId && <Redirect to="/contacts" />}
      <div className="form-box">
        <h2>Registro de Usuario</h2>
        <CredentialsForm
          userName={userName}
          setUserName={setUserName}
          password={password}
          setPassword={setPassword}
          action={register}
          actionLabel="Registrar"
          secondaryAction={goToRegister}
          secondaryActionLabel="Regresa"
        ></CredentialsForm>
      </div>
    </StyledRegister>
  );
};

const StyledRegister = styled.div`
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

export default Register;
