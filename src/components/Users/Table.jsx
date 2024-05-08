import React, { useContext, useEffect, useState } from "react";
import { UtentiContext } from "../../contexts/UtentiContext/UtentiContext";
import { handleDeleteAdmin, handleGetAllUtenti, handleUpdateUser } from "../../services/api/rest";
import { Link } from "react-router-dom";
import ConfirmModal from "../ConfirmModal";
import UpdateModal from "../UpdateModal";
import { validateUserUpdate } from "../../services/admin/validateUserUpdate";

const Table = () => {
  const { utenti, setUtenti } = useContext(UtentiContext);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [clickedUser, setClickedUser] = useState({});
  const [validUser, setValidUser] = useState({
    nome: true,
    cognome: true,
    email: true,
  });

  useEffect(() => {
    const ok = handleGetAllUtenti(setUtenti);
  }, []);

  async function handleClickDelete() {
    await handleDeleteAdmin(clickedUser);
    location.reload();
  }

  async function handleClickUpdateUser() {
    const validationObj = validateUserUpdate(clickedUser);
    if (Object.values(validationObj).some((value) => value === false)) {
      setValidUser({
        nome: true,
        cognome: true,
        email: true,
      });
      return;
    }

    handleUpdateUser(clickedUser)
    location.reload()
  }

  return (
    <>
      {showModal && (
        <>
          <div
            onClick={() => {
              setShowModal(false);
            }}
            className="overlay"
          ></div>
          <ConfirmModal
            title={"Stato Eliminazione"}
            bodyText={"Sei sicuro di voler eliminare questo utente?"}
            closeText={"annulla"}
            confirmText={"elimina"}
            setShowModal={setShowModal}
            confirmEffect={handleClickDelete}
          ></ConfirmModal>
        </>
      )}

      {showUpdateModal && (
        <>
          <div
            onClick={() => {
              setShowUpdateModal(false);
            }}
            className="overlay"
          ></div>
          <UpdateModal
            title={"Aggiorna Utente"}
            closeText={"annulla"}
            confirmText={"aggiorna"}
            setShowModal={setShowUpdateModal}
            confirmEffect={handleClickUpdateUser}
            user={clickedUser}
            setClickedUser={setClickedUser}
            validationObj={validUser}
          ></UpdateModal>
        </>
      )}

      <table className="table">
        <thead>
          <tr className="">
            <th scope="col">#</th>
            <th scope="col">Nome</th>
            <th scope="col">Cognome</th>
            <th scope="col">Email</th>
            <th scope="col">Ruoli</th>
            <th scope="col"></th>
          </tr>
        </thead>

        <tbody id="table-body">
          {utenti.map((utente, index) => {
            return (
              <tr key={index}>
                <th scope="row">{index}</th>
                <td>{utente.nome}</td>
                <td>{utente.cognome}</td>
                <td>{utente.email}</td>
                <td>
                  {utente?.ruoli.map((ruolo, index) => {
                    return <span key={index}> {ruolo.tipologia}</span>;
                  })}
                </td>
                <td className="text-center ">
                  <span
                    onClick={() => {
                      setShowUpdateModal(true);
                      setClickedUser(utente);
                    }}
                    className="fs-4 me-3 point edit-btn"
                    role="button"
                  >
                    <i className="bi bi-pencil-square"></i>
                    <span className="fs-6">Modifica</span>
                  </span>

                  <span
                    onClick={() => {
                      setShowModal(true);
                      setClickedUser(utente);
                    }}
                    className="fs-4 trash-btn"
                    role="button"
                  >
                    <i className="bi bi-trash"></i>
                    <span className="fs-6">Elimina</span>
                  </span>
                </td>
              </tr>
            );
          })}
          <tr className="text-center">
            <td colSpan="100%" className="hover-background-change">
              {/*  per questioni di tempistiche riporto direttamente alla pagina di registrazione */}
              {/*  avendo più tempo avrei voluto realizzare una modale da mostrare direttamente nell'admin panel 
                 in cui è possibile aggiungere un nuovo utente */}
              <Link
                to={"/signin"}
                className="d-flex justify-content-center align-items-center gap-2"
              >
                <i className="bi bi-person-plus fs-4 "></i>{" "}
                <span className="text-decoration-underline">
                  aggiungi utente
                </span>
              </Link>
            </td>
          </tr>
        </tbody>

        <tfoot id="table-foot"></tfoot>
      </table>
    </>
  );
};

export default Table;
