import { Menu } from 'antd';
import { Link } from "react-router-dom"
export default () => {
  const items = [
    {
    label: (<Link to="project/1/kanban">看板</Link>),
    key: "kanban"
  },
  {
    label: (<Link to="project/1/epic">任务组</Link>),
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
