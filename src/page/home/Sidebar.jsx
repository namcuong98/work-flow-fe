import {
  EditOutlined,
  KubernetesOutlined,
  LoginOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Flex, Menu } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loggedInInstance, useStateContext } from "../until/Until";

const Sidebar = ({ openNewTasks, closeNewTasks }) => {
  const navigate = useNavigate();
  const {
    notificationDeadline,
    updateNotificationDeadline,
    notificationOverdue,
    updateNotificationOverdue,
  } = useStateContext();

  const handleLogout = () => {
    loggedInInstance({
      url: "/logout",
    }).then((res) => {
      if (res.data.clear) {
        localStorage.clear();
        navigate("/login");
      } else {
        alert("Error");
      }
    });
  };

  useEffect(() => {
    loggedInInstance({
      url: "/task-deadline",
    })
      .then((res) => {
        updateNotificationDeadline(res.data.deadline.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [updateNotificationDeadline]);

  useEffect(() => {
    loggedInInstance({
      url: "/task-overdue",
    })
      .then((res) => {
        updateNotificationOverdue(res.data.taskOverdue.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [updateNotificationOverdue]);

  return (
    <>
      <Flex align="center" justify="center">
        <div className="text-white text-2xl my-7">
          <KubernetesOutlined />
        </div>
      </Flex>
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        className="menu-bar"
        items={[
          {
            key: "1",
            icon: <UserOutlined />,
            label: "Tasks List",
            onClick: () => {
              closeNewTasks();
              navigate("/home/listwork");
            },
          },
          {
            key: "2",
            icon: <EditOutlined />,
            label: "Add Task",
            onClick: () => {
              openNewTasks();
            },
          },
          {
            key: "3",
            icon: (
              <span>
                <i className={`fa-regular fa-bell`}></i>
                {notificationDeadline === 0 ? null : (
                  <>
                    <span className=" text-[#1f1f1f] relative">
                      <span className="absolute top-[-20px] text-[12px] text-white bg-red-600 px-[3px] py-[1px] rounded">
                        {notificationDeadline}
                      </span>
                    </span>
                  </>
                )}
              </span>
            ),
            label: "Deadline",
            onClick: () => {
              closeNewTasks();
              navigate("/home/deadline");
            },
          },
          {
            key: "4",
            icon: (
              <span>
                <>
                  <i className={`fa-solid fa-triangle-exclamation`}></i>
                  {notificationOverdue === 0 ? null : (
                    <>
                      <span className=" text-[#1f1f1f] relative">
                        <span className="absolute top-[-20px] left-[-3px] text-[12px] text-white bg-red-600 px-[3px] py-[1px] rounded">
                          {notificationOverdue}
                        </span>
                      </span>
                    </>
                  )}
                </>
              </span>
            ),
            label: "Overdue ",
            onClick: () => {
              closeNewTasks();
              navigate("/home/overdue");
            },
          },
          {
            key: "5",
            icon: <LoginOutlined />,
            label: "Log Out",
            onClick: () => {
              handleLogout();
            },
          },
        ]}
      />
    </>
  );
};

export default Sidebar;
