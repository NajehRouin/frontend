import React, { useEffect, useState } from "react";
import Api from "../common";
import { toast } from "react-toastify";
import { MdModeEdit,MdDelete } from "react-icons/md";
import UpdateComponent from "../components/UpdateComponent";
import UploadComponent from "../components/UploadComponent";

function Components() {

  const [editComponent, setEditComponent] = useState(false);
  const [allComponents, setAllComponents] = useState([]);
  const [uploadComponet,SetUploadComponent]=useState(false)
  const [detailsComponents,SetDetailsComponents]=useState({
    _id:"",
    component:"",
    prix:0,
    matiere:{
      nom:""
    }
  })

  const fetchAllComponents = async () => {
    try {
      const fetchData = await fetch(
        `${Api.component.url}`,
        {
          method: Api.component.method,
          credentials: "include",
        }
      );

      
      const dataResponse = await fetchData.json();

      if (dataResponse.success) {
        setAllComponents(dataResponse.data);
       
      } else if (dataResponse.error) {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      toast.error("Failed to fetch component.");
    }
  };


  const deleteComponent=async(id)=>{
    const dataResponse = await fetch(Api.deleteComponent.url, {
      method: Api.deleteComponent.method,
      credentials: 'include',
      headers: {
          'Content-Type': 'application/json', 
      },
      body: JSON.stringify({
        componentId: id,
      }),
  });

  const dataApi = await dataResponse.json();

  if (dataApi.success) {
      toast.success(dataApi.message);
      fetchAllComponents();
  }

  if (dataApi.error) {
      toast.error(dataApi.message);
  }

  }


  

  useEffect(() => {
    fetchAllComponents();
  }, []);


  return (
    <div className="p-4">
      <div className="bg-white py-2 px-4 flex justify-between items-center flex-wrap">
        <h2 className="font-bold text-lg">Liste des componets</h2>
        <button
      className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full"
    onClick={() => SetUploadComponent(true)}
    >
      Ajouter componet
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
              <th>Materiel</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allComponents.map((el, index) => (
              <tr key={index}>
                <td>{ index + 1}</td>
        
                <td>{el.component}</td>
                <td>{el.prix}</td>
                <td>{el.matiere?.nom}</td>
             
             
                <td className="flex  justify-center items-center">
              <button
                className="bg-green-100 p-2 mr-3 rounded-full cursor-pointer hover:bg-green-500 hover:text-white"
                onClick={() => {
                
                  setEditComponent(true)
                  SetDetailsComponents(el)
                }}
              >
                <MdModeEdit />
              </button>

              <button
                className="bg-red-100 p-2 rounded-full cursor-pointer hover:bg-red-500 hover:text-white"
                onClick={() => {
                  deleteComponent(el?._id)
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
        {allComponents.map((el, index) => (
          <div
            key={index}
             className="border rounded-lg p-4 mb-4 shadow-md bg-gray-50"
          >
            <p>
              <strong>Index:</strong> {index + 1}
            </p>
         
            <p>
              <strong>Titre:</strong> {el.component}
            </p>
            <p>
              <strong>Prix:</strong> {el.prix}
            </p>

            <p>
              <strong>Materiel:</strong> {el.matiere?.nom}
            </p>
           
          
            <button
          className="bg-green-100 p-2 mr-4 rounded-full cursor-pointer hover:bg-green-500 hover:text-white mt-2"
          onClick={() => {
            setEditComponent(true)
            SetDetailsComponents(el)
          }}
        >
          <MdModeEdit />
        </button>
        <button
          className="bg-red-100 p-2 rounded-full cursor-pointer hover:bg-red-500 hover:text-white mt-2"
          onClick={() => {
            deleteComponent(el?._id)
          }}
        >
         <MdDelete />
        </button>
           
       
          </div>
        ))}
      </div>
          {
            editComponent && (
              <UpdateComponent 
              onClose={() =>setEditComponent(false)}
              component={detailsComponents.component}
              prixComponent={detailsComponents.prix}
             
              matiere={detailsComponents.matiere}
              componentId={detailsComponents?._id}
              callFunc={fetchAllComponents}
               
               
               />
            )
          }


{
            uploadComponet && (
              <UploadComponent
              onClose={()=>SetUploadComponent(false)}
              fetchData={fetchAllComponents}
              />
            )
          }

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

export default Components