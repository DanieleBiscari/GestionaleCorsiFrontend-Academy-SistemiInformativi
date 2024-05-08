import React, { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import { getLinksName } from "../services/navbar/getLinksName";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const linksName = getLinksName(user)

  return (
    <nav
      className="w-100 navbar navbar-expand-lg bg-primary"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <span className="navbar-brand">Logo</span>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav justify-content-between w-100">
            <ul className="navbar-nav mb-2 mb-lg-0 gap-3">
              {linksName?.map((linkName, index) => {
                return user?.roles?.includes("Admin") && linkName.admin ? (
                  <li className="nav-item" key={index}>
                    <NavLink
                      className={
                        "nav-link" +
                        (location.pathname === linkName.to
                          ? " text-decoration-underline"
                          : "")
                      }
                      to={linkName.to}
                    >
                      {linkName.nome}
                    </NavLink>
                  </li>
                ) : !linkName.admin ? (
                  <li className="nav-item" key={index}>
                    <NavLink
                      className={
                        "nav-link" +
                        (location.pathname === linkName.to
                          ? " text-decoration-underline"
                          : "")
                      }
                      to={linkName.to}
                    >
                      {linkName.nome}
                    </NavLink>
                  </li>
                ) : (
                  <div className="hidden" key={index}></div>
                );
              })}
            </ul>

            {!user?.logged ? (
              <ul className="navbar-nav mb-2 mb-lg-0 gap-3">
                <li className="nav-item">
                  <NavLink
                    className={
                      "nav-link" +
                      (location.pathname === "/login"
                        ? " text-decoration-underline"
                        : "")
                    }
                    to={"/login"}
                  >
                    Accedi/Registrati
                  </NavLink>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav mb-2 mb-lg-0 gap-3">
                <li className="nav-item d-flex justify-content-center align-items-center ">
                  {window.innerWidth > 992 ? (
                    <NavLink to={"/profile"}>
                      <i className="text-white bi bi-person-circle fs-2"></i>
                    </NavLink>
                  ) : (
                    <NavLink
                      className={
                        "nav-link w-100" +
                        (location.pathname === "/profile"
                          ? " text-decoration-underline"
                          : "")
                      }
                      to={"/profile"}
                    >
                      Profilo
                    </NavLink>
                  )}
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
