import { Modal } from "antd"
import {WarningFilled} from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { delete_modal_selector, getProjectListAsync, set_delete_modal } from "../../redux/slice/project"
import axios from "../../util/http"

export default () => {
    const dispatch = useDispatch()
    const delete_modal = useSelector(delete_modal_selector)
    const onCancel = ()=>{
        dispatch(set_delete_modal({
            show : false
        }))
    }
    const onOk = async()=>{
        axios.delete(`/api/projects/${delete_modal.id}`);
        dispatch(set_delete_modal({
            show : false
        }))
        dispatch(getProjectListAsync())
    }
    return (
        <Modal title="确定删除" onCancel={onCancel} onOk={onOk} open={delete_modal.show}>
            <WarningFilled />
        </Modal>
    )
}