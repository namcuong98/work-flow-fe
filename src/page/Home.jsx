import React, { useState } from "react";
import { Header } from "./home/Header";
import DataUser from "./home/DataUser";
import "../style/style.css";
import Sider from "antd/es/layout/Sider";
import { Button, Layout } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import Sidebar from "./home/Sidebar";
import Toast from "./components/Toast";
import NewTask from "./tasks/NewTask";

const Home = () => {
  const [collapsed, setCollapSed] = useState(false);
  const [newTasks, setNewTasks] = useState(false);
  const [toast, setToast] = useState(false);

  const handleOpenNewTasks = () => {
    setNewTasks(!newTasks);
  };

  return (
    <>
      <Layout>
        <Sider
          className="sider"
          trigger={null}
          theme="light"
          collapsed={collapsed}
          collapsible
        >
          <Sidebar
            openNewTasks={handleOpenNewTasks}
            closeNewTasks={setNewTasks}
          />
          <Button
            type="text"
            icon={collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
            onClick={() => {
              setCollapSed(!collapsed);
            }}
            className="triger-btn"
          />
        </Sider>
        <Layout className="">
          {toast ? <Toast closeToast={setToast} /> : null}
          <Header />
          <DataUser />
          {newTasks ? (
            <NewTask
              collapsed={collapsed}
              closeNewTasks={setNewTasks}
              openToast={setToast}
            />
          ) : null}
        </Layout>
      </Layout>
    </>
  );
};

export default Home;
