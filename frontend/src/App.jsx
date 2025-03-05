import { createContext, useState } from "react";
import "./App.css";
import MyRoutes from "./MyRoutes";
import { MyContextProvider } from "./components/MyContext";
import { UserContextProvider } from "./components/UserContext";

export const MyThemeContext = createContext();

function App() {
  let [theme, setTheme] = useState("light");
  return (
    <>
      <button
        className={`fixed top-28 right-10 theme-btn${
          theme === "light" ? "" : "-dark"
        }`}
        onClick={() => {
          theme === "light" ? setTheme("dark") : setTheme("light");
        }}
      >
        {theme}
      </button>
      <MyThemeContext.Provider value={theme}>
        <UserContextProvider>
          <MyContextProvider>
            <MyRoutes />
          </MyContextProvider>
        </UserContextProvider>
      </MyThemeContext.Provider>
    </>
  );
}

export default App;
