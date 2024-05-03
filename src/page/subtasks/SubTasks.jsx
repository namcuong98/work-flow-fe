import React from "react";
// import "../../../style/style.css";
import { Link, Outlet } from "react-router-dom";
import { useStateContext } from "../until/Until";
import Toast from "../components/Toast";

const SubTasks = ({ taskId, taskName, close, idTaskOverdue }) => {
  const { activatedToastSubTask, updateToastCreateSubTask } = useStateContext();

  return (
    <>
      <div className="bg-opacity-70 bg-slate-500 absolute top-0 bottom-0 left-0 right-0 flex">
        <div className="relative w-full animation-fadeIn">
          <div className=" absolute top-0 right-0 w-[70%] bg-red-500 h-full ">
            <div className="p-6 bg-slate-400 flex justify-between items-center">
              <div className="text-lg  flex items-center">
                <p className="mr-3 font-medium">{taskName}</p>
                <i className="fa-solid fa-link"></i>
              </div>
              <button className="p-3 " onClick={() => close(false)}>
                X
              </button>
            </div>
            <div className="border m-4 rounded-2xl p-3">
              <div className="flex justify-end">
                {!idTaskOverdue ? (
                  <>
                    <Link to={`/home/listwork/subtask-create/:${taskId}`}>
                      <button className="btndefault hover:bg-white hover:text-[#162938] active-default">
                        <i className="fa-solid fa-plus mr-1"></i>
                        <span>ADD</span>
                      </button>
                    </Link>
                  </>
                ) : null}
                {activatedToastSubTask ? (
                  <Toast closeToast={updateToastCreateSubTask} />
                ) : null}
              </div>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default SubTasks;
