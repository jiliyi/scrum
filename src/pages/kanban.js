import Drag from './components/drag';
import { useDispatch } from 'react-redux'
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { getProjectAsync } from "../redux/slice/project";
import { set_project_id } from "../redux/slice/drop";
import CreateTaskModal from './components/create_task_modal' 
import SearchForm from './components/search_form';
export default () => {
  const params = useParams();
  const projectId = params.id;
  const dispatch = useDispatch();

  
  useEffect(() => {

    
    dispatch(getProjectAsync(projectId));
    dispatch(set_project_id(projectId))

  }, [projectId])
  return (
    <>
      <h1 className="kanban_title">快递管理看板</h1>
      <div className="kanban_search">
        <SearchForm />
      </div>
      <div className="kanban_content">
        <Drag>

        </Drag>
      </div>
          <CreateTaskModal />
    </>
  )
}
