import { AuthContext } from "./AuthContext";
import { useState } from "react";

export function AuthContextProvider({children}){
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        roles: [],
        logged: false
    })

    return(
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}