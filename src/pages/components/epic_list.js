import { createSearchParams, useNavigate, useParams } from "react-router-dom"
import { useSelector } from 'react-redux'
import { epic_list_selector } from "../../redux/slice/kanban";
import { useEffect } from "react";
export default () => {
    const navigate = useNavigate();
    const params = useParams();
    const epic_list = useSelector(epic_list_selector)
    const handle_click = () => {
        navigate({
            pathname: `/project/${params.id}/kanban`,
            search: createSearchParams({
                epic: '登录模块'
            }).toString()
        })
    }
    useEffect(()=>{
        
    })
    return (
        <>
            {epic_list.map(epic => {
                return (
                    <div className="epic_list_item" key={epic}>
                        <h1 style={{
                            fontSize: '20px',
                            color: 'blue',
                            cursor: "pointer"
                        }}
                            onClick={() => { handle_click(epic) }}
                        >{epic}</h1>
                        <p style={{
                            color: '#aaa',
                            fontSize: '14px'
                        }}>开始时间 : 210102</p>
                        <p style={{
                            color: '#aaa',
                            fontSize: '14px'
                        }}>结束时间</p>
                    </div>
                    )
            })
            }
        </>
    )
}