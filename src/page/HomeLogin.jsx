import React from "react";
import { Link, Outlet } from "react-router-dom";

const HomeLogin = () => {
  return (
    <>
      <div className="backgroundLogin fixed">
        <header className=" flex justify-between items-center w-screen py-5 px-24 top-0 left-0 text-white">
          <h2 className="font-black text-xl">Logo</h2>
          <nav className="flex gap-8 items-center font-medium">
            <Link to={"/notfound"}>
              <p className="active" href="">
                Home
              </p>
            </Link>
            <p className="active" href="">
              About
            </p>
            <p className="active" href="">
              Services
            </p>
            <p className="active" href="">
              Contact
            </p>
            <Link to={"/login"}>
              <button className="px-8 py-2 border-2 rounded-lg hover:bg-white hover:text-[#162938] active-default">
                Login
              </button>
            </Link>
          </nav>
        </header>
        <div className="flex items-center m-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default HomeLogin;
