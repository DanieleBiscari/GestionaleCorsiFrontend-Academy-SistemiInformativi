import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { validateSigninField } from "../services/auth/validateSigninField";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import { handleSignin } from "../services/api/rest";

const Signin = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigateTo = useNavigate();
  const [validationObj, setValidationObj] = useState({
    nome: true,
    cognome: true,
    email: true,
    emailValid: true,
    password: true,
    passwordRepeat: true,
  });

  const [authUser, setAuthUser] = useState({
    nome: "",
    cognome: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const validateObj = validateSigninField(authUser);
    if (Object.values(validateObj).some((value) => value === false)) {
      setValidationObj(validateObj);
      return;
    }

    const ok = await handleSignin(authUser, setUser);
    if (ok) {
      setAuthUser({
        nome: "",
        cognome: "",
        email: "",
        password: "",
        passwordRepeat: "",
      });

      if(user?.roles?.includes("Admin")){
        navigateTo("/admin")
        return
      }
      navigateTo("/login");
      return;
    }

    const newObj = { ...validateObj, emailValid: false };
    setValidationObj(newObj);
  }

  function handleInputChange(e) {
    const { id, value } = e.target;
    const newObj = { ...authUser, [id]: value };
    setAuthUser(newObj);
  }

  return (
    <div className="flexCentered pb-5 ">
      <div className="loginContainer container-fluid d-flex flex-column align-items-center gap-2 justify-content-center rounded-2 ">
        {/* <h1>Registrati</h1> */}
        {user.roles.includes("Admin") ? (
          <h1>Nuovo Utente</h1>
        ) : (
          <h1>Registrati</h1>
        )}
        <form
          onSubmit={handleSubmit}
          className="loginForm d-flex flex-column justify-content-center align-items-center gap-5"
        >
          <div className="w-100">
            <div className="d-flex gap-3 mb-4">
              <div className="form-group">
                <label htmlFor="nome">Nome</label>
                <input
                  type="text"
                  onChange={handleInputChange}
                  value={authUser.nome}
                  className={
                    "form-control " + (validationObj.nome ? "" : "is-invalid")
                  }
                  id="nome"
                  aria-describedby="inserisci il tuo nome"
                  placeholder="es. Mario"
                />
                <div id="nome" className="invalid-feedback">
                  Inserisci un nome dai 6 ai 20 caratteri
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="cognome">Cognome</label>
                <input
                  type="text"
                  onChange={handleInputChange}
                  value={authUser.cognome}
                  className={
                    "form-control " +
                    (validationObj.cognome ? "" : "is-invalid")
                  }
                  id="cognome"
                  aria-describedby="inserisci il tuo cognome"
                  placeholder="es. Rossi"
                />
                <div id="cognome" className="invalid-feedback">
                  Inserisci un cognome dai 6 ai 20 caratteri
                </div>
              </div>
            </div>

            <div className="form-group mb-4">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                onChange={handleInputChange}
                value={authUser.email}
                className={
                  "form-control " +
                  (validationObj.email && validationObj.emailValid
                    ? ""
                    : "is-invalid")
                }
                id="email"
                aria-describedby="inserisci la tua email"
                placeholder="Inserisci email"
              />
              <div id="email" className="invalid-feedback">
                {validationObj.emailValid ? "" : "email già registrata"}
                {validationObj.email ? "" : "inserisci una email valida"}
              </div>
            </div>

            <div className="form-group mb-2">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                onChange={handleInputChange}
                value={authUser.password}
                className={
                  "form-control " + (validationObj.password ? "" : "is-invalid")
                }
                id="password"
                aria-describedby="inserisci la tua password"
                placeholder="Password"
              />
              <div id="password" className="invalid-feedback">
                La tua password deve contenere una lettera maiuscola, una
                minuscola, un carattere speciale e deve essere lunga dai 6-20
                caratteri
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="passwordRepeat">Ripeti Password</label>
              <input
                type="password"
                onChange={handleInputChange}
                value={authUser.passwordRepeat}
                className={
                  "form-control " +
                  (validationObj.passwordRepeat ? "" : "is-invalid")
                }
                id="passwordRepeat"
                aria-describedby="inserisci la tua password"
                placeholder="Password"
              />
              <div id="passwordRepeat" className="invalid-feedback">
                Le password non coincidono
              </div>
            </div>
          </div>

          {user.roles.includes("Admin") ? (
            <button type="submit" className="btn btn-primary w-100 ">
              Aggiungi al Database
            </button>
          ) : (
            <button type="submit" className="btn btn-primary w-100 ">
              Registrati
            </button>
          )}
        </form>

        {user.roles.includes("Admin") ? (
          <></>
        ) : (
          <div className="text-center lh-base  ">
            sei già registrato? <br /> effettua il{" "}
            <span className="linkAuth">
              <NavLink to={"/login"}> Login</NavLink>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signin;
