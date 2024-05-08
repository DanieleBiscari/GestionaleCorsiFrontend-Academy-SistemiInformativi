import React, { useContext, useEffect } from "react";
import { useOutlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { findCookieJwt } from "../services/auth/findCookieJwt";
import { AuthContext } from "../contexts/AuthContext/AuthContext";

const Layout = () => {
  const outlet = useOutlet();
  const { setUser } = useContext(AuthContext);
  
  useEffect(() => {
    const data = findCookieJwt()
    if(data){
      setUser(data)
    }
  },[])

  return (
    <>
      <header>
        <Navbar />
      </header>

      <main className="py-4">{outlet}</main>

      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Layout;
