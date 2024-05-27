import React, { useEffect } from "react";

const ToastProfile = ({ closeToast }) => {
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
      <div className="fixed min-h-8 w-[340px] top-0 right-[40%] flex border-l-4 border-green-400 bg-main-color text-white p-2 rounded-tl-[4px] rounded-bl-[4px] shadow-md animation-topIn z-10">
        <div className="pr-3 pl-1 flex items-center">
          <i className="fa-sharp fa-solid fa-circle-check text-lg text-green-500"></i>
        </div>
        <div className="">
          <h3 className="">Success</h3>
          <p>You have successfully sent the email. Thank you!</p>
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

export default ToastProfile;
