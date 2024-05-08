import { useState } from "react";
import { UtentiContext } from "./UtentiContext";

export function UtentiContextProvider({ children }) {
  const [utenti, setUtenti] = useState([]);
  return (
    <UtentiContext.Provider value={{ utenti, setUtenti }}>
      {children}
    </UtentiContext.Provider>
  );
}
