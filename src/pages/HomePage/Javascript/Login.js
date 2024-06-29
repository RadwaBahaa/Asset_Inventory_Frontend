import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { Layout } from "antd";

const { Content } = Layout;

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    // Here you would normally check the credentials
    // If they are valid, you would set the authenticated state to true
    setIsAuthenticated(true);
    navigate("/");
  };

  return (
    <Layout className="first-layout" style={{ minHeight: "100vh" }}>
      <Content style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Row
          style={{
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            backgroundColor: "white",
            width: "90%",
            maxWidth: "1100px", // Adjusted max width for the entire card
            overflow: "hidden"
          }}
        >
          <Col span={12} style={{ padding: "5%" }}> {/* Use percentage padding */}
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              style={{ width: "100%" }}
            >
              <h2 style={{ textAlign: "center", color: "#101251", marginBottom: "4%" }}>SIGN <span style={{ color: "#1890ff" }}>IN</span></h2>
              <Form.Item
                name="username"
                rules={[{ required: true, message: "Please input your Username!" }]}
                style={{ marginBottom: "2%" }}
              >
                <Input
                  size="large"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "Please input your Password!" }]}
                style={{ marginBottom: "4%" }}
              >
                <Input
                  size="large"
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item style={{ marginBottom: "4%" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Checkbox>Stay signed in</Checkbox>
                  <a className="login-form-forgot" href="">Forgot Password?</a>
                </div>
              </Form.Item>
              <Form.Item style={{ marginBottom: "4%" }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    style={{ width: "100%", maxWidth: "200px", backgroundColor: "#1890ff", borderColor: "#1890ff" }}
                    size="large"
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Login
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </Col>
          <Col span={12} style={{ padding: "0" }}> {/* Adjusted width */}
            <video
              autoPlay
              loop
              muted
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            >
              <source src="/SupplyChain.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Login;
