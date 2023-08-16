import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import Layout from "./pages/components/layout";
import Epic from "./pages/epic";
import Kanban from "./pages/kanban";
import Login from "./pages/login";
import Project from "./pages/project";
import Regiest from "./pages/regiest";
import "./App.css";
import { notification } from "antd";
import { useEffect } from "react";
import event from "./util/event";
import { useDispatch ,useSelector} from 'react-redux';
import {  getOrganzationsAsync, getTaskTypeAsync, getUsersAsync } from "./redux/slice/project";
import { login_selector } from "./redux/slice/login";
function App() {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (msg)=>{
    api.error({
      placement : "topRight",
      message : msg
    })
  }
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login_status = useSelector(login_selector)
  useEffect(()=>{

    if(login_status){
      dispatch(getTaskTypeAsync());
      dispatch(getUsersAsync())
      dispatch(getOrganzationsAsync())
    }
   
    //自动到登录
    if(location.pathname == "/"){
      navigate('/login')
    }

    event.on('global_error_tips',(msg)=>{
      openNotification(msg)
    })

    event.on('global_not_login',(msg)=>{
      navigate('/login')
    })
    
    
  },[login_status])
  return (
    <div className="App">
      {contextHolder}
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/regiest" element={<Regiest />} />
        <Route element={<Layout />}>
          <Route path="/project" element={<Project />}/>
          <Route path="/project/:id/kanban" element={<Kanban />}/>
          <Route path="/project/:id/epic" element={<Epic />}/>
        </Route>

      </Routes>
    </div>
  );
}

export default App;
