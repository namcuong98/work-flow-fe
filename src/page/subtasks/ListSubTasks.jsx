import React, { useEffect, useState } from "react";
import { loggedInInstance } from "../until/Until";
import { useParams } from "react-router-dom";
import EditSubTask from "./EditSubTask";
import moment from "moment";
import Notfound from "../components/Notfound";
import ButtonAction from "../actionEdit/ButtonAction";

const ListSubTasks = () => {
  const { taskId } = useParams();
  const [subTaskId, setSubTaskId] = useState("");
  const [subTasksData, setSubTaskData] = useState();
  const [modal, setModal] = useState(false);
  const user_id = localStorage.getItem("id");

  useEffect(() => {
    loggedInInstance({
      url: `/subtask/:${user_id}/:${taskId}`,
      method: "GET",
    })
      .then((res) => {
        console.log(res.data.subTaskData);
        setSubTaskData(res.data.subTaskData);
        return;
      })
      .catch((err) => {
        console.log(err);
      });
  }, [subTasksData]);

  return (
    <>
      <table class="w-full rounded-md text-black mt-3 ">
        <thead className="bg-white py-2">
          <tr className="">
            <th className="text-center w-[30px]">STT</th>
            <th className="text-center w-[200px]">Name Work</th>
            <th className="text-center w-[100px]">Start Time</th>
            <th className="text-center w-[100px]">End Time</th>
            <th className="text-center">Note</th>
            <th className="text-center w-[100px]">Edit</th>
            <th className="text-center w-[110px]">Complete</th>
          </tr>
        </thead>
        <tbody className="bg-[#eef2f4] bg-opacity-90 justify-center w-full">
          {subTasksData && subTasksData.length === 0 ? (
            <tr>
              <td colSpan={7}>
                <Notfound />
              </td>
            </tr>
          ) : (
            subTasksData &&
            subTasksData.map((item, index) => {
              return (
                <tr
                  id={index + 1}
                  key={index}
                  onClick={() => setSubTaskId(item.id)}
                >
                  <td className="text-center p-3">{index + 1}</td>
                  <td className="text-center p-3">{item.name}</td>
                  <td className="text-center p-3">
                    {moment(item.start_time).format("DD/MM/YYYY h:mm A")}
                  </td>
                  <td className="text-center p-3">
                    {moment(item.end_time).format("DD/MM/YYYY h:mm A")}
                  </td>
                  <td className="text-center p-3">{item.note}</td>
                  <td className="text-center p-3">
                    <ButtonAction
                      editSubTask={setModal}
                      taskId={item.task_id}
                      subTaskId_list={subTaskId}
                    />
                  </td>
                  <td className="text-center p-3">{item.status}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      {modal && (
        <EditSubTask
          subTaskId={subTaskId}
          editSubTask_taskId={taskId}
          editSubTask={setModal}
        />
      )}
    </>
  );
};

export default ListSubTasks;
