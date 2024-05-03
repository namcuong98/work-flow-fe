import React, { useEffect, useState } from "react";
import { loggedInInstance, useStateContext } from "../until/Until";
import SubTasks from "../subtasks/SubTasks";
import moment from "moment";
import ButtonAction from "../actionEdit/ButtonAction";
import EditTask from "../tasks/EditTask";

const TaskOverdue = () => {
  const { actionLoading } = useStateContext();
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [openSubTasks, SetOpenSubTasks] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [taskName, setTaskName] = useState("");
  const [loadingData, setLoadingData] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);

  useEffect(() => {
    setLoadingData(!loadingData);
  }, [actionLoading]);

  useEffect(() => {
    loggedInInstance({
      url: `/task-overdue`,
    })
      .then((res) => {
        const resData = res.data.taskOverdue;
        const callTotalPage = Math.ceil(resData.length / pageSize);
        setTotalPage(callTotalPage);
        setData(res.data.taskOverdue);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loadingData]);

  useEffect(() => {
    const paginateData = data.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );
    setPaginatedData(paginateData);
    console.log(paginateData);
  }, [data, currentPage, pageSize]);

  return (
    <>
      <div className="min-h-[400px]">
        <table class=" w-full rounded-md text-black mt-3">
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
            {paginatedData.map((item, index) => {
              return (
                <>
                  <tr
                    key={index}
                    onClick={() => {
                      setTaskName(item.name);
                      setTaskId(item.id);
                    }}
                  >
                    <td className="p-3 text-center">
                      {(currentPage - 1) * pageSize + index + 1}
                    </td>
                    <td className="text-center p-3">{item.name}</td>
                    <td className="text-center p-3">
                      {moment(item.start_time).format("DD/MM/YYYY h:mm A")}
                    </td>
                    <td className="text-center p-3">
                      {moment(item.end_time).format("DD/MM/YYYY h:mm A")}
                    </td>
                    <td className="text-center p-3">{item.note}</td>
                    <td className="text-center p-3">{item.taskComplate}%</td>
                    <td className="text-center p-3">
                      <ButtonAction
                        taskId={item.id}
                        open={() => {
                          SetOpenSubTasks(!openSubTasks);
                        }}
                        modal={setModal}
                        path={`/home/overdue/list-subtask/:${item.id}`}
                      />
                    </td>
                    <td className="text-center p-3">{item.status}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex gap-5 items-center justify-end text-black">
        <i
          className="fa-solid fa-chevron-left cursor-pointer"
          onClick={() => {
            if (currentPage === 1) {
              return;
            }
            setCurrentPage(currentPage - 1);
          }}
        ></i>
        {[...Array(totalPage)].map((_, index) => (
          <button
            onClick={() => setCurrentPage(index + 1)}
            style={{ color: currentPage === index + 1 && "blue" }}
          >
            {index + 1}
          </button>
        ))}
        <i
          className="fa-solid fa-chevron-right cursor-pointer"
          onClick={() => {
            if (currentPage === totalPage) {
              return;
            }
            setCurrentPage(currentPage + 1);
          }}
        ></i>
      </div>
      {openSubTasks ? (
        <SubTasks
          taskName={taskName}
          taskId={taskId}
          close={SetOpenSubTasks}
          idTaskOverdue={true}
          path={`/home/overdue/list-subtask/:${taskId}`}
        />
      ) : null}
      {modal && <EditTask taskId={taskId} close={setModal} />}
    </>
  );
};

export default TaskOverdue;
