import CreateEpicModal from "./components/create_epic_modal"
import { useEffect } from "react";
import { useDispatch } from 'react-redux'
import { useParams } from "react-router-dom";
import { getProjectAsync } from "../redux/slice/project";
import {  set_project_id } from "../redux/slice/drop";
import EpicList from "./components/epic_list";
import { set_show } from "../redux/slice/epic";

export default ()=> {
 
    const dispatch = useDispatch();
    const params = useParams();
  
    const add_epic = ()=>{
      dispatch(set_show(true))
    }
    useEffect(()=>{
        dispatch(getProjectAsync(params.id));
        dispatch(set_project_id(params.id));
       
    },[params.id])
  return (
    <div>
      <div style={{
        color : 'blue',
        cursor : 'pointer',
        
      }} className="epic_create"
      onClick={add_epic}
      >
        创建任务组
      </div>

      <div className="epic_list">
        <EpicList />
      </div>
      <CreateEpicModal/>
    </div>
  )
}
