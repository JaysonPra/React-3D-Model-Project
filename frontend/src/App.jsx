import { createContext, useState } from "react";
import "./App.css";
import MyRoutes from "./MyRoutes";
import { MyContextProvider } from "./components/MyContext";
import { UserContextProvider } from "./components/UserContext";
import counterReducer from "./redux/counterReducer";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import gameReducer from "./redux/gameReducer";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { PersistGate } from "redux-persist/integration/react";
import cart_reducer from "./redux/cartReducer";

export const MyThemeContext = createContext();

function App() {
  const rootReducer = combineReducers({
    counterStore: counterReducer,
    gameStore: gameReducer,
    cartStore: cart_reducer,
  });

  const persistConfig = {
    key: "root",
    storage,
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore(persistedReducer);
  let persistor = persistStore(store);

  return (
    <>
      <UserContextProvider>
        <MyContextProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <MyRoutes />
            </PersistGate>
          </Provider>
        </MyContextProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
