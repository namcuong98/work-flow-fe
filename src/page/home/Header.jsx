import axios from "axios";
import React, { useEffect, useState } from "react";
import { loggedInInstance } from "../until/Until";

export const Header = () => {
  // const [auth, setAuth] = useState(false)
  const [name, setName] = useState("Đăng nhập");
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
    loggedInInstance({
      url: "home",
    }).then((res) => {
      if (res.data.access_token) {
        const userName = res.data.email.replace("@gmail.com", "");
        setName(userName);
      } else {
        console.log("err");
      }
    });
  }, []);

  return (
    <>
      <header className="p-[40px]  flex gap-[50px] h-[40px] items-center justify-between text-white">
        <span className="text-2xl font-medium">
          Welcome ComeBack, {name.charAt(0).toUpperCase() + name.slice(1)}
        </span>
        <div className="text-4xl mr-[16%] pr-14 cursor-pointer flex gap-1">
          <span className="min-w-[46px]">{fomatNumber(clock.getHours())}:</span>
          <span className="min-w-[46px]">
            {fomatNumber(clock.getMinutes())}:
          </span>
          <span className="min-w-[46px]">
            {fomatNumber(clock.getSeconds())}
          </span>
        </div>
      </header>
    </>
  );
};
