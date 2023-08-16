import { Form, Input, Modal, Select } from "antd"
import { useDispatch, useSelector } from 'react-redux'
import { getProjectListAsync, id_selector, organization_selector, projectSelect, project_modal_show, set_show, type_selector, users_selector } from "../../redux/slice/project";
import { useEffect } from "react";
import axios  from "../../util/http";
export default () => {
    const dispatch = useDispatch();
    const show = useSelector(project_modal_show);
    const type = useSelector(type_selector)
    const users = useSelector(users_selector);
    const organization = useSelector(organization_selector);
    const list = useSelector(projectSelect);
    const id = useSelector(id_selector)
    const [form] = Form.useForm();
    const user_options = users.map(user => {
        return {
            label: user.username,
            value: user.username
        }
    })
    const organization_options = organization.map(org => {
        return {
            label: org.name,
            value: org.name
        }
    })
    async function handleOk() {
        let form_data;
        try {
            form_data = await form.validateFields()
        } catch (error) {
            console.log(error)
        }
        if (type === 'edit') {
            axios.put(`/api/projects/${id}`, form_data)
        }


        if (type === 'create') {
            //创建
            await axios.post('/api/projects', form_data)
        }
        dispatch(getProjectListAsync())

        dispatch(set_show(false))
    }
    function handleCancel() {
        dispatch(set_show(false))

    }

    useEffect(() => {
        if (type === 'edit') {
            //编辑
            const data = list.find(it => it._id === id);
            const form_data = {
                name: data.name,
                organization: data.organization,
                owner: data.owner
            }
            form.setFieldsValue(form_data)
        }
        if (type === 'create') {
            form.resetFields()
        }
    }, [show])
    return (
        <Modal cancelText="取消" okText={type == 'create' ? "确定创建" : '确定修改'} title={type == 'create' ? "创建项目" : '编辑项目'} open={show} onOk={handleOk} onCancel={handleCancel}>
            <Form form={form}>
                <Form.Item label="项目名称"
                    rules={[
                        {
                            required: true,
                            message: '项目名称',
                        },
                    ]}
                    name="name">
                    <Input />
                </Form.Item>
                <Form.Item label="所在部门"
                    rules={[
                        {
                            required: true,
                            message: '所在部门',
                        },
                    ]}
                    name="organization">
                    <Select options={organization_options}></Select>
                </Form.Item>
                <Form.Item label="负责人"
                    rules={[
                        {
                            required: true,
                            message: '负责人',
                        },
                    ]}
                    name="owner">
                    <Select
                        name="owner"
                        options={user_options}
                    ></Select>
                </Form.Item>
            </Form>
        </Modal>
    )
}