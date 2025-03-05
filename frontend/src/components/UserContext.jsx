import { createContext, useEffect, useState } from "react";
import { isAuthenticated } from "../api/userApi";
import { useParams } from "react-router-dom";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  let { user } = isAuthenticated();

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserContext;
