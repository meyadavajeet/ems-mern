import { Button, Form, Input, message } from 'antd';
import React, { useState, useEffect } from 'react';
import './register.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../../components/Spinner';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  //submit handler
  const onFinish = async (values) => {
    try {
      setLoading(true);
      console.log('Success:', values);
      await axios.post("/api/v1/users/register", values);
      message.success("Registration success");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      message.error(error);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  //if user found on local storage then redirect user to homepage
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <div className="container p4">
        <div className="card col-sm-6 offset-sm-3">
          <div className="card-header text-center">Registration Form</div>
          <div className="card-body">
            <Form layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              // autoComplete="off"
              initialValues={{ remember: true }}
            >
              <Form.Item
                label="Full Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please input a full name!',
                  }
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                  }
                ]}
              >
                <Input
                  type="email"
                />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input
                  type="password"

                />
              </Form.Item>
              <div className="d-flex justify-content-between">
                <Link to="/login">Already register ? click here to login </Link>
                {
                  loading
                    ?
                    <Spinner />
                    :
                    <Form.Item>
                      <Button
                        className="warning"
                        htmlType="submit">
                        Register
                      </Button>
                    </Form.Item>
                }
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register;