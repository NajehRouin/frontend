import React, { useEffect, useState } from "react";
import Api from "../common";
import { toast } from "react-toastify";





const AllUsers = () => {
  const [allUser, setAllUsers] = useState([]);
  const fetchAllUsers = async () => {
    try {
      const fetchData = await fetch(
        `${Api.allUser.url}`,
        {
          method: Api.allUser.method,
          credentials: "include",
        }
      );

      const dataResponse = await fetchData.json();

      if (dataResponse.success) {
        setAllUsers(dataResponse.data);
       
      } else if (dataResponse.error) {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      toast.error("Failed to fetch users.");
    }
  };


  const AccepteUser = async (id) => {
   
    const dataResponse = await fetch(Api.acceptUser.url, {
        method: Api.acceptUser.method,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify({
            userId: id,
        }),
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
        toast.success(dataApi.message);
        fetchAllUsers();
    }

    if (dataApi.error) {
        toast.error(dataApi.message);
    }
};

  

  useEffect(() => {
    fetchAllUsers();
  }, []);



  return (
    <div className="p-4">
      <div className="bg-white py-2 px-4 flex justify-between items-center flex-wrap">
        <h2 className="font-bold text-lg">Liste des clients</h2>
      </div>

      {/* Table for Desktop */}
      <div className="hidden md:block bg-white pb-4 overflow-x-auto mt-5">
        <table className="w-full userTable min-w-[600px]">
          <thead>
            <tr className="bg-cyan-400 text-white">
              <th>Index</th>
              <th>Photo</th>
              <th>Nom</th>
              <th>Email</th>
              <th>CIN</th>
              <th>N°Téléphone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allUser.map((el, index) => (
              <tr key={index}>
                <td>{ index + 1}</td>
                <td className=" justify-center flex h-14">  <img
              src={process.env.REACT_APP_API_URL+el?.photo}
                className="w-10 h-10 rounded-full"
                alt={el?.name}
              /></td>
                <td>{el.name}</td>
                <td>{el.email}</td>
                <td>{el.cin}</td>
                <td>{el.numPhone}</td>
             
             
                <td className="flex justify-evenly p-3 items-center">
            {/* Switch Component */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={el?.status}
                onChange={() => {AccepteUser(el?._id)}}
                className="sr-only peer"
              />
              <div
                className={`w-11 h-6 rounded-full peer-checked:bg-gray-600 ${
                  el?.status ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              ></div>
              <span
                className={`absolute left top-1 w-4 h-4 rounded-full transition ${
                  el?.status ? 'translate-x-7 bg-blue-500' : 'bg-gray-500'
                }`}
              ></span>
            </label>
          </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards for Mobile */}
      <div className="block md:hidden mt-5">
        {allUser.map((el, index) => (
          <div
            key={index}
             className="border rounded-lg p-4 mb-4 shadow-md bg-gray-50"
          >
            <p>
              <strong>Index:</strong> {index + 1}
            </p>
            <p>
             <img
              src={process.env.REACT_APP_API_URL+el?.photo}
                className="w-10 h-10 rounded-full"
                alt={el?.name}
              />
            </p>
            <p>
              <strong>Name:</strong> {el.name}
            </p>
            <p>
              <strong>Email:</strong> {el.email}
            </p>
            <p>
              <strong>CIN:</strong> {el.cin}
            </p>
            <p>
              <strong>Phone:</strong> {el.numPhone}
            </p>
           
           
            <td className="flex justify-evenly p-3 items-center">
            {/* Switch Component */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={el?.status}
                onChange={() => {AccepteUser(el?._id)}}
                className="sr-only peer"
              />
              <div
                className={`w-11 h-6 rounded-full peer-checked:bg-gray-600 ${
                  el?.status ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              ></div>
              <span
                className={`absolute left top-1 w-4 h-4 rounded-full transition ${
                  el?.status ? 'translate-x-7 bg-blue-500' : 'bg-gray-500'
                }`}
              ></span>
            </label>
          </td>
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
};

export default AllUsers;
