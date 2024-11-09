import React, { useState } from 'react'

import { CgClose } from "react-icons/cg";
import Api from '../common';
import { toast } from 'react-toastify';
const  DetailDemande=({
    fichierPaiment,
    idAnalyse,
    onClose,
    callFunc,
})=> {
    const [paimentStatus,SetPaimentStatus]=useState()

    const handleChangeMateriel = (e) => {
        
        SetPaimentStatus(e.target.value);
      };


      const handleSubmit = async(e) =>{
        e.preventDefault()
        
        const response = await fetch(Api.acceptPaiement.url,{
          method : Api.acceptPaiement.method,
          credentials : 'include',
          headers : {
            "content-type" : "application/json"
          },
          body : JSON.stringify({
            idAnalyse: idAnalyse
            
          })
        })
    
        const responseData = await response.json()
    
        if(responseData.success){
            toast.success(responseData?.message)
            onClose();
            callFunc();
        }
    
    
        if(responseData.error){
          toast.error(responseData?.message)
        }
      
    
      }

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-50 flex justify-between items-center bg-slate-200 bg-opacity-50">
    <div className="mx-auto bg-white shadow-md p-4 w-full max-w-sm rounded-lg">
    
             <div className='flex justify-between items-center pb-3'>
                 <h2 className='font-bold text-lg'>Voir Paiement</h2>
                 <div className='w-fit ml-auto text-xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                     <CgClose/>
                 </div>
             </div>


             <div className=" flex justify-center text-center">
          {
                    fichierPaiment!=="" &&(
                        <img className="w-full  rounded-full" src={process.env.REACT_APP_API_URL+fichierPaiment} alt=""/>
                    )
                }
          </div>

          <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
          <label htmlFor='matiere' className='mt-3'>Acceptation paiement :</label>
               <select required  name='paimentStatus' onChange={handleChangeMateriel} className='p-2 bg-slate-100 border rounded'
               disabled={fichierPaiment===""}
               >
                   <option value={""}>paiement</option>
                   <option value={true}>Accepter</option>
                   <option value={false}>Rejeter</option>
               </select>

<button className='px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700'
 disabled={fichierPaiment===""}
>Modifier </button>
</form>
             </div>
             </div>
  )
}

DetailDemande.propTypes = {}

export default DetailDemande
