import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Context from "./context";
import { setAdminDetails } from "./store/adminSlice";
import Api from "./common";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [allNotifications, SetAllNotifications] = useState([]);
  const [allNotificationsDemandes, SetAllNotificationsDemandes] = useState([]);

  const [allNotificationsPaiement, SetAllNotificationsPaiement] = useState([]);

  const [nbNotificationUser, SetNbNotificationUser] = useState(0);
  const [nbNotificationDemande, SetNbNotificationDemande] = useState(0);
  const [nbNotificationPaiement, SetNbNotificationPaiement] = useState(0);
  const fetchAdminDetails = async () => {
    const dataResponse = await fetch(Api.current_admin.url, {
      method: Api.current_admin.method,
      credentials: "include",
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      dispatch(setAdminDetails(dataApi.data));
    }
    if (dataApi.error) {
      navigate("/");
    }
  };

  const getNbNotifiactionUser = async () => {
    const fetchData = await fetch(Api.numberNotification.url, {
      method: Api.numberNotification.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      SetNbNotificationUser(data?.data);
    }
  };

  const getNbNotifiactionDemandes = async () => {
    const fetchData = await fetch(Api.numberNotificationDemande.url, {
      method: Api.numberNotificationDemande.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      SetNbNotificationDemande(data?.data);
    }
  };

  const getNbNotifiactionPaiement = async () => {
    const fetchData = await fetch(Api.numberNotificationPaiement.url, {
      method: Api.numberNotificationPaiement.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      SetNbNotificationPaiement(data?.data);
    }
  };

  const getAllNotification = async () => {
    const fetchData = await fetch(Api.allNotification.url, {
      method: Api.allNotification.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      SetAllNotifications(data?.data);
    }
  };

  const getAllNotificationDemandes = async () => {
    const fetchData = await fetch(Api.allNotificationDemande.url, {
      method: Api.allNotificationDemande.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      SetAllNotificationsDemandes(data?.data);
    }
  };

  const getAllNotificationPaiements = async () => {
    const fetchData = await fetch(Api.allNotificationPaiement.url, {
      method: Api.allNotificationPaiement.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      SetAllNotificationsPaiement(data?.data);
    }
  };

  useEffect(() => {
    fetchAdminDetails();
    getNbNotifiactionUser();
    getNbNotifiactionDemandes();
    getAllNotification();
    getAllNotificationDemandes();
    getNbNotifiactionPaiement();
    getAllNotificationPaiements();
  }, [nbNotificationUser, nbNotificationDemande]);

  return (
    <>
      <Context.Provider
        value={{
          fetchAdminDetails,

          nbNotificationUser,
          getNbNotifiactionUser,

          nbNotificationDemande,
          getNbNotifiactionDemandes,

          allNotifications,
          getAllNotification,

          allNotificationsDemandes,
          getAllNotificationDemandes,

          nbNotificationPaiement,
          getNbNotifiactionPaiement,

          allNotificationsPaiement,
          getAllNotificationPaiements,
        }}
      >
        <ToastContainer position="top-center" />
        <Header />
        <main className="min-h-[calc(100vh-120px)] pt-16">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
