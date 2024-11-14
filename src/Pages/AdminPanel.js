import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaRegCircleUser } from "react-icons/fa6";
import { BiCategoryAlt } from "react-icons/bi";

import { FaUsers } from "react-icons/fa";
import { Link, Outlet, useLocation } from "react-router-dom";
import { IoReceiptSharp } from "react-icons/io5";
import { IoIosInformationCircle } from "react-icons/io";
import { CgComponents } from "react-icons/cg";
const AdminPanel = () => {
  const admin = useSelector((state) => state?.admin?.admin);

  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage mobile menu

  const isActive = (path) => location.pathname === path;

  useEffect(() => {}, [admin]);

  return (
    <div className="min-h-[calc(100vh-120px)] flex flex-col md:flex-row">
      <header className="bg-white p-4 flex justify-between items-center md:hidden">
        <div className="flex items-center">
          {admin?.photo ? (
            <img
              src={process.env.REACT_APP_API_URL + admin?.photo}
              className="w-10 h-10 rounded-full"
              alt={admin?.name}
            />
          ) : (
            <FaRegCircleUser className="text-2xl" />
          )}
          <div className="ml-2">
            <p className="capitalize text-lg font-semibold">{admin?.name}</p>
            <p className="text-sm">{admin?.email}</p>
          </div>
        </div>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-2xl focus:outline-none"
        >
          {isMenuOpen ? "✖️" : "☰"}
        </button>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="bg-white p-4 md:hidden">
          <Link
            to="/admin-panel/users"
            className={`block px-2 py-1 rounded-full mt-2 ${
              isActive("/admin-panel/users")
                ? "bg-slate-300"
                : "hover:bg-slate-500"
            }`}
          >
            <FaUsers className="mr-2 w-5 h-5 inline" /> Liste des clients
          </Link>

          <Link
            to="/admin-panel/liste-demande"
            className={`block px-2 py-1 rounded-full mt-2 ${
              isActive("/admin-panel/liste-demande")
                ? "bg-slate-300"
                : "hover:bg-slate-500"
            }`}
          >
            <IoReceiptSharp className="mr-2 w-5 h-5 inline" /> Liste des
            demandes
          </Link>

          <Link
            to="/admin-panel/materiel"
            className={`block px-2 py-1 rounded-full mt-2 ${
              isActive("/admin-panel/materiel")
                ? "bg-slate-300"
                : "hover:bg-slate-500"
            }`}
          >
            <BiCategoryAlt className="mr-2 w-5 h-5 inline" /> Matières
          </Link>

          <Link
            to="/admin-panel/components"
            className={`block px-2 py-1 rounded-full mt-2 ${
              isActive("/admin-panel/components")
                ? "bg-slate-300"
                : "hover:bg-slate-500"
            }`}
          >
            <CgComponents className="mr-2 w-5 h-5 inline" /> Composants
          </Link>

          <Link
            to="/admin-panel/information"
            className={`block px-2 py-1 rounded-full mt-2 ${
              isActive("/admin-panel/information")
                ? "bg-slate-300"
                : "hover:bg-slate-500"
            }`}
          >
            <IoIosInformationCircle className="mr-2 w-5 h-5 inline" />{" "}
            information
          </Link>
        </nav>
      )}

      {/* Sidebar for larger screens */}
      <aside className="bg-white min-h-full w-full max-w-60 customShadow hidden md:block">
        <div className="h-32 flex justify-center items-center flex-col">
          <div className="text-5xl cursor-pointer relative flex justify-center">
            {admin?.photo ? (
              <img
                src={process.env.REACT_APP_API_URL + admin?.photo}
                className="w-20 h-20 rounded-full"
                alt={admin?.name}
              />
            ) : (
              <FaRegCircleUser />
            )}
          </div>
          <p className="capitalize text-lg font-semibold">{admin?.name}</p>
          <p className="text-sm">{admin?.email}</p>
        </div>

        <nav className="grid p-4">
          <Link
            to="/admin-panel/users"
            className={`flex items-center px-2 py-1 rounded-full mt-2 ${
              isActive("/admin-panel/users")
                ? "bg-slate-300"
                : "hover:bg-slate-500"
            }`}
          >
            <FaUsers className="mr-2 w-10 h-6" /> Liste des clients
          </Link>

          <Link
            to="/admin-panel/liste-demande"
            className={`flex items-center px-2 py-1 rounded-full mt-2 ${
              isActive("/admin-panel/liste-demande")
                ? "bg-slate-300"
                : "hover:bg-slate-500"
            }`}
          >
            <IoReceiptSharp className="mr-2 w-10 h-6" /> Liste des demandes
          </Link>

          <Link
            to="/admin-panel/materiel"
            className={`flex items-center px-2 py-1 rounded-full mt-2 ${
              isActive("/admin-panel/materiel")
                ? "bg-slate-300"
                : "hover:bg-slate-500"
            }`}
          >
            <BiCategoryAlt className="mr-2 w-10 h-6" /> Matières
          </Link>

          <Link
            to="/admin-panel/components"
            className={`flex items-center px-2 py-1 rounded-full mt-2 ${
              isActive("/admin-panel/components")
                ? "bg-slate-300"
                : "hover:bg-slate-500"
            }`}
          >
            <CgComponents className="mr-2 w-10 h-6" /> Composants
          </Link>

          <Link
            to="/admin-panel/information"
            className={`flex items-center px-2 py-1 rounded-full mt-2 ${
              isActive("/admin-panel/information")
                ? "bg-slate-300"
                : "hover:bg-slate-500"
            }`}
          >
            <IoIosInformationCircle className="mr-2 w-9 h-6" /> information
          </Link>
        </nav>
      </aside>

      <main className="w-full h-full p-2">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
