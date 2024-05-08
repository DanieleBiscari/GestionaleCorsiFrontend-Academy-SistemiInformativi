import React, { useContext, useState } from "react";
import { handleLogout } from "../services/auth/logout";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import { handleDelete } from "../services/api/rest";
import ConfirmModal from "../components/ConfirmModal";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  function handleClickLogout() {
    handleLogout();
    navigate("/login");
    location.reload();
  }

  async function handleClickDelete() {
    await handleDelete(user);
    navigate("/");
    location.reload();
  }

  return (
    <div className="container-lg">
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
            bodyText={"Sei sicuro di voler eliminare il tuo account?"}
            closeText={"annulla"}
            confirmText={"elimina"}
            setShowModal={setShowModal}
            confirmEffect={handleClickDelete}
          ></ConfirmModal>
        </>
      )}
      <p>
        <b>Nome</b>: {user.firstName}
      </p>
      <p>
        <b>Cognome</b>: {user.lastName}
      </p>
      <p>
        <b>Email</b>: {user.email}
      </p>

      <button onClick={handleClickLogout} className="btn btn-warning me-4 ">
        logout
      </button>
      <button onClick={() => {setShowModal(true)}} className="btn btn-danger">
        elimina
      </button>
    </div>
  );
};

export default UserProfile;
