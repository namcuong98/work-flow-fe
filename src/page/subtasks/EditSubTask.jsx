import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { loggedInInstance } from "../until/Until";
import { ValidateCreateTasks } from "../components/Validation";

const EditSubTask = ({ editSubTask_taskId, subTaskId, editSubTask }) => {
  const info = {
    name: null,
    start_time: null,
    end_time: null,
    note: null,
    status: null,
  };
  const taskId = editSubTask_taskId.replace(/:/g, "");
  const navigate = useNavigate();
  const [data, setData] = useState(info);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [error, setError] = useState(info);

  const handleData = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(ValidateCreateTasks(data));
  };
  useEffect(() => {
    if (error.name === "" && error.end_time === "") {
      loggedInInstance({
        url: `/subtask-update?task_id=${taskId}&sub_task_id=${subTaskId}`,
        method: "PUT",
        data: data,
      })
        .then((res) => {
          editSubTask();
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [error]);

  useEffect(() => {
    loggedInInstance({
      url: `/subtask-update?sub_task_id=${subTaskId}&task_id=${taskId}`,
    })
      .then((res) => {
        setData(res.data.subTaskData[0]);
        setStartDate(res.data.subTaskData[0].start_time);
        setEndDate(res.data.subTaskData[0].end_time);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="fixed top-0 bottom-0 right-0 left-0 flex items-center justify-center bg-opacity-70 bg-[#162938] animate-[animation-zoom_ease-in_0.3s]">
        <div className=" p-[20px] bg-[#162938] border-2 border-[#162938] rounded-xl">
          <div className="mt-[8px] flex items-end text-center  gap-9 text-white relative">
            <p className="font-semibold m-6 animation-flicker">Sub Task Edit</p>
            <p
              onClick={() => editSubTask()}
              className="absolute top-[-20px] right-[-16px] px-3 py-2 rounded-full cursor-pointer font-medium active-default"
            >
              X
            </p>
          </div>
          <div className="pt-14">
            <form action="" className="flex flex-col gap-3">
              <div>
                <div className="flex items-end">
                  <span className="mx-1">SubTask :</span>
                  <input
                    className="min-w-[300px] outline-none border-b border-b-gray-600 bg-transparent"
                    type="text"
                    name="name"
                    onChange={handleData}
                    value={data.name}
                  />
                </div>
                {error.name ? (
                  <span className="ml-2 text-xs text-red-400 italic">
                    {error.name}
                  </span>
                ) : null}
              </div>
              <div className="flex items-end">
                <span className="mx-1">Start Time :</span>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => {
                    setData({ ...data, start_time: date });
                    setStartDate(date);
                  }}
                  timeInputLabel="Time:"
                  dateFormat="dd/MM/YYYY h:mm aa"
                  showTimeInput
                  name="start_time"
                  className="min-w-[300px] outline-none border-b border-b-gray-600 bg-transparent"
                />
              </div>
              <div>
                <div className="flex items-end">
                  <span className="mx-1">End Time :</span>
                  <DatePicker
                    className="min-w-[300px] outline-none border-b border-b-gray-600 bg-transparent"
                    selected={endDate}
                    onChange={(date) => {
                      setData({ ...data, end_time: date });
                      setEndDate(date);
                    }}
                    timeInputLabel="Time:"
                    dateFormat="dd/MM/YYYY h:mm aa"
                    showTimeInput
                    name="end_time"
                  />
                </div>
                {error.end_time ? (
                  <span className="ml-2 text-xs text-red-400 italic">
                    {error.end_time}
                  </span>
                ) : null}
              </div>
              <select
                name="status"
                onChange={handleData}
                className="text-black"
              >
                <option value="doing">Doing</option>
                <option value="done">Done</option>
              </select>
              <textarea
                className="h-[100px] text-black"
                type="text"
                onChange={handleData}
                value={data.note}
                name="note"
              />
              <button
                className=" p-2 bg-yellow-500 text-black active-default hover:bg-yellow-600 outline-none"
                onClick={handleSubmit}
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditSubTask;