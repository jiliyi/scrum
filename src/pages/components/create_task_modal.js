import { Form, Input, Select, Modal } from "antd"

import { useSelector } from 'react-redux';
import { set_task_modal, task_modal_selector } from "../../redux/slice/kanban";
import { task_type_selector, users_selector } from "../../redux/slice/project";
import { useEffect } from "react";
import { useDispatch } from 'react-redux'
import { add_task, kanban_selector, set_kanban_item, update_kanban_async } from "../../redux/slice/drop";

export default () => {
    const task_modal = useSelector(task_modal_selector);
    const users = useSelector(users_selector);
    const task_type = useSelector(task_type_selector);
    const kanban_data = useSelector(kanban_selector)
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const render_task_options = (arr) => {
        return arr.map(item => {
            return <Select.Option key={item.type} value={item.type || ''}>{item.name}</Select.Option>
        })
    }
    const render_users_options = (arr) => {
        return arr.map(item => {
            return <Select.Option key={item.username} value={item.username|| ''}>{item.username}</Select.Option>
        })
    }



    const onOk = async () => {
        let form_data;
        try {
            form_data = await form.validateFields();
        } catch (error) {
            console.log(error)
        }

       
        if (task_modal.type === 'create') {
            //新建任务
            form_data.task_id = Math.random().toString(32).substring(2)
            dispatch(add_task({
                kanban_key : task_modal.kanban_key,
                task_data : form_data
            }))
            dispatch(update_kanban_async())
        }

        if (task_modal.type === 'edit') {
            //编辑逻辑
            console.log(form_data)
            dispatch(set_kanban_item({
                kanban_key : task_modal.kanban_key,
                task_id : task_modal.task_id,
                task : form_data
            }))
            dispatch(update_kanban_async())

        }

         //关闭弹窗
         dispatch(set_task_modal({
            show : false
        }))
    }
    const onCancel = () => {
        //关闭弹窗
        dispatch(set_task_modal({
            show : false
        }))
    }

    useEffect(() => {
        if(task_modal.type === 'create' && task_modal.show){
            //新建
            form.resetFields() //表单内容重置

        }
        if(task_modal.type === 'edit' && task_modal.show){
            //编辑任务
            const data = kanban_data;
            const kanban = data.find(it=>it.kanban_key == task_modal.kanban_key)
            const task = kanban.task.find(it=>it.task_id == task_modal.task_id)
            form.setFieldsValue(task)
            
        }



    }, [task_modal.show])
    return (
        <div>
            <Modal title={task_modal.type === "create" ? '新建任务' : '编辑任务'} onOk={onOk} onCancel={onCancel} open={task_modal.show}>
                <Form form={form} >
                    <Form.Item
                        label="任务名称"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="任务类型"
                        name="type"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Select
                            placeholder="Select a option and change input text above"
                        // onChange={onGenderChange}
                        // allowClear
                        >
                            {render_task_options(task_type)}

                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="负责人"
                        name="owner"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Select
                            placeholder="Select a option and change input text above"
                            // onChange={onGenderChange}
                            allowClear
                        >
                            {render_users_options(users)}

                        </Select>
                    </Form.Item>


                </Form>
            </Modal>

        </div>
    )
}