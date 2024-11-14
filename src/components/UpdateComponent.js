import React, { useEffect, useState } from "react";
import Api from "../common";
import { toast } from "react-toastify";
import { CgClose } from "react-icons/cg";
const UpdateComponent = ({
  component,
  prixComponent,
  matiere,
  componentId,
  onClose,
  callFunc,
}) => {
  const [nom, SetNom] = useState(component);
  const [prix, SetPrix] = useState(prixComponent);
  const [matierleComponent, SetMaterielComponent] = useState(matiere);
  const [materiel, SetMateriel] = useState([]);

  const handleChangeNOm = (e) => {
    SetNom(e.target.value);
  };

  const handleChangePrix = (e) => {
    SetPrix(e.target.value);
  };

  const handleChangeMateriel = (e) => {
    SetMaterielComponent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(Api.updateComponent.url, {
      method: Api.updateComponent.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        componentId: componentId,
        component: nom,
        prix: prix,
        matiere: matierleComponent,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
      callFunc();
    }

    if (responseData.error) {
      toast.error(responseData?.message);
    }
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
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50">
      <div className="mx-auto bg-white shadow-md p-4 w-full max-w-sm rounded-lg">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Modifier Composant</h2>
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
            value={matierleComponent}
            name="matiere"
            onChange={handleChangeMateriel}
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
            value={nom}
            onChange={handleChangeNOm}
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
            value={prix}
            name="prix"
            onChange={handleChangePrix}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <button className="px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700">
            Modifier
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateComponent;
