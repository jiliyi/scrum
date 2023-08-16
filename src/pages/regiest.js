import LoginWrap from "./components/login_wrap"
import { Card, Button, Form, Input, Divider } from 'antd';
import axios from "../util/http";
import { Link } from "react-router-dom";


const Login = () => {
    const [form] = Form.useForm();
    const regiest_click = async ()=>{
        let form_data;
        try {
            form_data =  await form.validateFields();
        } catch (error) {
            console.log(error)
        }
        

        if(form_data){
           const res =  await  axios.post('/api/register',form_data);
           console.log(res)
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
            <Button onClick={regiest_click} type="primary" htmlType="submit">注册</Button>
        </Form>
    )
}

export default () => {
    return (
        <LoginWrap>
            <Card hoverable style={{ width: 400 }}>
                <h2>请注册</h2>
                注册界面
                <Login></Login>
                <Divider ></Divider>
                <Link to="/login"><span>
                已经有账号了？直接登录</span></Link>
            </Card>
        </LoginWrap>
    )
}


