import { Button, Divider, Popover, Dropdown, Space } from "antd"
import { Link } from "react-router-dom"

export default () => {
    const content = (
        <div className="project_content">
          <h3 style={{color:"#ccc"}}>收藏项目</h3>
          <Divider/>
          <h3>创建项目</h3>
        </div>
      );
        const contentMenber = (
            <div className="content_menber">
               <h3 style={{color:"#ccc"}}>组员列表</h3>
               <h3>高修文</h3> 
               <Divider />
               <h3>高修文</h3> 
               <Divider />
               <h3>高修文</h3> 
               <Divider />
               <h3>高修文</h3> 
               <Divider />
            </div>
        )
    return (
        <>
            <div className="left">
                <Link to="/project"></Link>
                <Popover trigger="hover"
                content={content} 
                 className="xiangmu">
                    <h2 className="left_project">项目</h2>
                </Popover>
                <Popover  content={contentMenber} className="xiangmu">
                    <h2 className="left_menber">组员</h2>
                </Popover>
            </div>
            <div className="right">
                <span>你好，123</span>
                <Link>登出</Link>
            </div>
        </>
    )
}