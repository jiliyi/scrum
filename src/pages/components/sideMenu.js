import { Menu } from 'antd';
import { Link, useParams } from "react-router-dom";

export default () => {
  const params = useParams();
  const items = [
    {
    label: (<Link to={`project/${params.id}/kanban`}>看板</Link>),
    key: "kanban"
  },
  {
    label: (<Link to={`project/${params.id}/epic`}>任务组</Link>),
    key: "task" 
  }
]
  return (
    <div className='side_menu'>
      <Menu items={items} >
        
      </Menu>
    </div>
  )
}
