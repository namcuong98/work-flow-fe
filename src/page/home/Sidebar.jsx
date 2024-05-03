import {
  AimOutlined,
  AlertOutlined,
  EditOutlined,
  KubernetesOutlined,
  LoginOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Flex, Menu } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { loggedInInstance } from "../until/Until";

const Sidebar = ({ openNewTasks, closeNewTasks }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    loggedInInstance({
      url: "/logout",
    }).then((res) => {
      if (res.data.clear) {
        localStorage.clear();
        navigate("/");
      } else {
        alert("Error");
      }
    });
  };

  return (
    <>
      <Flex align="center" justify="center">
        <div className="text-black text-2xl my-7">
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
            label: "Dashboard",
            onClick: () => {
              closeNewTasks();
              navigate("/home");
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
            icon: <AimOutlined />,
            label: "Profile",
            onClick: () => {
              closeNewTasks();
              navigate("/home/listwork");
            },
          },
          {
            key: "4",
            icon: <AlertOutlined />,
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
