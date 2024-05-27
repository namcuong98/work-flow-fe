import React from "react";
import { Link, Outlet } from "react-router-dom";

const HomeLogin = () => {
  return (
    <>
      <div className="backgroundLogin sticky">
        <header className="absolute flex justify-between items-center w-screen py-5 px-24 top-0 left-0 text-white">
          <h2 className="font-black text-xl">Logo</h2>
          <nav className="flex gap-8 items-center font-medium relative">
            <div className="animate-bounce bg-transparent text-base absolute top-[60px] flex flex-col items-center left-[-16px]">
              <i class="fa-solid fa-arrow-up"></i>
              <p>Reference</p>
            </div>
            <Link to={"/profile"}>
              <p className="active cursor-pointer">Profile</p>
            </Link>
            <Link to={"/login"}>
              <button className="px-8 py-2 border-2 rounded-lg hover:bg-white hover:text-[#162938] active-default">
                Login
              </button>
            </Link>
          </nav>
        </header>
        <div className="flex items-center justify-center m-auto h-screen">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default HomeLogin;
