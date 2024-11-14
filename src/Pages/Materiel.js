import React, { useEffect, useState } from "react";
import Api from "../common";
import { toast } from "react-toastify";
import { MdModeEdit, MdDelete } from "react-icons/md";
import UpdateMateriel from "../components/UpdateMateriel";
import UploadMateriel from "../components/UploadMateriel";

function Materiel() {
  const [allMateriel, setAllMateriel] = useState([]);
  const [openUpdateMateriel, SetOpenUpdateMateriel] = useState(false);
  const [uploadMateriel, SetUploadMateriel] = useState(false);

  const [detailsMateriel, SetDetailsMateriels] = useState({
    _id: "",
    nom: "",
    prix: 0,
  });

  const fetchAllMateriels = async () => {
    try {
      const fetchData = await fetch(`${Api.matiere.url}`, {
        method: Api.matiere.method,
        credentials: "include",
      });

      const dataResponse = await fetchData.json();

      if (dataResponse.success) {
        setAllMateriel(dataResponse.data);
      } else if (dataResponse.error) {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      toast.error("Failed to fetch materiels.");
    }
  };

  const deleteMateriel = async (id) => {
    const dataResponse = await fetch(Api.deleteMateriel.url, {
      method: Api.deleteMateriel.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        matierId: id,
      }),
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      toast.success(dataApi.message);
      fetchAllMateriels();
    }

    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  useEffect(() => {
    fetchAllMateriels();
  }, []);

  return (
    <div className="p-4">
      <div className="bg-white py-2 px-4 flex justify-between items-center flex-wrap">
        <h2 className="font-bold text-lg">Liste des Matières</h2>
        <button
          className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full"
          onClick={() => SetUploadMateriel(true)}
        >
          Ajouter Matière
        </button>
      </div>

      {/* Table for Desktop */}
      <div className="hidden md:block bg-white pb-4 overflow-x-auto mt-5">
        <table className="w-full userTable min-w-[600px]">
          <thead>
            <tr className="bg-cyan-400 text-white">
              <th>Index</th>
              <th>Titre</th>
              <th>Prix</th>

              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allMateriel.map((el, index) => (
              <tr key={index}>
                <td>{index + 1}</td>

                <td>{el.nom}</td>
                <td>{el.prix}</td>

                <td className="flex  justify-center items-center">
                  <button
                    className="bg-green-100 p-2 mr-3 rounded-full cursor-pointer hover:bg-green-500 hover:text-white"
                    onClick={() => {
                      SetDetailsMateriels(el);
                      SetOpenUpdateMateriel(true);
                    }}
                  >
                    <MdModeEdit />
                  </button>

                  <button
                    className="bg-red-100 p-2 rounded-full cursor-pointer hover:bg-red-500 hover:text-white"
                    onClick={() => {
                      deleteMateriel(el?._id);
                    }}
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards for Mobile */}
      <div className="block md:hidden mt-5">
        {allMateriel.map((el, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 mb-4 shadow-md bg-gray-50"
          >
            <p>
              <strong>Index:</strong> {index + 1}
            </p>

            <p>
              <strong>Titre:</strong> {el.nom}
            </p>
            <p>
              <strong>Prix:</strong> {el.prix}
            </p>

            <button
              className="bg-green-100 p-2 mr-4 rounded-full cursor-pointer hover:bg-green-500 hover:text-white mt-2"
              onClick={() => {
                SetDetailsMateriels(el);
                SetOpenUpdateMateriel(true);
              }}
            >
              <MdModeEdit />
            </button>
            <button
              className="bg-red-100 p-2 rounded-full cursor-pointer hover:bg-red-500 hover:text-white mt-2"
              onClick={() => {
                deleteMateriel(el?._id);
              }}
            >
              <MdDelete />
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {/* <div className="flex justify-between items-center py-4 p-5">
            <button
              className={`bg-blue-500 text-white py-2 px-4 rounded ${
                currentPage === 1 ? "bg-gray-500 cursor-not-allowed" : ""
              }`}
              onClick={handlePrevious}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className={`bg-blue-500 text-white py-2 px-4 rounded ${
                currentPage === totalPages ? "bg-gray-500 cursor-not-allowed" : ""
              }`}
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div> */}

      {openUpdateMateriel && (
        <UpdateMateriel
          onClose={() => SetOpenUpdateMateriel(false)}
          nomMateriel={detailsMateriel.nom}
          prixMateriel={detailsMateriel.prix}
          matierId={detailsMateriel._id}
          callFunc={fetchAllMateriels}
        />
      )}

      {uploadMateriel && (
        <UploadMateriel
          onClose={() => SetUploadMateriel(false)}
          fetchData={fetchAllMateriels}
        />
      )}
    </div>
  );
}

export default Materiel;
