import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

// * API Login Utente (POST)
export async function handleLogin(authUser, setUser) {
  try {
    const response = await fetch("http://localhost:8080/api/utente/login", {
      method: "POST",
      body: JSON.stringify(authUser),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    const tokenDecoded = jwtDecode(data.token);
    const { nome, cognome, email, ruoli } = tokenDecoded;

    if (response.ok) {
      const userToSee = {
        firstName: nome,
        lastName: cognome,
        email: email,
        roles: ruoli,
        logged: true,
      };
      Cookies.set("jwt", data.token, { expires: new Date(data.ttl) });
      setUser(userToSee);
    }
    return response.ok;
  } catch (error) {
    return false;
  }
}

// * API Registrazione Utente (POST)
export async function handleSignin(authUser) {
  try {
    const response = await fetch(
      "http://localhost:8080/api/utente/registrazione",
      {
        method: "POST",
        body: JSON.stringify(authUser),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.ok;
  } catch (error) {
    return false;
  }
}

// * API per prelevare tutti gli utenti (GET)
export async function handleGetAllUtenti(setUtenti) {
  const jwt = Cookies.get("jwt");
  const response = fetch("http://localhost:8080/api/utente/getUtenti", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + jwt,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      setUtenti(data);
    })
    .catch((err) => {
    });

  return response.ok;
}

// * API per prelevare tutti i corsi (GET)
export async function handleGetAllCorsi(setCorsi) {
  try {
    const response = await fetch("http://localhost:8080/api/corso/getCorsi", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setCorsi(data);
    return response.ok;
  } catch (error) {
    return false;
  }
}

// * API per eliminare un utente tramite l'email (DELETE)
export async function handleDelete(user) {
  try {
    const emailJson = { email: user.email }
    // const jwt = Cookies.get("jwt");

    const response = await fetch("http://localhost:8080/api/utente/elimina", {
      method: "DELETE",
      body: JSON.stringify(emailJson),
      headers: {
        "Content-Type": "application/json",
      },
    });

    Cookies.remove("jwt")
    return response.ok;
  } catch (error) {
    return false
  }
}

export async function handleDeleteAdmin(user) {
  try {
    const emailJson = { email: user.email }
    // const jwt = Cookies.get("jwt");

    const response = await fetch("http://localhost:8080/api/utente/elimina", {
      method: "DELETE",
      body: JSON.stringify(emailJson),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.ok;
  } catch (error) {
    return false
  }
}


// * API per creare un corso (POST)
export async function handleCreateCourse(corso, corsi, setCorsi){
  try {
    const response = await fetch("http://localhost:8080/api/corso/create", {
      method: "POST",
      body: JSON.stringify(corso),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const newCorsi = [...corsi, corso]
    setCorsi(newCorsi);
    return response.ok;
  } catch (error) {
    return false;
  }
}


// * API per modificare un utente (PUT) 
export async function handleUpdateUser(user){
  const {ruoli} = user
  const idRuoli = [];

  ruoli.forEach((ruolo) => {
    if(ruolo.tipologia === "Admin"){
      idRuoli.push(1)
    }
    if(ruolo.tipologia === "Docente"){
      idRuoli.push(2)
    }
  })

  const userToUpdate = {...user, idRuoli}

  try {
    const response = await fetch("http://localhost:8080/api/utente/aggiorna", {
      method: "PUT",
      body: JSON.stringify(userToUpdate),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.ok;
  } catch (error) {
    return false;
  }
}