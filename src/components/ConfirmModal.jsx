import React from "react";

const ConfirmModal = ({ title, bodyText, closeText, confirmText, setShowModal, confirmEffect }) => {
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
      </div>

      <div className="my-modal-footer">
        <button
          type="button"
          className="btn btn-danger me-3 "
          onClick={() => {
            confirmEffect()
            setShowModal(false);
          }}
        >
          {confirmText}
        </button>
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

export default ConfirmModal;
