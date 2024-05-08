import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { handleLogin } from "../services/api/rest";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import { validateLoginField } from "../services/auth/validateLoginField";

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const [ isInvalid, setIsInvalid ] = useState(false);
  const navigateTo = useNavigate();

  const [authUser, setAuthUser] = useState({
    email: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const isValidate = validateLoginField(authUser);

    if(!isValidate){
      setIsInvalid(true)
      return
    }

    const ok = await handleLogin(authUser, setUser);
    if (ok) {
      setAuthUser({
        email: "",
        password: "",
      });
      navigateTo("/");
      return
    }

    setIsInvalid(true)
  }

  function handleInputChange(e) {
    const { id, value } = e.target;
    const newObj = { ...authUser, [id]: value };
    setAuthUser(newObj);
  }

  return (
    <div className="flexCentered pb-5 ">
      <div className="loginContainer container-fluid d-flex flex-column align-items-center gap-2 justify-content-center rounded-2 ">
        <h1>Accedi</h1>

        <form
          onSubmit={handleSubmit}
          className="loginForm d-flex flex-column justify-content-center align-items-center gap-4"
        >
          <div className="w-100 d-flex flex-column gap-3">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                value={authUser.email}
                onChange={handleInputChange}
                className={"form-control " + (isInvalid ? "is-invalid" : "")}
                id="email"
                aria-describedby="inserisci la tua email"
                placeholder="Inserisci email"
              />
              <div id="email" className="invalid-feedback">
                Password o Email non validi
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                value={authUser.password}
                onChange={handleInputChange}
                className={"form-control " + (isInvalid ? "is-invalid" : "")}
                id="password"
                aria-describedby="inserisci la tua password"
                placeholder="Password"
              />
              <div id="password"  className="invalid-feedback">
                Password o Email non validi
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100 ">
            Login
          </button>
        </form>

        <div>
          oppure{" "}
          <span className="linkAuth">
            <NavLink to={"/signin"}>Registrati</NavLink>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
