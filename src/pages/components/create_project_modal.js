import { Form, Input, Modal } from "antd"


export default () => {
    function handleOk() {

    }
    function handleCancel() {

    }
    return (
        <Modal cancelText="取消" okText="确定创建" title="创建项目" open={true} onOk={handleOk} onCancel={handleCancel}>
            <Form>
                <Form.Item label="项目名称"
                    rules={[
                        {
                            required: true,
                            message: '项目名称',
                        },
                    ]}
                    name="project_name">
                    <Input />
                </Form.Item>
                <Form.Item label="所在部门"
                    rules={[
                        {
                            required: true,
                            message: '所在部门',
                        },
                    ]}
                    name="project_part">
                    <Input />
                </Form.Item>
                <Form.Item label="负责人"
                    rules={[
                        {
                            required: true,
                            message: '负责人',
                        },
                    ]}
                    name="project_owner">
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}