import { createContext } from "react";

const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  return (
    <MyContext.Provider value={"Good Morning"}>{children}</MyContext.Provider>
  );
};

export default MyContext;
