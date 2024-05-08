import { useState } from "react";
import { CorsiContext } from "./CorsiContext";

export function CorsiContextProvider({ children }) {
  const [corsi, setCorsi] = useState([]);
  const [corso, setCorso] = useState({
    title: "",
    shortDescription: "",
    longDescription: "",
    duration: "",
  })
  return (
    <CorsiContext.Provider value={{ corsi, setCorsi, corso, setCorso }}>
      {children}
    </CorsiContext.Provider>
  );
}
