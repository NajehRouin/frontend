import React, { useEffect, useState } from "react";
import Api from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import { FaEye } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import DetailDemande from "../components/DetailDemande";
import { BiAnalyse } from "react-icons/bi";
import DetailAnalyse from "../components/DetailAnalyse";
import Resultat from "../components/Resultat";
function Demande() {
  const [allDemande, SetAllDemandes] = useState([]);
  const [openDemande, SetOpneDemand] = useState(false);
  const [openAnalyse, SetOpenAnalyse] = useState(false);
  const [openResultat, SetOpneresultat] = useState(false);
  const [detaillDemande, SetDetaillDemande] = useState({
    _id: "",
    fichierPaiment: "",
    analyses: [],
  });
  const fetchAllDemandes = async () => {
    try {
      const fetchData = await fetch(`${Api.getAllAnaylse.url}`, {
        method: Api.getAllAnaylse.method,
        credentials: "include",
      });

      const dataResponse = await fetchData.json();

      if (dataResponse.success) {
        SetAllDemandes(dataResponse.data);
      } else if (dataResponse.error) {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      toast.error("Failed to fetch demande.");
    }
  };

  useEffect(() => {
    fetchAllDemandes();
  }, []);

  return (
    <div className="p-4">
      <div className="bg-white py-2 px-4 flex justify-between items-center flex-wrap">
        <h2 className="font-bold text-lg">Liste des demandes</h2>
      </div>

      {/* Table for Desktop */}
      <div className="hidden md:block bg-white pb-4 overflow-x-auto mt-5">
        <table className="w-full userTable min-w-[600px]">
          <thead>
            <tr className="bg-cyan-400 text-white">
              <th>Index</th>
              <th>Client</th>
              <th>CIN</th>
              <th>N°Téléphone</th>
              <th>Adresse</th>
              <th>Projet</th>

              <th>Objectif</th>
              <th>type Analyse</th>
              <th>prix Analyse</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allDemande.map((el, index) => (
              <tr key={index}>
                <td>{index + 1}</td>

                <td>{el?.nomUser}</td>
                <td>{el?.cin}</td>
                <td>{el?.numPhone}</td>
                <td>{el?.adresse}</td>
                <td>{el?.projet}</td>
                <td>{el?.objectif}</td>
                <td>{el?.typeAnalyse}</td>
                <td>{el?.prixTotal}</td>
                <td
                  className={
                    el?.paimentStatus ? "text-green-400" : "text-red-500"
                  }
                >
                  {el?.paimentStatus ? "Oui" : "Non"}
                </td>
                <td>{moment(el.createdAt).format("LL")}</td>
                <td className="flex justify-evenly p-3 items-center">
                  <button
                    className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white"
                    onClick={() => {
                      SetDetaillDemande(el);
                      SetOpenAnalyse(true);
                    }}
                  >
                    <BiAnalyse />
                  </button>
                  <button
                    className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white"
                    onClick={() => {
                      SetDetaillDemande(el);
                      SetOpneDemand(true);
                    }}
                  >
                    <FaEye />
                  </button>
                  <button
                    className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-cyan-500 hover:text-white"
                    onClick={() => {
                      SetOpneresultat(true);
                      SetDetaillDemande(el);
                    }}
                  >
                    <MdModeEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {openDemande && (
        <DetailDemande
          onClose={() => SetOpneDemand(false)}
          idAnalyse={detaillDemande?._id}
          fichierPaiment={detaillDemande?.fichierPaiment}
          callFunc={fetchAllDemandes}
        />
      )}

      {openAnalyse && (
        <DetailAnalyse
          onClose={() => SetOpenAnalyse(false)}
          idAnalyse={detaillDemande?._id}
          callFunc={fetchAllDemandes}
        />
      )}

      {openResultat && (
        <Resultat
          onClose={() => SetOpneresultat(false)}
          idAnalyse={detaillDemande?._id}
          fetchData={fetchAllDemandes}
        />
      )}

      {/* Cards for Mobile */}
    </div>
  );
}

export default Demande;
