import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { ValidateCreateTasks } from "../components/Validation";
import { useStateContext } from "../until/Until";

const CreateSubTask = () => {
  const { taskId } = useParams();
  const task_id = taskId.replace(":", "");
  const info = {
    name: null,
    start_time: new Date(),
    end_time: null,
    note: "",
    task_id,
    status: "doing",
  };
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState();
  const { updateToastCreateSubTask, updateMessageToast } = useStateContext();
  const [error, setError] = useState(info);
  const [data, setData] = useState(info);

  const handleData = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleClose = () => {
    navigate(`/home/listwork/list-subtask/${taskId}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(ValidateCreateTasks(data));
  };

  useEffect(() => {
    if (error.name === "" && error.end_time === "") {
      axios
        .post("https://work-flow-be-1.onrender.com:8081/subtask-create", data)
        .then((res) => {
          updateMessageToast("You create SubTask complete");
          updateToastCreateSubTask(true);
          setData(info);
          handleClose();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [error]);

  return (
    <>
      <div className="fixed top-0 bottom-0 right-0 left-0 flex items-center justify-center bg-opacity-70 bg-[#162938] text-white animate-[animation-zoom_ease-in_0.3s]">
        <div className=" p-[20px] bg-[#162938] border-2 border-[#162938] rounded-xl">
          <div className="mt-[8px] flex items-end gap-9  relative">
            <div>
              <p className="font-semibold ml-6 animation-noflicker">SubTask</p>
              <p className="font-semibold ml-6 animation-flicker">Notes</p>
            </div>
            <p className="">
              Date : {moment(info.start_time).format("DD/MM/YYYY")}
            </p>
            <p
              onClick={handleClose}
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
                    setData({
                      ...data,
                      start_time: moment(date).utcOffset(420).format(),
                    });
                    setStartDate(date);
                  }}
                  timeInputLabel="Time:"
                  dateFormat="dd/MM/YYYY h:mm aa"
                  showTimeInput
                  name="start_time"
                  className="min-w-[300px] outline-none border-b border-b-gray-600 bg-transparent"
                  autoComplete="off"
                />
              </div>
              <div>
                <div className="flex items-end">
                  <span className="mx-1">End Time :</span>
                  <DatePicker
                    className="min-w-[300px] outline-none border-b border-b-gray-600 bg-transparent"
                    selected={endDate}
                    onChange={(date) => {
                      setData({
                        ...data,
                        end_time: moment(date).utcOffset(420).format(),
                      });
                      setEndDate(date);
                    }}
                    timeInputLabel="Time:"
                    dateFormat="dd/MM/YYYY h:mm aa"
                    showTimeInput
                    name="end_time"
                    autoComplete="off"
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
                <option value="doing">doing</option>
                <option value="done">done</option>
              </select>
              <textarea
                className="h-[100px] text-black resize-none"
                type="text"
                onChange={handleData}
                value={data.note}
                name="note"
              />
              <button
                className=" p-2 bg-yellow-500 text-black active-default hover:bg-yellow-600 outline-none"
                onClick={handleSubmit}
              >
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateSubTask;
