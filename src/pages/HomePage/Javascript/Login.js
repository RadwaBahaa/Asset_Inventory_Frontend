import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import MainTopNav from "../../../Components/NavBars/TopNavBar/Javascript/MainTopNav"
import { Button, Checkbox, Form, Input } from 'antd';
import { Link } from "react-router-dom";
import { Layout, theme } from "antd";
const Login = () => {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    return (
        <>
        <Layout className="first-layout">
        <MainTopNav/>
        


            <Form
                style={{ padding: "24px", marginTop: "15%", width: "550px", marginLeft: "25%" }}
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                </Form.Item>

                <Form.Item>
                    <Link to="/">
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </Link>
                    Or <a href="">register now!</a>
                </Form.Item>
            </Form></Layout>



        </>
    );
};
export default Login;