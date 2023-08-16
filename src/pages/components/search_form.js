import { Button, Input, Select, Form } from "antd"
import { useSelector } from 'react-redux'
import { task_type_selector, users_selector } from "../../redux/slice/project";
import { useEffect } from "react";
import axios from "../../util/http";
import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { set_kanban } from "../../redux/slice/drop";

export default () => {
    const task_type = useSelector(task_type_selector);
    const users = useSelector(users_selector)
    const [form] = Form.useForm();
    const params = useParams();
    const dispatch = useDispatch();
    const task_type_options = task_type.map(it => {
        return {
            label: it.name,
            value: it.type
        }
    })
    const users_options = users.map(it => {
        return {
            label: it.username,
            value: it.username
        }
    })
    useEffect(() => {
      
    })
    const search = async (form_data)=>{
        const res =  await axios.get(`/api/project/${params.id}`)
        const kanbans =   res.data.data.kanban
        const new_kanban =  kanbans.map(kanban=>{
            const task_arr =   kanban.task.filter(task=>{
                let owner = true;
                let name = true;
                let type = true;
                if( form_data.owner && task.owner !== form_data.owner ){
                    owner = false
                }
                if(form_data.name && task.name !== form_data.name){
                    name = false
                }
                if(form_data.type && task.type !== form_data.type){
                    type = false
                }
                return owner && name && type;
            })
            
            return {
                ...kanban,
                task : task_arr
            }
        })  
        dispatch(set_kanban(new_kanban))
       
    }
    const search_click = async ()=>{
        let form_data;
        try {
            form_data = await form.validateFields()
        } catch (error) {
            console.log(error)
        } 
           search(form_data)
    }
    const reset_click =()=>{
        form.resetFields()
    }
    return (
        <Form form={form}>
            <Form.Item
                name="name"
                rules={[
                    {
                        required: false
                    }
                ]}
            >
                <Input name="name" placeholder="任务名" />
            </Form.Item>
            <Form.Item
                name="type"
            >
                <Select
                    options={task_type_options}
                    style={{
                        width: 120,
                    }}
                >

                </Select>
            </Form.Item>
            <Form.Item
                name="owner"
            >
                <Select
                    options={users_options}
                    style={{
                        width: 120,
                        
                    }}
                ></Select>
            </Form.Item>
            <Button onClick={reset_click}>清除筛选器</Button>
            <Button
            onClick={search_click}
                style={{
                    width: 'auto',
                    marginLeft : '10px'
                }}
                type="primary">查询</Button>
        </Form>
    )
}