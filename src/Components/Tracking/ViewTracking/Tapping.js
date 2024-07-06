import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

const Tapping = ({ processID }) => {
  const breadcrumbItems = [
    {
      title: <HomeOutlined />,
    },
    {
      title: (
        <>
          <UserOutlined />
          <Link to="/tracking/viewtracking">View Tracking</Link>
        </>
      ),
    },
    processID && {
      title: <Link to="/tracking/viewtracking">View Process</Link>,
    },
    processID && {
      title: processID,
    },
  ].filter(Boolean);

  return <Breadcrumb items={breadcrumbItems} />;
};

export default Tapping;
