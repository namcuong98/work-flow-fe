import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../style/style.css";
import { ValidateLogin } from "../components/Validation";
import { loggedInInstance } from "../until/Until";

const CreateAcount = () => {
  const navigate = useNavigate();

  const info = {
    email: null,
    password: null,
    repeatPassword: null,
  };
  const [data, setData] = useState(info);
  const [errors, setErrors] = useState(info);
  const [lockOpen, setLockOpen] = useState(false);
  const [lockRepeatOpen, setLockRepeatOpen] = useState(false);

  const handleLockOpen = () => {
    setLockOpen(!lockOpen);
  };

  const handleLockRepeatOpen = () => {
    setLockRepeatOpen(!lockRepeatOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(ValidateLogin(data));
  };

  const handlechange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  useEffect(() => {
    if (
      errors.email === "" &&
      errors.password === "" &&
      errors.repeatPassword === ""
    ) {
      loggedInInstance({
        url: "signup",
        method: "POST",
        data: data,
      })
        .then((res) => {
          alert("Tạo tài khoản thành công");
          navigate("/login");
        })
        .catch((err) => console.log(err));
    }
  }, [errors]);

  return (
    <div className="overflow-hidden m-auto bg-transparent px-[40px] py-10 w-[26%] backdrop-blur-[14px] border-2 border-opacity-50 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)] relative animation-default">
      <Link to={"/"}>
        <i className="fa-solid fa-x absolute top-0 right-0 p-3 bg-[#162938] text-white rounded-bl-2xl hover:cursor-pointer hover:opacity-70 active-default"></i>
      </Link>
      <span className="text-2xl font-bold text-center w-full block">
        Registration
      </span>
      <form action="" className="">
        <div className="flex items-center relative mt-9 ">
          <input
            onChange={handlechange}
            value={data.email === null ? "" : data.email}
            id="email"
            name="email"
            className=" w-full border-b-2 border-b-gray-950 outline-none p-1 bg-transparent"
            type="text"
          />
          <label className="labelLogin">Email</label>
          <i className="fa-solid fa-envelope absolute right-3 top-[30%]"></i>
        </div>
        {errors.email && <p className="text-red-500 mt-2">{errors.email}</p>}
        <div className="flex items-center relative mt-7 ">
          <input
            onChange={handlechange}
            value={data.password === null ? "" : data.password}
            name="password"
            className=" w-full border-b-2 border-b-gray-950 outline-none p-1 bg-transparent"
            type={!lockOpen ? "password" : "text"}
          />
          <label className="labelLogin">Password</label>
          <div className="cursor-pointer" onClick={handleLockOpen}>
            {!lockOpen ? (
              <i className="fa-solid fa-lock absolute right-3 top-[30%]"></i>
            ) : (
              <i class="fa-solid fa-lock-open absolute right-2 top-[30%]"></i>
            )}
          </div>
        </div>
        {errors.password && <p className="text-red-500">{errors.password}</p>}

        <div className="flex items-center relative mt-7 ">
          <input
            onChange={handlechange}
            value={data.repeatPassword === null ? "" : data.repeatPassword}
            name="repeatPassword"
            className=" w-full border-b-2 border-b-gray-950 outline-none p-1 bg-transparent"
            type={!lockRepeatOpen ? "password" : "text"}
          />
          <label className="labelLogin">Repeat Password</label>
          <div className="cursor-pointer" onClick={handleLockRepeatOpen}>
            {!lockRepeatOpen ? (
              <i className="fa-solid fa-lock absolute right-3 top-[30%]"></i>
            ) : (
              <i class="fa-solid fa-lock-open absolute right-2 top-[30%]"></i>
            )}
          </div>
        </div>
        {errors.repeatPassword && (
          <p className="text-red-500">{errors.repeatPassword}</p>
        )}
      </form>
      <button
        onClick={handleSubmit}
        className="w-full text-center font-semibold py-3 mt-9 text-white rounded-lg bg-[#162938]"
      >
        Register
      </button>
      <div className="flex justify-center mt-6">
        <span className="mr-1">Already have an account?</span>
        <Link to={"/login"}>
          <a className="font-semibold" href="">
            Login
          </a>
        </Link>
      </div>
    </div>
  );
};

export default CreateAcount;
