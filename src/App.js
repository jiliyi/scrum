import { Route, Routes } from "react-router-dom"
import Layout from "./pages/components/layout";
import Epic from "./pages/epic";
import Kanban from "./pages/kanban";
import Login from "./pages/login";
import Project from "./pages/project";
import Regiest from "./pages/regiest";
import "./App.css";
function App() {
  return (
    <div className="App">
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
