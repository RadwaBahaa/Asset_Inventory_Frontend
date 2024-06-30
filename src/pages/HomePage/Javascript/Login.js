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
            maxWidth: "1100px",
            overflow: "hidden",
            minHeight: "70vh" // Added to increase the height of the card
          }}
        >
          <Col span={12} style={{ padding: "5%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              style={{ width: "100%" }}
            >
              <h1 style={{ textAlign: "center", color: "#101251", marginBottom: "24px", fontSize: "2.1rem" }}>SIGN <span style={{ color: "#1890ff" }}>IN</span></h1>
              <Form.Item
                name="username"
                rules={[{ required: true, message: "Please input your Username!" }]}
                style={{ marginBottom: "24px" }}
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
                style={{ marginBottom: "24px" }}
              >
                <Input
                  size="large"
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item style={{ marginBottom: "24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Checkbox>Stay signed in</Checkbox>
                  <a className="login-form-forgot" href="">Forgot Password?</a>
                </div>
              </Form.Item>
              <Form.Item style={{ marginBottom: "24px" }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    style={{
                      width: "100%",
                      maxWidth: "200px",
                      backgroundColor: "#1890ff",
                      borderColor: "#1890ff",
                      backgroundImage: "linear-gradient(45deg, #1890ff, #40a9ff)",
                      borderRadius: "20px", // Increased border radius for a more curved button
                      fontWeight: "bold",
                      transition: "background-image 0.3s ease",
                    }}
                    size="large"
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundImage = "linear-gradient(45deg, #40a9ff, #1890ff)")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundImage = "linear-gradient(45deg, #1890ff, #40a9ff)")}
                  >
                    Login
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </Col>
          <Col span={12} style={{ padding: "0" }}>
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
