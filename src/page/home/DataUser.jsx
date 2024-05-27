import React from "react";
import "../../style/style.css";
import { Outlet } from "react-router-dom";

const DataUser = () => {
  return (
    <>
      <div className="text-[#162938] mr-5 bg-[#fbf8ff] p-8 h-full rounded-3xl">
        <div className="flex px-4 pb-4 border-b border-[#162938]">
          <div className="w-[20%]">
            <div className="text-2xl font-light flex gap-[2%]">
              <span className="pl-[10%]">My Task</span>
              <i className="fa-xs fa-regular fa-star"></i>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default DataUser;
