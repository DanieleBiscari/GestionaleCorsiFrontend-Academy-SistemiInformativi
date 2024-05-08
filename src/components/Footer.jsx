import React, { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { getLinksName } from "../services/navbar/getLinksName";
import { AuthContext } from "../contexts/AuthContext/AuthContext";

const Footer = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const linksName = getLinksName(user)

  return (
    <div className="bg-primary w-100 " data-bs-theme="dark" >
      <footer className="py-3 mt-4 w-50 mx-auto">
        <ul className="nav justify-content-center border-light border-bottom pb-3 mb-3">
          {linksName?.map((linkName, index) => (
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
          ))}
        </ul>
        <p className="text-center text-body-secondary">© 2024 Company, Inc</p>
      </footer>
    </div>
  );
};

export default Footer;
