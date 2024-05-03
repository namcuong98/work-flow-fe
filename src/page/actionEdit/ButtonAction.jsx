import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loggedInInstance } from "../until/Until";

const ButtonAction = ({
  taskId,
  open,
  modal,
  path,
  subTaskId_list,
  editSubTask,
}) => {
  const [openEdit, setOpenEdit] = useState(false);
  const buttonRef = useRef();
  const navigate = useNavigate();

  const handlePopUp = (e) => {
    if (buttonRef.current && !buttonRef.current.contains(e.target)) {
      setOpenEdit(false);
    }
  };

  const openchild = () => {
    setOpenEdit(!openEdit);
    open();
    navigate(path);
  };

  const handleDeleteTask = () => {
    loggedInInstance({
      url: `task-delete?task_id=${taskId}`,
      method: "DELETE",
    })
      .then((res) => {
        console.log(res);
        setOpenEdit(false);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteSubTask = () => {
    loggedInInstance({
      url: `subTask-delete?task_id=${taskId}&sub_task_id=${subTaskId_list}`,
      method: "DELETE",
    })
      .then((res) => {
        setOpenEdit(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    document.addEventListener("click", handlePopUp);
  }, [buttonRef.current]);

  return (
    <>
      <div className="px-5 py-3 relative" ref={buttonRef}>
        <button
          onClick={() => {
            setOpenEdit(!openEdit);
          }}
        >
          <i class="fa-solid fa-pen-to-square"></i>
          {openEdit && (
            <div className="absolute bg-white rounded-xl z-10 text-sm popupSupport">
              {!subTaskId_list && (
                <div
                  className="px-2 pt-2 hover:bg-slate-200"
                  onClick={openchild}
                >
                  SubTask
                </div>
              )}
              <div
                className="p-1 hover:bg-slate-200"
                onClick={() => {
                  !subTaskId_list ? modal(true) : editSubTask(true);
                }}
              >
                Edit
              </div>
              <div
                className="px-2 pb-2 hover:bg-slate-200"
                onClick={() => {
                  !subTaskId_list ? handleDeleteTask() : handleDeleteSubTask();
                }}
              >
                Delete
              </div>
            </div>
          )}
        </button>
      </div>
    </>
  );
};

export default ButtonAction;
