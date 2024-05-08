import React, { useContext, useEffect } from "react";
import Card from "./Card";
import { randomFromArray } from "../utils/randomFromArray";
import bg1 from "../assets/img/bg1.jpg";
import bg2 from "../assets/img/bg2.jpg";
import bg3 from "../assets/img/bg3.jpg";
import bg4 from "../assets/img/bg4.jpg";
import { handleGetAllCorsi } from "../services/api/rest";
import { CorsiContext } from "../contexts/CorsiContext/CorsiContext";
import { motion } from "framer-motion";

const CardLists = () => {
  const ArrayOfBackground = [bg1, bg2, bg3, bg4];
  const { corsi, setCorsi } = useContext(CorsiContext);

  useEffect(() => {
    const ok = handleGetAllCorsi(setCorsi);
  }, []);

  return (
    <div className="d-flex justify-content-center justify-content-lg-start gap-4 flex-wrap">
      {corsi?.map((corso, index) => {
        return (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              transition: {
                ease: "linear",
                type: "spring",
                duration: 0.5,
                delay: (index/index)/10 
              },
            }}
            key={index}
          >
            <Card
              bgImg={randomFromArray(ArrayOfBackground)}
              title={corso.nomeCorso}
              shortDescription={corso.descrizioneBreve}
              longDescription={corso.descrizioneCompleta}
              duration={corso.durata}
            ></Card>
          </motion.div>
        );
      })}
    </div>
  );
};

export default CardLists;
