import React, { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";

import Api from "../common";
import { toast } from "react-toastify";

const UploadComponent = ({ onClose, fetchData }) => {
  const [data, SetData] = useState({
    component: "",
    prix: "",
    matiere: "",
  });
  const [materiel, SetMateriel] = useState([]);
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    SetData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const fetchMateriel = async () => {
    const fetchData = await fetch(Api.matiere.url, {
      method: Api.matiere.method,
      credentials: "include",
    });

    const dataResponse = await fetchData.json();

    if (dataResponse.success) {
      SetMateriel(dataResponse.data);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  useEffect(() => {
    fetchMateriel();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(Api.ajouterComponent.url, {
      method: Api.ajouterComponent.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
      fetchData();
    }

    if (responseData.error) {
      toast.error(responseData?.message);
    }
  };

  return (
    <div className="fixed w-sm  h-lg bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-sm h-sm max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Ajouter Composant</h2>
          <div
            className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            <CgClose />
          </div>
        </div>

        <form
          className="grid p-4 gap-2 overflow-y-scroll h-full pb-5"
          onSubmit={handleSubmit}
        >
          <label htmlFor="matiere" className="mt-3">
            Matière :
          </label>
          <select
            required
            value={data.matiere}
            name="matiere"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
          >
            <option value={""}>Choisir une Matière</option>
            {materiel.map((el, index) => {
              return (
                <option value={el._id} key={el._id}>
                  {el.nom}
                </option>
              );
            })}
          </select>
          <label htmlFor="Titre">Titre :</label>
          <input
            type="text"
            id="Titre"
            placeholder="Titre"
            name="component"
            value={data.component}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="Prix" className="mt-3">
            Prix :
          </label>
          <input
            type="number"
            id="Prix"
            placeholder="Prix"
            value={data.prix}
            name="prix"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <button className="px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700">
            Ajouter{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadComponent;
