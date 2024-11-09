import React, { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { FaCloudUploadAlt } from "react-icons/fa";
import Api from "../common";
import { toast } from "react-toastify";

const Resultat = ({ idAnalyse, onClose, fetchData }) => {
  const [data, setData] = useState({
    resultatAnalyse: "",
  });

  const [dataFile, setDataFile] = useState({
    resultatAnalyse: "",
  });

const [viewFile,SetViewFile]=useState(false)
  const DetailResultat = async () => {
   
    const dataResponse = await fetch(Api.detaillAllAnaylse.url, {
        method: Api.detaillAllAnaylse.method,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify({
            idAnalyse: idAnalyse,
        }),
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success&&dataApi?.data?.resultatAnalyse!=="") {
        SetViewFile(true)
        setDataFile((preve)=>{
            return{
              ...preve,
              resultatAnalyse :dataApi?.data?.resultatAnalyse
            }
          })
    }

    if (dataApi.error) {
        SetViewFile(false)

        toast.error(dataApi.message);
    }
};


  const handleUploadResultat = async (e) => {
    if (e.target.files) {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);
      const result = await fetch(process.env.REACT_APP_API_URL + "/resultat", {
        method: "POST",
        body: formData,
      });
      const data = await result.json();

      if (data?.success === true) {
        SetViewFile(false)
        setData((preve) => {
          return {
            ...preve,
            resultatAnalyse: data?.result?.filename,
          };
        });
      } else {
        toast.error(data.message);
      }

      // SetViewImage(true);
    }
  };

  const handleSubmit = async(e) =>{

        e.preventDefault()
    
        const response = await fetch(Api.envoyerAnalyse.url,{
          method : Api.envoyerAnalyse.method,
          credentials : 'include',
          headers : {
            "content-type" : "application/json"
          },
          body : JSON.stringify({
            idAnalyse:idAnalyse,
            resultatAnalyse:data?.resultatAnalyse
          })
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

  useEffect(()=>{
    DetailResultat()
  },[idAnalyse])

  return (
    <div className="fixed w-sm  h-lg bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="overflow-y-scroll bg-white p-4 rounded w-full max-w-sm h-sm max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Envoyer Resultat</h2>
          <div
            className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            <CgClose />
          </div>
        </div>

        <form
          className="grid p-4 gap-2  h-full pb-5"
        onSubmit={handleSubmit}
        >
          <label htmlFor="productImage" className="mt-3">
            fichier résultat :
          </label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 border rounded h-14 w-full flex justify-center items-center cursor-pointer">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                <span className="text-2xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Téléchargez le fichier résultat</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  name="resultatAnalyse"
                  onChange={handleUploadResultat}
                />
              </div>
            </div>
          </label>


{
    viewFile &&(
        <div className=" flex justify-center text-center">
                      <iframe
                    
                      src={process.env.REACT_APP_API_URL+dataFile?.resultatAnalyse}
                      title="PDF Viewer"
                      width="100%"
                      height="300px"
                      className="border-0"
                    />
        </div>
    )
}


          <div className=" flex justify-center text-center">
          {
                    data?.resultatAnalyse!=="" &&(

                        <iframe
                      
                        src={process.env.REACT_APP_API_URL+'/upload/resultat/'+data?.resultatAnalyse}
                        title="PDF Viewer"
                        width="100%"
                        height="300px"
                        className="border-0"
                      />

                       
                    )

                   
                }
          </div>
          <button className="px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700">
          Envoyer Resultat
          </button>
        </form>
      </div>
    </div>
  );
};

export default Resultat;
