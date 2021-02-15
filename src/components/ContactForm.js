import React from "react";
import { toast } from "react-toastify";

const ContactForm = ({
  selectedContact,
  name,
  email,
  phone,
  age,
  province,
  gender,
  setName,
  setEmail,
  setPhone,
  setAge,
  setProvince,
  setGender,
  create,
  update,
  remove,
}) => {
  const handleCreate = (e) => {
    e.preventDefault();
    console.log(name);
    if (name.trim() !== "") {
      create();
      toast.success("Creado con exito")
    } else {
      toast.error("El nombre es obligatorio");
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (selectedContact && selectedContact.trim() !== "") {
      update(selectedContact);
      toast.success("Modificado con éxito");
    } else {
      toast.error("No ha seleccionado ningun contacto aún");
    }
  };

  const handleRemove = (e) => {
    e.preventDefault();
    if (selectedContact && selectedContact.trim() !== "") {
      remove(selectedContact);
      toast.warn("Eliminado con éxito");
    } else {
      toast.error("No ha seleccionado ningun contacto aún");
    }
  };
  return (
    <>
      <form action="">
        <input
          type="text"
          placeholder="Nombre"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          name="email"
          placeholder="Correo Eléctronico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Telefono"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="number"
          placeholder="Edad"
          name="age"
          min={1}
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <select
          name="provicia"
          name="province"
          onChange={(e) => setProvince(e.target.value)}
          value={province}
        >
          <option value="">Provincia</option>
          <option value="San José">San José</option>
          <option value="Alajuela">Alajuela</option>
          <option value="Cartago">Cartago</option>
          <option value="Heredia">Heredia</option>
          <option value="Guanacaste">Guanacaste</option>
          <option value="Puntarenas">Puntarenas</option>
          <option value="Limón">Limón</option>
        </select>
        <div>
          <label htmlFor="gender">Genero: </label>
          <input
            type="radio"
            id="male"
            name="gender"
            value="male"
            onChange={(e) => setGender(e.target.value)}
            checked={gender === "male"}
          />
          <label htmlFor="male">Mas</label>
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            onChange={(e) => setGender(e.target.value)}
            checked={gender === "female"}
          />
          <label htmlFor="female">Fem</label>
        </div>
        <div>
          <button onClick={handleCreate}>Agregar</button>
          <button onClick={handleUpdate}>Modificar</button>
          <button onClick={handleRemove}>Eliminar</button>
        </div>
      </form>
    </>
  );
};

export default ContactForm;
