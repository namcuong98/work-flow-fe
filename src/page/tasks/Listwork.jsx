import React, { useEffect, useState } from "react";
import SubTasks from "../subtasks/SubTasks";
import EditTask from "./EditTask";
import moment from "moment";
import ButtonAction from "../actionEdit/ButtonAction";
import {
  getTokenLocalstorage,
  loggedInInstance,
  useStateContext,
} from "../until/Until";
import Notfound from "../components/Notfound";
import { useNavigate } from "react-router-dom";

const Listwork = () => {
  const { actionLoading } = useStateContext();
  const navigate = useNavigate();
  const [openSubTasks, SetOpenSubTasks] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [taskName, setTaskName] = useState("");
  const [modal, setModal] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);
  const [word, setWord] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  let timeOut = null;

  useEffect(() => {
    setLoadingData(!loadingData);
  }, [actionLoading]);

  const handleFindData = (e) => {
    setWord(e.target.value);
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      setDebouncedValue(e.target.value);
    }, 1500);
  };

  const callAPI = () => {
    loggedInInstance({
      url: "/task-find",
      method: "POST",
      data: { word, currentPage },
    })
      .then((res) => {
        const lengthData = Math.ceil(res.data.paginateFind / pageSize);
        setTotalPage(lengthData);
        setPaginatedData(res.data.tasksFind);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setCurrentPage(1);
    loggedInInstance({
      url: "/task-find",
      method: "POST",
      data: { word: debouncedValue, currentPage },
    })
      .then((res) => {
        const lengthData = Math.ceil(res.data.paginateFind / pageSize);
        setTotalPage(lengthData);
        setPaginatedData(res.data.tasksFind);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [debouncedValue]);

  useEffect(() => {
    if (!getTokenLocalstorage()) {
      navigate("/login");
    }
    callAPI();
  }, [currentPage, modal, openSubTasks, loadingData]);

  return (
    <>
      <div className="mt-[26px] ">
        <div className="flex items-center ml-6">
          <p className="font-bold text-base">Find Task :</p>
          <input
            onChange={handleFindData}
            value={word}
            type="text"
            placeholder="Search Name work..."
            className="py-[2px] w-[20%] h-[30px] ml-2 outline-none text-black bg-transparent border-b-2"
          />
        </div>
        <div className="wrap-table">
          <table>
            <thead className="bg-white py-2">
              <tr className="">
                <th className="text-center w-[30px]">STT</th>
                <th className="w-[300px] text-center">Name Work</th>
                <th className="w-[100px] text-center">Start Time</th>
                <th className="w-[100px] text-center">End Time</th>
                <th className="text-center">Note</th>
                <th className="w-[80px] text-center">Progress</th>
                <th className="w-[100px] text-center">Edit</th>
                <th className="w-[120px] text-center">Complete</th>
              </tr>
            </thead>
            <tbody className="bg-[#eef2f4] bg-opacity-90 justify-center">
              {paginatedData && paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={8}>
                    <Notfound />
                  </td>
                </tr>
              ) : (
                paginatedData &&
                paginatedData.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      onClick={() => {
                        setTaskName(item.name);
                        setTaskId(item.id);
                      }}
                    >
                      <td>{(currentPage - 1) * pageSize + index + 1}</td>
                      <td>{item.name}</td>
                      <td>
                        {moment(item.start_time).format("DD/MM/YYYY h:mm A")}
                      </td>
                      <td>
                        {moment(item.end_time).format("DD/MM/YYYY h:mm A")}
                      </td>
                      <td>{item.note}</td>
                      <td>{item.taskComplate}%</td>
                      <td>
                        <ButtonAction
                          taskId={item.id}
                          open={() => {
                            SetOpenSubTasks(!openSubTasks);
                          }}
                          modal={setModal}
                          path={`/home/listwork/list-subtask/:${item.id}`}
                        />
                      </td>
                      <td>
                        <div className="w-full flex justify-center">
                          <p
                            className="w-[60px] rounded-md"
                            style={
                              item.task_status === "done"
                                ? { background: "#e6faf3", color: "#297068" }
                                : { background: "#eff4fa", color: "#556092" }
                            }
                          >
                            {item.task_status}
                          </p>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className=" flex gap-5 items-center justify-end mr-2 text-black">
        <p className="">Page :</p>
        <i
          className="fa-solid fa-chevron-left cursor-pointer opacity-20 hover:opacity-100"
          onClick={() => {
            if (currentPage === 1) {
              return;
            }
            setCurrentPage(currentPage - 1);
          }}
        ></i>
        {[...Array(totalPage)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className="opacity-20 p-[2px] hover:opacity-100"
            style={{ opacity: currentPage === index + 1 && "1" }}
          >
            {index + 1}
          </button>
        ))}
        <i
          className="fa-solid fa-chevron-right cursor-pointer opacity-20 hover:opacity-100"
          onClick={() => {
            if (currentPage === totalPage) {
              return;
            }
            setCurrentPage(currentPage + 1);
          }}
        ></i>
      </div>
      {openSubTasks ? (
        <SubTasks taskName={taskName} taskId={taskId} close={SetOpenSubTasks} />
      ) : null}
      {modal && <EditTask taskId={taskId} close={setModal} />}
    </>
  );
};

export default Listwork;
