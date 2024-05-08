import React from "react";

const UpdateModal = ({
  title,
  confirmText,
  closeText,
  setShowModal,
  confirmEffect,
  user,
  validationObj,
  setClickedUser,
}) => {
  function handleInputChange(e) {
    const { id, value, type, checked } = e.target;

    if (type === "checkbox") {
      let newObj;
      if (checked) {
        newObj = { ...user };
        newObj.ruoli.push({ tipologia: id });
      } else {
        const newArr = user?.ruoli?.filter((ruolo) => ruolo.tipologia != id);
        newObj = {...user, ruoli: newArr}
      }
      setClickedUser(newObj)
      return;
    }

    const newObj = { ...user, [id]: value };
    setClickedUser(newObj);
  }

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
        <form onSubmit={confirmEffect}>
          <div className="form-group my-3">
            <div className="d-flex flex-column gap-2">
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                onChange={handleInputChange}
                value={user.nome}
                className={
                  "form-control " + (validationObj.nome ? "" : "is-invalid")
                }
                id="nome"
                aria-describedby="inserisci il tuo nome"
                placeholder="es. Mario"
              />
              <div id="nome" className="invalid-feedback">
                Inserisci un nome dai 6 ai 20 caratteri
              </div>
              <label htmlFor="cognome">cognome</label>
              <input
                type="text"
                onChange={handleInputChange}
                value={user.cognome}
                className={
                  "form-control " + (validationObj.cognome ? "" : "is-invalid")
                }
                id="cognome"
                aria-describedby="inserisci il tuo cognome"
                placeholder="es. Mario"
              />
              <div id="cognome" className="invalid-feedback">
                Inserisci un cognome dai 6 ai 20 caratteri
              </div>
              <label htmlFor="email">email</label>
              <input
                type="text"
                onChange={handleInputChange}
                value={user.email}
                className={
                  "form-control " + (validationObj.email ? "" : "is-invalid")
                }
                id="email"
                aria-describedby="inserisci il tuo email"
                placeholder="es. Mario"
              />
              <div id="email" className="invalid-feedback">
                Inserisci un email valida
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-center gap-3  mb-5">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                onChange={handleInputChange}
                defaultChecked={user?.ruoli?.find(
                  (ruolo) => ruolo.tipologia === "Admin"
                )}
                id="Admin"
              />
              <label className="form-check-label" htmlFor="Admin">
                Admin
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                onChange={handleInputChange}
                defaultChecked={user?.ruoli?.find(
                  (ruolo) => ruolo.tipologia === "Docente"
                )}
                id="Docente"
              />
              <label className="form-check-label" htmlFor="Docente">
                Docente
              </label>
            </div>
          </div>
        </form>
      </div>

      <div className="my-modal-footer">
        <button
          type="button"
          className="btn btn-danger me-3 "
          onClick={() => {
            confirmEffect();
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

export default UpdateModal;
