
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Context from './context';
import {setAdminDetails} from './store/adminSlice'
import Api from './common';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const fetchAdminDetails = async()=>{
    const dataResponse = await fetch(Api.current_admin.url,{
      method : Api.current_admin.method,
      credentials : 'include'
    })

    const dataApi = await dataResponse.json()

    

    if(dataApi.success){
      dispatch(setAdminDetails(dataApi.data))
    }
    if(dataApi.error){
      navigate('/')
    }
}

useEffect(()=>{
  fetchAdminDetails()
},[])


  return (
    <>
      <Context.Provider value={{
        fetchAdminDetails
      }}>
        <ToastContainer 
          position='top-center'
        />
          <Header/>
        <main className='min-h-[calc(100vh-120px)] pt-16'>
          <Outlet/>
        </main>
        <Footer/>
      </Context.Provider>
    </>
  );
}

export default App;
