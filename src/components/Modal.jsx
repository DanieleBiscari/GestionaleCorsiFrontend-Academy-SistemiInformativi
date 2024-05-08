import React from "react";

const Modal = ({ title, bodyText, closeText, setShowModal }) => {
  return (
    <div className="myModal" tabIndex={-1}>
      <div className="my-modal-header">
        <h5 className="my-modal-title">{title}</h5>
        <button
          onClick={() => {
            setShowModal(false);
          }}
          type="button"
          className="btn-close"
          aria-label="Close"
        />
      </div>

      <div className="my-modal-body d-flex flex-column">
        <p className="mb-0">{bodyText} </p>
        <i className="bi bi-check fs-1 text-success "></i>
      </div>

      <div className="my-modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            setShowModal(false);
          }}
        >
          {closeText}
        </button>
      </div>
    </div>
  );
};

export default Modal;
