import React from "react";

const ContactsList = ({
  contacts,
  setSelectedContact,
  setName,
  setEmail,
  setPhone,
  setAge,
  setProvince,
  setGender,
}) => {
  const handleContactSelect = (contact) => {
    const { key, name, email, phone, age, province, gender } = contact;
    setSelectedContact(key);
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAge(age);
    setProvince(province);
    setGender(gender);
  };
  return (
    <>
      <h3>Contactos</h3>
      <ul>
        {Object.keys(contacts).map((key) => {
          return (
            <li
              key={key}
              onClick={() => handleContactSelect({ key, ...contacts[key] })}
            >
              {contacts[key].name}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ContactsList;
