import LoginWrap from "./components/login_wrap"
import { Card, Button, Form, Input, Divider } from 'antd';
import axios from "../util/http";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { set_login } from "../redux/slice/login";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [form] = Form.useForm();
    const login_click = async ()=>{
        let data;
        try {
           data =  await form.validateFields()
        } catch (error) {
            console.log(error)
        }
        if(data){
           const response =  await axios.post('api/login',data);
           if(response.data.code === 0){
            dispatch(set_login(true))
            navigate('/project')
           }
        }
         
    }
    return (
        <Form form={form}>
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
            <Button type="primary" onClick={login_click} htmlType="submit">登录</Button>
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


