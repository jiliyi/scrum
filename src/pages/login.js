import LoginWrap from "./components/login_wrap"
import { Card, Button, Form, Input, Divider } from 'antd';
import { Link } from "react-router-dom";


const Login = () => {
    return (
        <Form>
            <Form.Item

                name="username"
                rules={[
                    {
                        required: true,
                        message: '请输入用户名',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item

                name="password"
                rules={[
                    {
                        required: true,
                        message: '请输入密码',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Button type="primary" htmlType="submit">登录</Button>
        </Form>
    )
}

export default () => {
    return (
        <LoginWrap>
            <Card hoverable style={{ width: 400 }}>
                <h2>请登录</h2>
                登录界面
                <Login></Login>
                <Divider ></Divider>
                <Link to="/regiest"><span>
                    有账号？注册新账号</span></Link>
            </Card>
        </LoginWrap>
    )
}


