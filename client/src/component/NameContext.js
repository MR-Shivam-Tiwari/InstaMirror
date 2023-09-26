// Create a context file (NameContext.js)
import React, { createContext, useContext, useState } from "react";

const NameContext = createContext();

export function useName() {
  return useContext(NameContext);
}

export function NameProvider({ children }) {
  const [name, setName] = useState("");

  return (
    <NameContext.Provider value={{ name, setName }}>
      {children}
    </NameContext.Provider>
  );
}
