import { createContext, useState } from "react";

export let ContextApi = createContext();

const CustomContextProvider = ({ children }) => {
  let [cart, setCart] = useState([]);
  return (
    <ContextApi.Provider value={{ cart, setCart }}>
      {children}
    </ContextApi.Provider>
  );
};

export default CustomContextProvider;
