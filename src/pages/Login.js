import React from "react";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Row, Col, message, Layout } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/Slices/login";
import LoginLogo from "../../src/Images/LoginLogo.png"; // Adjust the path as necessary

const { Content } = Layout;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      const { staySignedIn, ...loginValues } = values;
      const response = await dispatch(login(loginValues)).unwrap();

      console.log(response);
      console.log(staySignedIn);

      if (staySignedIn) {
        localStorage.setItem("token", response.token);
      } else {
        sessionStorage.setItem("token", response.token);
      }

      navigate("/"); // Navigate to the home page
    } catch (err) {
      message.error(err || "Login failed"); // Show an error message if login fails
    }
  };

  return (
    <Layout className="first-layout" style={{ minHeight: "100vh" }}>
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Row
          style={{
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            backgroundColor: "white",
            width: "90%",
            maxWidth: "1100px",
            overflow: "hidden",
            minHeight: "70vh", // Added to increase the height of the card
          }}
        >
          <Col
            span={12}
            style={{
              padding: "5%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center", // Center align items horizontally
            }}
          >
            <img
              src={LoginLogo}
              alt="Company Logo"
              style={{
                width: "220px", // Adjusted the size
                height: "100px", // Adjusted the size
                marginBottom: "15px", // Spacing below the logo
                objectFit: "contain",
                marginRight: "10px",
              }}
            />
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              style={{ width: "100%" }}
            >
              <h1
                style={{
                  color: "#101251",
                  fontSize: "2rem",
                  margin: "0",
                  textAlign: "center", // Center align the text
                }}
              >
                SIGN <span style={{ color: "#1890ff" }}>IN</span>
              </h1>
              <Form.Item
                name="userName"
                rules={[
                  { required: true, message: "Please input your Username!" },
                ]}
                style={{ marginBottom: "24px", marginTop: "24px" }} // Adjust spacing as needed
              >
                <Input
                  size="large"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
                style={{ marginBottom: "24px" }}
              >
                <Input.Password
                  size="large"
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>
              <Form.Item
                name="staySignedIn"
                valuePropName="checked"
                style={{ marginBottom: "12px" }} // Reduced marginBottom to reduce space
              >
                <Checkbox>Stay signed in</Checkbox>
              </Form.Item>
              <Form.Item style={{ marginBottom: "12px" }}> {/* Reduced marginBottom */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "12px", // Adjusted marginTop for spacing
                  }}
                >
                  <Button
                    style={{
                      width: "100%",
                      maxWidth: "200px",
                      backgroundColor: "#1890ff",
                      borderColor: "#1890ff",
                      backgroundImage:
                        "linear-gradient(45deg, #1890ff, #40a9ff)",
                      borderRadius: "20px", // Increased border radius for a more curved button
                      fontWeight: "bold",
                      transition: "background-image 0.3s ease",
                    }}
                    size="large"
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundImage =
                      "linear-gradient(45deg, #40a9ff, #1890ff)")
                    }
                    onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundImage =
                      "linear-gradient(45deg, #1890ff, #40a9ff)")
                    }
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