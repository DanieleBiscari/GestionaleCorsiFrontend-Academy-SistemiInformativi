import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode";

export function findCookieJwt(){
    const jwt  = Cookies.get("jwt")
    if(jwt){
        const tokenDecoded = jwtDecode(jwt);
        const { nome, cognome, email, ruoli } = tokenDecoded;
        const userToSee = {
            firstName: nome,
            lastName: cognome,
            email: email,
            roles: ruoli,
            logged: true,
          };
          return userToSee
    }

    return false
}