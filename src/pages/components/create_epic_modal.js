import { Form, Input, Modal } from "antd"
import { useSelector, useDispatch } from 'react-redux'
import { epic_modal_selector, set_show } from "../../redux/slice/epic";
import axios from "../../util/http";
import { useParams } from "react-router-dom";
import { getProjectAsync } from "../../redux/slice/project";
export default () => {
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const show = useSelector(epic_modal_selector);
    const params = useParams();

    const onCancel = () => {
        dispatch(set_show(false))
    }
    const onOk = async () => {
        let form_data;
        try {
            form_data = await form.validateFields()
        } catch (error) {
            console.log(error)
        }

        if (form_data) {
            const epic_name = form_data.epic_name;
            await axios.post(`/api/epic/${params.id}`, {
                epic_name
            })
            dispatch(set_show(false))
            form.resetFields()
            dispatch(getProjectAsync(params.id))
        }
    }
    return (
        <div className="epic_modal">

            <Modal open={show} onCancel={onCancel} onOk={onOk}>
                <Form form={form} >
                    <Form.Item
                        label="epic"
                        name="epic_name"
                        rules={[
                            {
                                required: true,
                                message: '请输入epic',
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}