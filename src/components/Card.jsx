import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CorsiContext } from "../contexts/CorsiContext/CorsiContext";

const Card = (props) => {
  const {setCorso} = useContext(CorsiContext)

  function handleClick(){
    const corsoClicked = {...props}
    setCorso(corsoClicked)
  }

  return (
    <div className="card">
      <div
        style={{ background: `url(${props.bgImg})` }}
        className="card-body d-flex justify-content-center align-items-center  text-center"
      >
        <div className="position-relative z-1">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.shortDescription}</p>
          <p className="card-text">
            durata del corso: <b>{props.duration} mesi</b>
          </p>
          <Link onClick={handleClick} to={`/courses/course`}>
            <button className="btn btn-primary mt-4">Scopri di più</button>
          </Link>
        </div>

        <div className="card-body-overlay z-0"></div>
      </div>
    </div>
  );
};

export default Card;
