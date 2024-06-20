import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

const Addingsuccessfully = () => (
    <Result
        status="success"
        title="Added Successfully!"
        subTitle="Configuration takes 1-5 minutes, please wait."
        extra={[
            <Link to="/">
                <Button type="primary" key="console">
                    Home Page
                </Button>
            </Link>
        ]}
    />
);
export default Addingsuccessfully;