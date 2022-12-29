import React, { useState, useEffect } from 'react';
import './homePage.css';
import Layout from '../../components/layout/Layout';
import { Button, Form, Input, message, Modal, Select, Table } from 'antd';
import axios from 'axios';
import Spinner from '../../components/Spinner';




const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allTransactionState, setAllTransactionState] = useState([]);

  const showModel = () => {
    setIsModalOpen(true);
  }

  const onFinish = async (values) => {
    // console.log("success:", values);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      setIsLoading(true);
      await axios.post('/transaction/add-transaction', {
        ...values,
        user_id: user._id,
      });
      message.success('Transaction added successfully!!');
      setIsLoading(false);
      setIsModalOpen(false);

    } catch (error) {
      setIsLoading(false);
      message.error("Failed to add transaction");
    }
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed', errorInfo);
  }

  /**
   * Get all transactions
   */
  const getAllTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      // console.log(user._id,'user id');
      setIsLoading(true);
      const response = await axios.post('/transaction/all-transaction', { user_id: user._id });
      setIsLoading(false);
      setAllTransactionState(response.data);
      console.log(response.data);

    } catch (err) {
      console.error(err);
      message.error("Facing issue while fetching data!!");
    }
  }

  //useEffect Hook
  useEffect(() => {
    getAllTransactions()
  }, []);

  /**
   * Table in ant design
   */
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date'
    },
    {
      title: 'Amount',
      dataIndex: 'amount'
    },
    {
      title: 'Type',
      dataIndex: 'type'
    },
    {
      title: 'Categories',
      dataIndex: 'categories'
    },
    {
      title: 'Reference',
      dataIndex: 'reference'
    },
    {
      title: 'Description',
      dataIndex: 'description'
    },
    {
      title: 'Actions'
    },
  ]
  return (
    <>
      <Layout>
        <div className="container-fluid">
          <div className="row">
            <div className="transaction-card">
              <p>Filters</p>
              <button className="btn btn-warning" onClick={showModel}>Add Expanse</button>
            </div>
          </div>
        </div>
        <div className='content'>
          <Table columns={columns} dataSource={allTransactionState} />
        </div>
        {/* start of modal code */}
        <Modal title="Add New Expanse" footer={null} open={isModalOpen} >
          <div className="card">
            <div className="card-body">
              <Form
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}>
                <Form.Item
                  label="Amount"
                  name="amount"
                  rules={[
                    {
                      required: true,
                      message: 'Please input amount!',
                    }
                  ]}
                >
                  <Input type="number" min={0} />
                </Form.Item>
                <Form.Item
                  label="Type"
                  name="type"
                  rules={[
                    {
                      required: true,
                      message: 'Please input type!',
                    }
                  ]}
                >
                  <Select>
                    <Select.Option value="income">Income</Select.Option>
                    <Select.Option value="expanse">Expanse</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Category"
                  name="categories"
                  rules={[
                    {
                      required: true,
                      message: 'Please input category!',
                    }
                  ]}
                >
                  <Select>
                    <Select.Option value="salary">Salary</Select.Option>
                    <Select.Option value="tip">Tip</Select.Option>
                    <Select.Option value="project">Project</Select.Option>
                    <Select.Option value="movie">Movie</Select.Option>
                    <Select.Option value="bills">Bills</Select.Option>
                    <Select.Option value="tax">Tax</Select.Option>
                    <Select.Option value="medical">Medical</Select.Option>
                    <Select.Option value="fees">Fees</Select.Option>
                    <Select.Option value="other">Other</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Date"
                  name="date"
                  rules={[
                    {
                      required: true,
                      message: 'Please input date!',
                    }
                  ]}
                >
                  <Input type="date" />
                </Form.Item>
                <Form.Item
                  label="Reference"
                  name="reference"
                >
                  <Input type="text" />
                </Form.Item>

                <Form.Item
                  label="Description"
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: 'Please input description!',
                    }
                  ]}
                >
                  <Input type="text" />
                </Form.Item>
                {isLoading ?
                  <Spinner />
                  :
                  <Form.Item>
                    <Button
                      style={{ float: 'right' }}
                      htmlType="submit">
                      SAVE
                    </Button>
                  </Form.Item>
                }
              </Form>
            </div>
          </div>
        </Modal>
        {/* end of modal code */}
      </Layout>
    </>
  )
}

export default HomePage;