import React, { createContext } from "react";

const UserContext = createContext({
  user: { userId: null, userName: null },
  setUser: null,
});

export default UserContext;
