import React, { useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import { useContext } from "react";
import { CorsiContext } from "../contexts/CorsiContext/CorsiContext";
import { handleGetAllCorsi } from "../services/api/rest";
import Carousel from "../components/Carousel";
import { Link } from "react-router-dom";
import { motion, transform } from "framer-motion";

const Home = () => {
  const { user } = useContext(AuthContext);
  const { corsi, setCorsi } = useContext(CorsiContext);
  const corsi3 = [corsi[0], corsi[1], corsi[2]];

  const animationVariants = {
    hidden: {
      scale:0,
      opacity:0
    },
    visible:{
      scale:1,
      opacity:1,
      transition:{
        ease: "easeOut",
        type: "spring",
        duration: 0.8,
        bounce: .5
      }
    }
  }
  const animationVariants2 = {
    hidden: {
      x:500,
      opacity:0
    },
    visible:{
      x:0,
      opacity:1,
      transition:{
        ease: "easeOut",
        type: "spring",
        duration: 0.8,
        bounce: .5
      }
    }
  }
  const animationVariants3 = {
    hidden: {
      x:-500,
      opacity:0
    },
    visible:{
      x:0,
      opacity:1,
      transition:{
        ease: "easeOut",
        type: "spring",
        duration: 0.8,
        bounce: .5
      }
    }
  }
  const animationVariantsDelay = {
    hidden: {
      scale:0,
      opacity:0
    },
    visible:{
      scale:1,
      opacity:1,
      transition:{
        ease: "easeOut",
        type: "spring",
        duration: 0.8,
        bounce: .5,
        delay: 0.3,
      }
    }
  }
  const animationVariantsOpacity = {
    hidden: {
      opacity:0
    },
    visible:{
      opacity:1,
      transition:{
        ease: "easeInOut",
        duration: 1,
        delay: 0.5,
      }
    }
  }

  useEffect(() => {
    const ok = handleGetAllCorsi(setCorsi);
  }, []);


  return (
    <div className="container-fluid">
      <div className="text-center mb-5 ">
        {user?.logged && (
          <div >
            <h1>Benvenuto {user?.firstName}</h1>
            <p>dei nuovi corsi ti stanno aspettano</p>
          </div>
        )}

        {!user?.logged && !user?.roles?.includes("Admin") && (
          <motion.div variants={animationVariants} initial="hidden" animate="visible">
            <h1 >Benvenuto in Corsi Informativi</h1>
            <p className="fst-italic text-muted">
              la nuova frontiera per corsi di informatica, sempre aggiornata e
              mantenuta{" "}
            </p>
          </motion.div>
        )}
      </div>

      {!user?.logged && !user?.roles?.includes("Admin") && (
        <div className="container mb-5">
          <motion.div variants={animationVariants2} initial="hidden" animate="visible">
            <h1 className="text-center">
              Impara l'informatica e conquista il tuo futuro!
            </h1>
            <p className="mb-4">
              Sei pronto a dare una svolta alla tua carriera? Nel mondo di oggi,
              le competenze informatiche sono indispensabili per qualsiasi
              professione. Che tu voglia cambiare lavoro, ottenere una promozione
              o semplicemente ampliare le tue conoscenze, i nostri corsi di
              informatica sono la soluzione perfetta per te.
            </p>
          </motion.div>
          <motion.div variants={animationVariants3} initial="hidden" animate="visible">
            <h2>Cosa offriamo?</h2>
            <ul>
              <li>
                <b>Corsi per tutti i livelli</b>: Dai principianti agli esperti,
                abbiamo un corso adatto a te.
              </li>
              <li>
                <b>Ampia scelta di argomenti</b>: Programmazione, web design,
                sicurezza informatica, Microsoft Office e molto altro.
              </li>
              <li>
                <b>Comodità</b>: Scegli il corso che preferisci e seguilo
                direttamente da casa
              </li>
              <li>
                <b>Istruttori esperti</b>: I corsi offerti sono stati ideati da
                professionisti con una comprovata esperienza del settore
              </li>
            </ul>
          </motion.div>
          <motion.div variants={animationVariantsDelay} initial="hidden" animate="visible" className="text-center mt-4">
            <h2>Cosa aspetti?</h2>
            <p>
              Iscriviti subito a un corso di informatica e inizia a costruire il
              tuo futuro!
            </p>
          </motion.div>
        </div>
      )}

      <motion.div variants={animationVariantsOpacity} initial="hidden" animate="visible">
        <h1 initial={{scale: 0}} animate={{scale: 1}} className="text-center">Scopri i nuovi corsi disponibili</h1>
        <div className="d-flex justify-content-center my-3">
          <Link to={"/courses"}>
            <button className="btn btn-success mx-auto ">
              visualizza tutti i corsi
            </button>
          </Link>
        </div>
        <Carousel carouselContent={corsi3}></Carousel>
      </motion.div>
    </div>
  );
};

export default Home;
