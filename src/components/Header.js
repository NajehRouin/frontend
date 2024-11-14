import React, { useState, useContext, useEffect } from "react";

import { FaRegCircleUser } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TiMessage } from "react-icons/ti";
import Api from "../common";
import { toast } from "react-toastify";

import { setAdminDetails } from "../store/adminSlice";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlinePayment } from "react-icons/md";
import Context from "../context";
const Header = () => {
  const context = useContext(Context);

  const admin = useSelector((state) => state?.admin?.admin);
  const dispatch = useDispatch();

  const [menuDisplay, setMenuDisplay] = useState(false);
  const [notifactionUser, SetNotificationUser] = useState(false);

  const [notifactionDemandes, SetNotificationDemandes] = useState(false);
  const [notifactionPaiement, SetNotificationPaiement] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    const fetchData = await fetch(Api.logout_Admin.url, {
      method: Api.logout_Admin.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setAdminDetails(null));
      navigate("/");
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  const UpdateNotification = async (id) => {
    const dataResponse = await fetch(Api.updateNotification.url, {
      method: Api.updateNotification.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      context?.getNbNotifiactionUser();
      context?.getNbNotifiactionDemandes();
      context?.getAllNotification();
      context?.getAllNotificationDemandes();
      context?.getNbNotifiactionPaiement();
      context?.getAllNotificationPaiements();
      SetNotificationUser(false);
      SetNotificationDemandes(false);
    }

    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className=" h-full container mx-auto flex items-center px-4 justify-between">
        <div className="">
          <Link to={"/"}></Link>
        </div>

        <div className="flex items-center gap-7">
          <div className="relative flex justify-center">
            <div
              className="text-3xl cursor-pointer relative flex justify-center"
              onClick={() => SetNotificationPaiement((prev) => !prev)}
            >
              <MdOutlinePayment />
              <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-2/2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {context?.nbNotificationPaiement}
              </span>
            </div>

            {notifactionPaiement && (
              <div className="absolute box bg-white bottom-0 top-11 h-fit p-4 shadow-lg rounded w-auto md:w-auto">
                <nav>
                  <>
                    <div className="flex items-center space-x-2 md:space-x-4">
                      <h1 className="whitespace-nowrap  cursor-pointer hover:text-blue-500 hover:underline">
                        {context?.nbNotificationPaiement} Nouveau Virement
                      </h1>
                    </div>

                    {context?.allNotificationsPaiement?.map((el, index) => (
                      <div
                        key={index}
                        className=" bg-slate-200 rounded-lg h-12 justify-center text-start p-1 cursor-pointer mt-1"
                        onClick={() => {
                          UpdateNotification(el?._id);
                          navigate("/admin-panel/liste-demande");
                        }}
                      >
                        <hr />
                        <span className=" font-bold">{el?.message} </span>
                        <hr />
                      </div>
                    ))}
                  </>
                </nav>
              </div>
            )}
          </div>

          <div className="relative flex justify-center">
            <div
              className="text-3xl cursor-pointer relative flex justify-center"
              onClick={() => SetNotificationDemandes((prev) => !prev)}
            >
              <IoIosNotificationsOutline />
              <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-2/2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {context?.nbNotificationDemande}
              </span>
            </div>

            {notifactionDemandes && (
              <div className="absolute box bg-white bottom-0 top-11 h-fit p-4 shadow-lg rounded w-auto md:w-auto">
                <nav>
                  <>
                    <div className="flex items-center space-x-2 md:space-x-4">
                      <h1 className="whitespace-nowrap  cursor-pointer hover:text-blue-500 hover:underline">
                        {context?.nbNotificationDemande} Nouveau Demandes
                      </h1>
                    </div>

                    {context?.allNotificationsDemandes?.map((el, index) => (
                      <div
                        key={index}
                        className=" bg-slate-200 rounded-lg h-12 justify-center text-start p-1 cursor-pointer mt-1"
                        onClick={() => {
                          UpdateNotification(el?._id);
                          navigate("/admin-panel/liste-demande");
                        }}
                      >
                        <hr />
                        <span className=" font-bold">{el?.message} </span>
                        <hr />
                      </div>
                    ))}
                  </>
                </nav>
              </div>
            )}
          </div>
          <div className="relative flex justify-center">
            <div
              className="text-3xl cursor-pointer relative flex justify-center"
              onClick={() => SetNotificationUser((prev) => !prev)}
            >
              <TiMessage />
              <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-2/2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {context?.nbNotificationUser}
              </span>
            </div>

            {notifactionUser && (
              <div className="absolute box bg-white bottom-0 top-11 h-fit p-4 shadow-lg rounded w-auto md:w-auto">
                <nav>
                  <>
                    <div className="flex items-center space-x-2 md:space-x-4">
                      <h1 className="whitespace-nowrap  cursor-pointer hover:text-blue-500 hover:underline">
                        {context?.nbNotificationUser} Nouveau Utilisateurs
                      </h1>
                    </div>

                    {context?.allNotifications?.map((el, index) => (
                      <div
                        key={index}
                        className=" bg-slate-200 rounded-lg h-12 justify-center text-start p-1 cursor-pointer"
                        onClick={() => {
                          UpdateNotification(el?._id);
                          navigate("/admin-panel/users");
                        }}
                      >
                        <hr />
                        <span className=" font-bold">{el?.message} </span>
                        <hr />
                      </div>
                    ))}
                  </>
                </nav>
              </div>
            )}
          </div>

          <div className="relative flex justify-center">
            {admin?._id && (
              <div
                className="text-3xl cursor-pointer relative flex justify-center"
                onClick={() => setMenuDisplay((preve) => !preve)}
              >
                {admin?.photo ? (
                  <img
                    src={process.env.REACT_APP_API_URL + admin?.photo}
                    className="w-10 h-10 rounded-full"
                    alt={admin?.name}
                  />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
            )}

            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-4 shadow-lg rounded w-auto md:w-auto">
                <nav>
                  <>
                    <div className="flex items-center space-x-2 md:space-x-4">
                      <FaHome />
                      <Link
                        to={"/admin-panel/users"}
                        className="whitespace-nowrap hover:bg-slate-100"
                        onClick={() => setMenuDisplay((prev) => !prev)}
                      >
                        Admin Panel
                      </Link>
                    </div>
                  </>
                </nav>
              </div>
            )}
          </div>

          <div>
            {admin?._id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/"}
                className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
