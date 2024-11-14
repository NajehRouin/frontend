import React, { useState } from "react";

import { IoMdClose } from "react-icons/io";
import Api from "../common";
import { toast } from "react-toastify";
const UpdateMateriel = ({
  nomMateriel,
  prixMateriel,
  matierId,
  onClose,
  callFunc,
}) => {
  const [nom, SetNom] = useState(nomMateriel);
  const [prix, SetPrix] = useState(prixMateriel);

  const handleChangeNOm = (e) => {
    SetNom(e.target.value);
  };

  const handleChangePrix = (e) => {
    SetPrix(e.target.value);
  };

  const updateMateriel = async () => {
    const fetchResponse = await fetch(Api.updateMatiere.url, {
      method: Api.updateMatiere.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        matierId: matierId,
        nom: nom,
        prix: prix,
      }),
    });

    const responseData = await fetchResponse.json();

    if (responseData.success) {
      toast.success(responseData.message);
      onClose();
      callFunc();
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50">
      <div className="mx-auto bg-white shadow-md p-4 w-full max-w-sm rounded-lg">
        <button className="block ml-auto" onClick={onClose}>
          <IoMdClose />
        </button>

        <h1 className="pb-4 text-lg font-medium">Modifier Matière</h1>

        <div className="flex items-center justify-between">
          <label htmlFor="Name">Titre :</label>
          <input
            type="text"
            id="Name"
            placeholder="Titre"
            value={nom}
            name="nom"
            onChange={handleChangeNOm}
            className="p-2 bg-slate-100 border rounded"
            required
          />
        </div>

        <div className="flex items-center justify-between mt-3">
          <label htmlFor="Prix">Prix :</label>
          <input
            type="number"
            id="Prix"
            placeholder="Prix"
            value={prix}
            name="prix"
            onChange={handleChangePrix}
            className="p-2 bg-slate-100 border rounded"
            required
          />
        </div>

        <button
          className="w-fit mx-auto block  py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700 mt-5"
          onClick={updateMateriel}
        >
          Modifier
        </button>
      </div>
    </div>
  );
};

export default UpdateMateriel;
