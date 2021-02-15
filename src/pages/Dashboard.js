import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "../components/context/UserContext";
import ContactForm from "../components/ContactForm";
import styled from "styled-components";
import FirebaseContext from "../components/context/FirebaseContext";
import ContactsList from "../components/ContactsList";

const Dashboard = () => {
  const { user, setUser } = useContext(UserContext);
  const firebase = useContext(FirebaseContext);

  const [contacts, setContacts] = useState([]);

  const [selectedContact, setSelectedContact] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [province, setProvince] = useState("");
  const [gender, setGender] = useState("male");

  const contactRef = firebase.database().ref(`contacts/${user.userId}`);

  useEffect(() => {
    contactRef.on("value", (snap) => {
      const data = snap.val();
      setContacts(data);
      console.log(data);
    });
  }, []);

  const contact = {
    selectedContact,
    name,
    email,
    phone,
    age,
    province,
    gender,
  };

  const setsContact = {
    setName,
    setEmail,
    setPhone,
    setAge,
    setProvince,
    setGender,
  };

  const cleanForm = () => {
    setSelectedContact("");
    setName("");
    setEmail("");
    setPhone("");
    setAge("");
    setGender("male");
  };

  const create = () => {
    cleanForm();
    contactRef.push(contact);
  };

  const update = (id) => {
    contactRef.child(id).set(contact);
  };

  const remove = (id) => {
    cleanForm();
    contactRef.child(id).set(null);
  };

  const logOut = () => {
    setUser({ userId: null, userName: null });
  };

  return (
    <StyledDashboard>
      {!user.userId && <Redirect to="/" />}
      <header>
        <h2>Administración de Contactos</h2>
        <button onClick={logOut}>LogOut</button>
      </header>
      <div className="content">
        <div className="sidebar">
          <img src="http://lorempixel.com/300/200" />
          <div>
            <p>
              <strog>User:</strog>
              {user && user.userName}
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras elit
              purus, lobortis in lorem non, faucibus imperdiet urna.
            </p>
          </div>
        </div>
        <div className="main">
          <div className="contact-list">
            <ContactsList
              contacts={contacts}
              {...setsContact}
              setSelectedContact={setSelectedContact}
            />
          </div>
          <div className="contact-form">
            <ContactForm
              {...contact}
              {...setsContact}
              create={create}
              update={update}
              remove={remove}
            />
          </div>
        </div>
      </div>

      <footer>
        <h3>Prueba Técnica</h3>
      </footer>
    </StyledDashboard>
  );
};

const StyledDashboard = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  position: relative;
  align-items: center;
  min-height: 100vh;
  header,
  footer,
  .main,
  .sidebar,
  .contact-form,
  .contact-list {
    padding: 1rem;
    border: 0.1rem solid var(--mainColor);
    border-radius: 1rem;
    margin: 1%;
  }

  header,
  footer {
    display: flex;
    width: 94%;
    height: 4rem;
    padding: 1rem;
  }

  header {
    justify-content: space-between;
    align-items: center;
  }

  .content {
    display: flex;
    flex-direction: column;
    flex-grow: 100;
    padding-bottom: 8rem;
    width: 97%;
    @media (min-width: 768px) {
      flex-direction: row;
    }
    .main {
      display: flex;
      flex-wrap: wrap;
      flex-grow: 100;
      justify-content: space-between;
      margin-left: 0;
      flex-direction: column;
      @media (min-width: 768px) {
        flex-direction: row;
      }
      .contact-form {
        flex-direction: column;
        max-height: 80%;
        flex-grow: 100;
        padding: 2rem;
      }

      .contact-list {
        padding: 1rem;
        @media (min-width: 768px) {
          width: 36%;
          max-height: 80%;
        }
        ul {
          list-style: none;
          padding: 0;
          max-height: 20rem;
          overflow-y: scroll;
          @media (min-width: 768px) {
            min-height: 80%;
          }
          li {
            padding: 1rem;
            cursor: pointer;
            :nth-child(odd) {
              background-color: #ccc;
            }
            :nth-child(odd) {
              background-color: #dcdcdc;
            }
          }
        }
      }
    }
    .sidebar {
      display: flex;
      padding-bottom: 6rem;
      @media (min-width: 768px) {
        width: 20%;
        flex-direction: column;
      }
      img{
        margin: 1rem;
      }
    }
  }

  footer {
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0;
  }
`;

export default Dashboard;
