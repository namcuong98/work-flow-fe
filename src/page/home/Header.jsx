import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setLocalstorage } from "../until/Until";

export const Header = () => {
  // const [auth, setAuth] = useState(false)
  const navigate = useNavigate();
  const [name, setName] = useState("Đăng nhập");
  const [message, setMessage] = useState("");
  const [clock, setClock] = useState(new Date());

  const fomatNumber = (number) => {
    return number < 10 ? "0" + number : number;
  };

  useEffect(() => {
    const timerID = setInterval(() => setClock(new Date()), 1000);
    return function cleanup() {
      clearInterval(timerID);
    };
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8081/home").then((res) => {
      if (res.data.access_token) {
        const userName = res.data.email.replace("@gmail.com", "");
        setName(userName);
      } else {
        setMessage(res.data.message);
        console.log("message");
      }
    });
  }, []);

  return (
    <>
      <header className="my-5 ml-[2%] flex gap-[50px] h-[40px] items-center text-white bg-black">
        <span className="text-2xl">Welcome ComeBack, {name}</span>

        <div className="w-[46%] relative h-full">
          <input
            type="text"
            placeholder="Tìm kiếm tài liệu, nội dung khác..."
            className="py-1 px-5 w-full h-full rounded-full opacity-70 outline-none text-black"
          />
          <i class="fa-solid fa-magnifying-glass absolute right-[5%] top-[34%]"></i>
        </div>
        {/* hover:border hover:rounded-md hover:bg-slate-200 hover:bg-opacity-55 */}
        <div className="text-4xl pr-14 cursor-pointer">
          <span>{fomatNumber(clock.getHours())}:</span>
          <span>{fomatNumber(clock.getMinutes())}:</span>
          <span>{fomatNumber(clock.getSeconds())}</span>
        </div>
      </header>
    </>
  );
};
