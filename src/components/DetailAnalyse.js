import React, { useEffect, useState } from 'react'
import Api from '../common';
import { IoMdClose } from "react-icons/io";
const  DetailAnalyse=({ idAnalyse, onClose, callFunc }) =>{
    const [analyses, setAnalyses] = useState([]);

    const getAnalyses = async () => {
        try {
          const fetchResponse = await fetch(Api.detaillAllAnaylse.url, {
            method: Api.detaillAllAnaylse.method,
            credentials: "include",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
                idAnalyse: idAnalyse,
            }),
          });
    
          const responseData = await fetchResponse.json();
    
          if (responseData.success) {
            setAnalyses(responseData?.data?.analyses);
            callFunc();
          }
        } catch (error) {
          console.log("error", error);
        }
      };

      useEffect(() => {
        getAnalyses();
      }, [idAnalyse]); 
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center z-10 bg-slate-200 bg-opacity-50">
      <div className="mx-auto bg-white shadow-md p-4 rounded-lg w-full max-w-4xl">
        <button className="block ml-auto" onClick={onClose}>
          <IoMdClose className="text-xl" />
        </button>

        <h1 className="pb-4 text-lg font-medium">Details Analyse</h1>

        {/* Responsive Table for Desktop */}
        <div className="hidden md:block">
          <table className="w-full userTable">
            <thead>
              <tr className="bg-cyan-400 text-white">
                <th>Index</th>
                <th>Titre</th>
                <th>Prix</th>
              </tr>
            </thead>
            <tbody>
              {analyses.map((el, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{el?.nom}</td>
                  <td>{el?.prix}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
        </div>
  )
}

export default DetailAnalyse