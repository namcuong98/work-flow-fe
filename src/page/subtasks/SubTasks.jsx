import React from "react";
// import "../../../style/style.css";
import { Link, Outlet } from "react-router-dom";
import { useStateContext } from "../until/Until";
import Toast from "../components/Toast";

const SubTasks = ({
  taskId,
  taskName,
  close,
  idTaskOverdue,
  isTaskDeadline,
}) => {
  const { activatedToastSubTask, updateToastCreateSubTask } = useStateContext();

  return (
    <>
      <div className="bg-opacity-70 bg-slate-500 absolute top-0 bottom-0 left-0 right-0 flex overflow-hidden">
        <div className="relative w-full animation-fadeIn">
          <div className="absolute top-0 right-0 w-[70%] backGround-subtask h-full">
            <div className="p-6 bg-[#162938] flex justify-between items-center text-white">
              <div className="text-lg  flex items-center">
                <p className="mr-3 font-medium">{taskName}</p>
                <i className="fa-solid fa-link"></i>
              </div>
              <button className="p-3 " onClick={() => close(false)}>
                X
              </button>
            </div>
            <div className="flex justify-end mr-5 mt-2">
              {!idTaskOverdue ? (
                <Link to={`/home/listwork/subtask-create/:${taskId}`}>
                  <button className="btndefault text-[#162938] bg-[#f3ebff] hover:bg-[#8e6363] hover:text-white p-1 mt-1 rounded-[6px] active-default">
                    <i className="fa-solid fa-plus mr-1"></i>
                    <span>ADD</span>
                  </button>
                </Link>
              ) : null}
              {isTaskDeadline ? (
                <Link to={`/home/deadline/subtask-create/:${taskId}`}>
                  <button className="btndefault text-[#162938] bg-[#f3ebff] hover:bg-[#8e6363] hover:text-white p-1 mt-1 rounded-[6px] active-default">
                    <i className="fa-solid fa-plus mr-1"></i>
                    <span>ADD</span>
                  </button>
                </Link>
              ) : null}
              {activatedToastSubTask ? (
                <Toast closeToast={updateToastCreateSubTask} />
              ) : null}
            </div>
            <div className="border m-4 rounded-2xl px-3 pb-3">
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
