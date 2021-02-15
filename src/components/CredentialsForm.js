import React from "react";

const CredentialsForm = ({
  userName,
  setUserName,
  password,
  setPassword,
  action,
  actionLabel,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const handleAction = (e) => {
    e.preventDefault();
    action();
  };

  const handleSecondaryAction = (e) => {
    e.preventDefault();
    secondaryAction();
  };

  return (
    <>
      <form onSubmit={handleAction}>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Usuario"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div className="action-btns">
          <input type="submit" value={actionLabel} />
          <input
            type="button"
            onClick={handleSecondaryAction}
            value={secondaryActionLabel}
          />
        </div>
      </form>
    </>
  );
};

export default CredentialsForm;
