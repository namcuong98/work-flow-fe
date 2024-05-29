import React, { useEffect, useState } from "react";
import "../style/profileStyle.css";
import { beSkillsData, dbSkillsData, feSkillsData } from "./Data";
import Action from "../style/Action";
import axios from "axios";
import ToastProfile from "./ToastProfile";

const Profile = () => {
  const defaultData = {
    fullName: "",
    emailAddress: "",
    message: "",
  };
  const [sendMail, setSendMail] = useState(defaultData);
  const [isToast, setIsToast] = useState(false);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setSendMail({
      ...sendMail,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://work-flow-be-1.onrender.com:8081/send-mail", sendMail)
      .then((res) => {
        setIsToast(true);
        setSendMail(defaultData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    Action();
  }, []);

  return (
    <>
      <div className="profile ">
        <div className="wapper">
          <div className="content"></div>
          <div className="content content-right"></div>
          <div className="book">
            {/* page profile */}
            <div className="book-page page-left">
              <div className="profile-page">
                <img src={require("../images/avt.png")} />
                <h1 className="font-bold text-2xl">Nguyễn Đức Cường</h1>
                <h3 className="font-bold text-lg text-main-color mb-2">
                  Web Deverloper
                </h3>
                <div className="social-media relative">
                  <a href="https://www.facebook.com/profile.php?id=100011318041262">
                    <p className="profile-info left top-[-100%] right-[130%] w-[80px]">
                      <span className="w-full">Nam Cường</span>
                    </p>
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                  <a href="mailto:nnamcuongg98@gmail.com" className="relative">
                    <p className="profile-info right top-[-120%] left-[210%]">
                      nnamcuongg98@gmail.com
                    </p>
                    <i className="fa-solid fa-envelope"></i>
                  </a>
                </div>
                <p className="mt-4">
                  Hi, I'm Cuong. A web developer specializing in User Interface
                  (UI) design, also known as Front-End. However, along with the
                  knowledge I have, I can also handle backend operations of a
                  website (Back-End) if needed.
                </p>
                <div className="btn-box max-lg:block max-lg:text-center">
                  <a href="" className="btn ">
                    Download CV
                  </a>
                  <a href="#" className="btn contact-me">
                    Contact Me
                  </a>
                </div>
              </div>
            </div>
            {/* Page 1-2 */}
            <div className="book-page page-right turn" id="turn-1">
              {/* page 1 */}
              <div className="page-font">
                <h1 className="title">My Skills</h1>
                <div className="rim">
                  <div className="flex-1 mb-3">
                    <p className="landing">Front-End</p>
                    <div className="landing-wrap">
                      {feSkillsData.map((item) => {
                        return (
                          <>
                            <div className="landing-item">
                              <i
                                className={item.icon}
                                style={{ fontSize: "26px" }}
                              ></i>
                              <p className="text-center text-[16px]">
                                {item.name}
                              </p>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex-1 mb-3">
                    <p className="landing">Back-End</p>
                    <div className="landing-wrap">
                      {beSkillsData.map((item) => {
                        return (
                          <>
                            <div className="landing-item">
                              <i
                                className={item.icon}
                                style={{ fontSize: "30px" }}
                              ></i>
                              <p className="text-center text-[16px]">
                                {item.name}
                              </p>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex-1 mb-3">
                    <p className="landing">DataBase</p>
                    <div className="landing-wrap">
                      {dbSkillsData.map((item) => {
                        return (
                          <>
                            <div className="landing-item">
                              <i
                                className={item.icon}
                                style={{ fontSize: "30px" }}
                              ></i>
                              <p className="text-center text-[16px]">
                                {item.name}
                              </p>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <p className="number-page">1</p>
                <span data-page="turn-1" className="nextprev-btn">
                  <i className=" fa-solid fa-angle-right"></i>
                </span>
              </div>
              {/* page 2 */}
              <div className="page-back">
                <h1 className="title ">Latest Project</h1>
                <div className="wrap flex justify-center my-2">
                  <div className="border-main-color border-[3px] w-[60%] rounded-md p-1 imgPrj">
                    <img
                      className="rounded-md"
                      src={require("../images/ProejectPrf.jpg")}
                    />
                  </div>
                </div>
                <div className="rim">
                  <div className="flex justify-between items-center ">
                    <p className="text-xl font-bold">Name: Work Flow</p>
                    <a
                      className="flex items-center text-main-color gap-2"
                      href="/login"
                    >
                      <p>Come Back</p>
                      <i className="text-xs fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                  </div>
                  <p className="mt-2">
                    This project utilizes ReactJS and NodeJS as the main
                    frameworks for designing the interface and connecting web
                    data. MySQL is used as the database. Due to the absence of
                    any similar references on the web to consult, the layout is
                    somewhat simple, sorry for the inconvenience.
                  </p>
                  <p className="number-page">2</p>
                  <span data-page="turn-1" className="nextprev-btn back">
                    <i className="fa-solid fa-angle-left"></i>
                  </span>
                </div>
              </div>
            </div>
            {/* page 3 & 4 */}
            <div className="book-page page-right turn" id="turn-2">
              {/* page 3 */}
              <div className="page-font">
                <h1 className="title">Project Content</h1>
                <div className="rim border-l-2 border-main-color">
                  <div className="ml-4 notify">
                    <p className="font-bold text-lg">
                      This is an app used for personal task management.
                    </p>
                    <p className="mt-2 mb-1">
                      - Typically, you will have tasks and subtasks that need to
                      be completed. A personal task management app will help you
                      break down the work. You just need to add them to the task
                      list. Each time you finish a subtask, change its status to
                      'Done'.
                    </p>
                    <p className="mb-1">
                      - If you complete all subtasks, the task itself will be
                      marked as 'Done' and vice versa.
                    </p>
                    <p className="mb-4">
                      - Tasks due today will be notified through the Deadline
                      section for you to stay on track. Tasks that are overdue
                      will be notified in the Overdue section until you change
                      their status to 'Done'.
                    </p>
                  </div>
                  <div className="ml-4 notify">
                    <p className="font-bold text-lg">Attention :</p>
                    <p className="mb-1">
                      - If the note on your main screen is too long, please pay
                      attention to the bottom left corner of the screen.
                    </p>
                    <span>
                      - Do you know that 12:00 PM is 00:00 AM, right? Remember
                      that.
                    </span>
                  </div>
                </div>
                <p className="number-page">3</p>
                <span data-page="turn-2" className="nextprev-btn">
                  <i className="fa-solid fa-angle-right"></i>
                </span>
              </div>
              {/* page 4 */}
              <div className="page-back">
                <h1 className="title">Project Content</h1>
                <div className="rim border-l-2 border-main-color">
                  <div className="ml-4 notify">
                    <p className="font-bold text-lg">Finally :</p>
                    <p className="mt-2 mb-1">
                      - Every day at 8 AM, you will receive an email
                      notification of the tasks you need to complete. Therefore,
                      make sure to register with your primary email and remember
                      to check your email at 8 AM daily.
                    </p>
                    <p className="mt-2 mb-1">
                      - If you want to test the feature but don't have time to
                      create tasks, use the test account (
                      <a
                        href="/login"
                        className="underline hover:text-main-color"
                      >
                        admin@gmail.com
                      </a>
                      -admin). However, if you need to send emails, create your
                      own account with a valid email.
                    </p>
                  </div>
                </div>
                <p className="number-page">4</p>
                <span data-page="turn-2" className="nextprev-btn back">
                  <i className="fa-solid fa-angle-left"></i>
                </span>
              </div>
            </div>

            {/* page 5 & 6 */}
            <div className="book-page page-right turn" id="turn-3">
              {/* page 5 */}
              <div className="page-font">
                <h1 className="title">Education</h1>
                <div className="rim">
                  <div className="education">
                    <i className="fa-regular fa-calendar-days"></i>
                    <p>08/2023:</p>
                    <p>F8</p>
                  </div>
                  <span>
                    - Learn the basics of web programming including HTML, CSS,
                    and JavaScript, creating static web pages. Slice HTML and
                    create effects to make the web page smoother. Enhance the
                    web's sales performance and improve UX and UI for web users.
                  </span>
                  <div className="education">
                    <i className="fa-regular fa-calendar-days"></i>
                    <p>10/2023:</p>
                    <p>Bkacad</p>
                  </div>
                  <span>
                    - Improve skills by using the ReactJS library to build a web
                    page optimized for functionality, performance, bug
                    fixing,... Use libraries like Tailwind and Bootstrap to
                    complete a web page faster.
                  </span>
                  <div className="education">
                    <i className="fa-regular fa-calendar-days"></i>
                    <p>01/2024:</p>
                    <p>Udemy</p>
                  </div>
                  <span>
                    - Build a server using NodeJS and MySQL database. Use the
                    Express framework and some libraries like nodemailer,
                    node-schedule,... to add more features to the website.
                  </span>
                </div>
                <p className="number-page">5</p>
                <span data-page="turn-3" className="nextprev-btn">
                  <i className="fa-solid fa-angle-right"></i>
                </span>
              </div>
              {/* page 6 */}
              <div className="page-back">
                <h1 className="title">Contact Me</h1>
                <div className="content-box rim">
                  <form action="">
                    <input
                      onChange={handleChange}
                      value={sendMail.fullName}
                      name="fullName"
                      className="contact-info"
                      type="text"
                      placeholder="Full Name"
                    />
                    <input
                      onChange={handleChange}
                      value={sendMail.emailAddress}
                      name="emailAddress"
                      className="contact-info"
                      type="text"
                      placeholder="Email Address"
                    />
                    <textarea
                      onChange={handleChange}
                      value={sendMail.message}
                      name="message"
                      className="contact-info"
                      type="text"
                      placeholder="Your message will be sent via email."
                    />
                    <input
                      type="submit"
                      className="btn"
                      value="Send Message"
                      onClick={handleSubmit}
                    />
                  </form>
                </div>
                <p className="number-page">6</p>
                <span data-page="turn-3" className="nextprev-btn back">
                  <i className="fa-solid fa-angle-left"></i>
                </span>
                <div className="back-home">
                  <p>Profile</p>
                  <i className="fa-solid fa-user"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isToast && <ToastProfile closeToast={setIsToast} />}
    </>
  );
};

export default Profile;
