import React from "react";
import "../../style/style.css";
import { Outlet } from "react-router-dom";

const DataUser = () => {
  return (
    <>
      <div className="py-10 mx-3 text-white">
        <div className="flex py-3 border-b">
          <div className="w-[20%]">
            <div className="text-2xl font-light flex gap-[2%]">
              <span className="pl-[10%]">Tác vụ của tôi</span>
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
