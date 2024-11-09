import React, {  useState } from "react";
import { CgClose } from "react-icons/cg";
import { FaCloudUploadAlt } from "react-icons/fa";
import Api from "../common";
import { toast } from "react-toastify";

const UploadInformation = ({ onClose, fetchData }) => {
  const [data, setData] = useState({
    title: "",
    contenu: "",
    photo: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };



  const handleUploadPhoto = async(e) => {


  
    if (e.target.files) {
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        const result = await fetch(process.env.REACT_APP_API_URL + "/informations", {
          method: "POST",
          body: formData,
        });
        const data = await result.json();
   
    if(data?.success===true){
        setData((preve)=>{
            return{
              ...preve,
              photo :data?.result?.filename
            }
          })
    }else{
        toast.error(data.message)
    }
        
       
       // SetViewImage(true);
      }
  }


  const handleSubmit = async(e) =>{
    if(data?.photo===""){
        console.log('first')
        toast.error("Télécharger l'image")
        //return false
    }else{
        e.preventDefault()
    
        const response = await fetch(Api.ajouterInformation.url,{
          method : Api.ajouterInformation.method,
          credentials : 'include',
          headers : {
            "content-type" : "application/json"
          },
          body : JSON.stringify(data)
        })
    
        const responseData = await response.json()
    
        if(responseData.success){
            toast.success(responseData?.message)
            onClose()
            fetchData()
        }
    
    
        if(responseData.error){
          toast.error(responseData?.message)
        }
    }
   
  

  }

  return (
    <div className="fixed w-sm  h-lg bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-sm h-sm max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Ajouter Information</h2>
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
          <label htmlFor="Titre">Titre :</label>
          <input
            type="text"
            id="Titre"
            placeholder="Titre"
            name="title"
            value={data.title}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="contenu" className="mt-3">
            Subtitle :
          </label>
          <input
            type="text"
            id="contenu"
            placeholder="contenu"
            value={data.contenu}
            name="contenu"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />

          <label htmlFor="productImage" className="mt-3">
            Photo :
          </label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 border rounded h-14 w-full flex justify-center items-center cursor-pointer">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                <span className="text-sm">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Télécharger l'image d'informations</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  name="photo"
                  onChange={handleUploadPhoto}
                
                />
               
              
              </div>
            

            </div>
           
          </label>
          <div className=" flex justify-center text-center">
          {
                    data?.photo!=="" &&(
                        <img className="w-20 h-20 rounded-full" src={process.env.REACT_APP_API_URL+'/upload/informations/'+data?.photo} alt=""/>
                    )
                }
          </div>
          
          <button className="px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700">
            Ajouter Information
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadInformation;
