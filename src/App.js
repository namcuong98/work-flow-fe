import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./page/login/Login";
import Home from "./page/Home";
import Listwork from "./page/tasks/Listwork";
// import { Provider } from "react-redux";
import ListSubTasks from "./page/subtasks/ListSubTasks";
import TaskOverdue from "./page/overdue/TaskOverdue";
import Notfound from "./page/components/Notfound";
import NewTask from "./page/tasks/NewTask";
import HomeLogin from "./page/HomeLogin";
import { StateProvider } from "./page/until/Until";
import CreateAcount from "./page/login/CreateAcount";
import CreateSubTask from "./page/subtasks/CreateSubTask";
import Deadline from "./page/deadline/Dealine";
import Profile from "./profile/Profile";
// import { store } from "./store/store";

function App() {
  return (
    // <Provider store={store}>
    <StateProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeLogin />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<CreateAcount />} />
            <Route path="/notfound" element={<Notfound />} />
          </Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/home" element={<Home />}>
            <Route path="newtasks" element={<NewTask />} />
            <Route path="listwork" element={<Listwork />}>
              <Route
                path="subtask-create/:taskId"
                element={
                  <>
                    <CreateSubTask />
                    <ListSubTasks />
                  </>
                }
              ></Route>
              <Route
                path="list-subtask/:taskId"
                element={<ListSubTasks />}
              ></Route>
            </Route>
            <Route path="overdue" element={<TaskOverdue />}>
              <Route
                path="list-subtask/:taskId"
                element={<ListSubTasks />}
              ></Route>
            </Route>
            <Route path="deadline" element={<Deadline />}>
              <Route
                path="subtask-create/:taskId"
                element={
                  <>
                    <CreateSubTask />
                    <ListSubTasks />
                  </>
                }
              ></Route>
              <Route
                path="list-subtask/:taskId"
                element={<ListSubTasks />}
              ></Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </StateProvider>
    // </Provider>
  );
}

export default App;
