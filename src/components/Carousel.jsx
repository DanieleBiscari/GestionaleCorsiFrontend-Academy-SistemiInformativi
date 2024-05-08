import React from "react";
import { randomFromArray } from "../utils/randomFromArray";
import bg1 from "../assets/img/bg1.jpg";
import bg2 from "../assets/img/bg2.jpg";
import bg3 from "../assets/img/bg3.jpg";
import bg4 from "../assets/img/bg4.jpg";

const Carousel = ({ carouselContent }) => {
  const ArrayOfBackground = [bg1, bg2, bg3, bg4];

  return (
    <div
      id="carousel"
      className="carousel slide carousel-fade container-lg "
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        {carouselContent.map((element, index) => {
          return index === 0 ? (
            <button
              key={index}
              className="active"
              type="button"
              data-bs-target="#carousel"
              data-bs-slide-to={`${index}`}
              aria-current="true"
              aria-label={`Slide ${index}`}
            />
          ) : (
            <button
              key={index}
              type="button"
              data-bs-target="#carousel"
              data-bs-slide-to={index}
              aria-label={`Slide ${index}`}
            />
          );
        })}
      </div>

      <div className="carousel-inner">
        {carouselContent.map((element, index) => {
          return index === 0 ? (
            <div className="carousel-item active" key={index}>
              <div>
                <img
                  src={randomFromArray(ArrayOfBackground)}
                  style={{
                    height: "40vw",
                    maxHeight: "40rem",
                    objectFit: "cover",
                  }}
                  className="d-block w-100"
                  alt="Immagine randomica come background"
                />
              </div>
              <div className="carousel-caption z-1 text-shadow">
                <h5>{element?.nomeCorso}</h5>
                <p>{element?.descrizioneBreve}</p>
              </div>
              <div className="w-100 h-100 bg-primary opacity-25 position-absolute left-0 top-0 z-0"></div>
            </div>
          ) : (
            <div className="carousel-item" key={index}>
              <img
                src={randomFromArray(ArrayOfBackground)}
                style={{
                  height: "40vw",
                  maxHeight: "40rem",
                  objectFit: "cover",
                }}
                className="w-100 overlayGray"
                alt="Immagine randomica come background"
              />
              <div className="carousel-caption z-1 text-shadow">
                <h5>{element?.nomeCorso}</h5>
                <p>{element?.descrizioneBreve}</p>
              </div>
              <div className="w-100 h-100 bg-primary opacity-25 position-absolute left-0 top-0 z-0"></div>
            </div>
          );
        })}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
