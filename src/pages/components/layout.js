import { Outlet, useLocation } from "react-router-dom"
import Header from "./header"
import SideMenu from "./sideMenu"

export default ()=> {
    const location = useLocation();
    const {pathname} = location;
  return (
    <div className="layout_wrap">
        <div className="header_wrap">
            <Header></Header>
        </div>
        <div className="layout_wrap_project">
            {pathname !== "/project" ? <div className="project_side_menu_wrap">
                <SideMenu></SideMenu>
            </div> : null}
            <div className="project_wrap">
                <Outlet />
            </div>
        </div>

    </div>
  )
}
