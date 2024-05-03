import React, { useEffect } from "react";
import { useStateContext } from "../until/Until";

const Toast = ({ closeToast }) => {
  const { messageToast } = useStateContext();

  useEffect(() => {
    setTimeout(() => {
      closeToast(false);
    }, 3000);
  }, []);

  const handleRemove = () => {
    closeToast(false);
  };

  return (
    <>
      <div className="fixed min-h-8 min-w-8 top-[100px] right-0 flex border-l-4 border-green-400 bg-[#162938] text-white p-2 rounded-tl-[4px] rounded-bl-[4px] shadow-md animation-fadeInOut z-10">
        <div className="pr-3 pl-1 flex items-center">
          <i className="fa-sharp fa-solid fa-circle-check text-lg text-green-500"></i>
        </div>
        <div class="">
          <h3 class="">Success</h3>
          <p>{messageToast}</p>
        </div>
        <div className="">
          <i
            className="fa-solid fa-xmark cursor-pointer text-base"
            onClick={handleRemove}
          ></i>
        </div>
      </div>
    </>
  );
};

export default Toast;
