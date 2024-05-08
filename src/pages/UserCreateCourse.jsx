import React, { useContext, useState } from "react";
import { handleCreateCourse } from "../services/api/rest";
import { CorsiContext } from "../contexts/CorsiContext/CorsiContext";
import { validateCreateCorsoField } from "../services/corso/validateCreateCorsoField";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";

const UserCreateCourse = () => {
  const { corsi, setCorsi } = useContext(CorsiContext);
  const navigateTo = useNavigate();
  const [validationObj, setValidationObj] = useState({
    nomeCorso: true,
    descrizioneBreve: true,
    descrizioneCompleta: true,
    durata: true,
  });
  const [corso, setCorso] = useState({
    nomeCorso: "",
    descrizioneBreve: "",
    descrizioneCompleta: "",
    durata: "",
  });
  const [showModal, setShowModal] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const validateObj = validateCreateCorsoField(corso);
    if (Object.values(validateObj).some((value) => value === false)) {
      setValidationObj(validateObj);
      return;
    }
    const ok = await handleCreateCourse(corso, corsi, setCorsi);
    if (ok) {
      setCorso({
        nomeCorso: "",
        descrizioneBreve: "",
        descrizioneCompleta: "",
        durata: "",
      });
      setValidationObj({
        nomeCorso: true,
        descrizioneBreve: true,
        descrizioneCompleta: true,
        durata: true,
      });
      setShowModal(true);
      // navigateTo("/courses/create");
      return;
    }
  }

  function handleInputChange(e) {
    const { id, value } = e.target;
    const newObj = { ...corso, [id]: value };
    setCorso(newObj);
  }

  return (
    <div className="pb-5 ">
      {showModal && (
        <> 
          <div onClick={() => {setShowModal(false)}} className="overlay"></div>
          <Modal title={"Stato Corso"} bodyText={"il tuo corso è stato creato con successo"} closeText={"chiudi"} setShowModal={setShowModal}></Modal>
        </>
      )}
      <div className="container-fluid ">
        <h1 className="text-center">Crea Corso</h1>

        <form onSubmit={handleSubmit} className=" d-flex flex-column gap-5">
          <div className="course-creation-container d-flex flex-column gap-3 mb-4 ">
            <div className="form-group">
              <label htmlFor="nomeCorso">Nome Corso</label>
              <input
                type="text"
                value={corso.nomeCorso}
                maxLength={20}
                onChange={handleInputChange}
                className={
                  "form-control " +
                  (validationObj.nomeCorso ? "" : "is-invalid")
                }
                id="nomeCorso"
                aria-describedby="inserisci il nome del corso"
                placeholder="es. Informatica"
              />
              <div id="nomeCorso" className="invalid-feedback">
                Inserisci un nome dai 5 ai 20 caratteri
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="descrizioneBreve" className="form-label">
                Descrizione Breve
              </label>
              <textarea
                className={
                  "form-control " +
                  (validationObj.descrizioneBreve ? "" : "is-invalid")
                }
                onChange={handleInputChange}
                value={corso.descrizioneBreve}
                id="descrizioneBreve"
                rows={3}
                placeholder="corso di..."
                maxLength={50}
              />
              <div id="descrizioneBreve" className="invalid-feedback">
                descrizione troppo lunga, max 50 caratteri
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="descrizioneCompleta" className="form-label">
                Descrizione Dettagliata
              </label>
              <textarea
                className={
                  "form-control " +
                  (validationObj.descrizioneCompleta ? "" : "is-invalid")
                }
                onChange={handleInputChange}
                value={corso.descrizioneCompleta}
                id="descrizioneCompleta"
                rows={5}
                placeholder="il corso è incentrato su..."
                maxLength={250}
              />
              <div id="descrizioneCompleta" className="invalid-feedback">
                descrizione troppo lunga, max 250 caratteri
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="durata">Durata del Corso in mesi</label>
              <input
                type="number"
                min={0}
                step={1}
                max={30}
                onChange={handleInputChange}
                value={corso.durata}
                className={
                  "form-control " + (validationObj.durata ? "" : "is-invalid")
                }
                id="durata"
                aria-describedby="inserisci la durata del corso"
                placeholder="es. 2"
              />
              <div id="durata" className="invalid-feedback">
                la durata deve essere compresa fra 0 e 30 mesi
              </div>
            </div>

            <button
              type="submit"
              className="submitButtonCustom btn btn-primary mt-4"
            >
              Crea Nuovo Corso
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserCreateCourse;
