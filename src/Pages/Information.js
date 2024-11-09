import React, { useEffect, useState } from "react";
import Api from "../common";
import { toast } from "react-toastify";
import { MdModeEdit, MdDelete } from "react-icons/md";
import UploadInformation from "../components/UploadInformation";
function Information() {
  const [allInformations, setAllInformations] = useState([]);
  const [uploadInformation, SetUploadInformation] = useState(false);
  const fetchAllInformations = async () => {
    try {
      const fetchData = await fetch(`${Api.information.url}`, {
        method: Api.information.method,
        credentials: "include",
      });

      const dataResponse = await fetchData.json();

      if (dataResponse.success) {
        setAllInformations(dataResponse.data);
      } else if (dataResponse.error) {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      toast.error("Failed to fetch users.");
    }
  };

  const deleteInformation = async (id) => {
    const dataResponse = await fetch(Api.deleteInformation.url, {
      method: Api.deleteInformation.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        informationId: id,
      }),
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      toast.success(dataApi.message);
      fetchAllInformations();
    }

    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  useEffect(() => {
    fetchAllInformations();
  }, []);

  return (
    <div className="p-4">
      <div className="bg-white py-2 px-4 flex justify-between items-center flex-wrap">
        <h2 className="font-bold text-lg">Liste des Informations</h2>
        <button
          className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full"
          onClick={() => SetUploadInformation(true)}
        >
          Ajouter information
        </button>
      </div>

      {/* Table for Desktop */}
      <div className="hidden md:block bg-white pb-4 overflow-x-auto mt-5">
        <table className="w-full userTable min-w-[600px]">
          <thead>
            <tr className="bg-cyan-400 text-white">
              <th>Index</th>
              <th>Photo</th>
              <th>Titre</th>
              <th>Subtitle</th>

              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allInformations.map((el, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td className="text-center flex h-24 justify-center items-center">
                  <img
                    src={process.env.REACT_APP_API_URL + el?.photo}
                    className="w-10 h-10 rounded-full"
                    alt={el?.title}
                  />
                </td>
                <td>{el.title}</td>
                <td>{el.contenu}</td>
                <td className="text-center flex h-24 justify-center items-center">
                  <button
                    className="bg-green-100 p-2 mr-3 rounded-full cursor-pointer hover:bg-green-500 hover:text-white"
                    onClick={() => {
                      //   setUpdateUserDetails(el);
                      //   setOpenUpdateRole(true);
                    }}
                  >
                    <MdModeEdit />
                  </button>

                  <button
                    className="bg-red-100 p-2 rounded-full cursor-pointer hover:bg-red-500 hover:text-white"
                    onClick={() => {
                      deleteInformation(el?._id);
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
        {allInformations.map((el, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 mb-4 shadow-md bg-gray-50"
          >
            <p>
              <strong>Index:</strong> {index + 1}
            </p>
            <p>
              <img
                src={process.env.REACT_APP_API_URL + el?.photo}
                className="w-10 h-10 rounded-full"
                alt={el?.title}
              />
            </p>
            <p>
              <strong>Titre:</strong> {el.title}
            </p>
            <p>
              <strong>Subtitle:</strong> {el.contenu}
            </p>

            <button
              className="bg-green-100 p-2 mr-4 rounded-full cursor-pointer hover:bg-green-500 hover:text-white mt-2"
              onClick={() => {
                // setUpdateUserDetails(el);
                // setOpenUpdateRole(true);
              }}
            >
              <MdModeEdit />
            </button>
            <button
              className="bg-red-100 p-2 rounded-full cursor-pointer hover:bg-red-500 hover:text-white mt-2"
              onClick={() => {
                deleteInformation(el?._id);
              }}
            >
              <MdDelete />
            </button>
          </div>
        ))}
      </div>

      {uploadInformation && (
        <UploadInformation
          onClose={() => SetUploadInformation(false)}
          fetchData={fetchAllInformations}
        />
      )}

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
      </div>

      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          phone={updateUserDetails.phone}
          adress={updateUserDetails.adress}
          userId={updateUserDetails._id}
          callFunc={fetchAllUsers}
        />
      )} */}
    </div>
  );
}

export default Information;
