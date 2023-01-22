import React, { useState, useEffect } from 'react';
import './homePage.css';
import Layout from '../../components/layout/Layout';
import { Button, Form, Input, message, Modal, Select, Table, DatePicker } from 'antd';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import moment from 'moment';
import { PieChartOutlined, TableOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Analytics from '../../components/analytics/Analytics';

const { RangePicker } = DatePicker;



const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allTransactionState, setAllTransactionState] = useState([]);
  const [frequency, setFrequency] = useState('365'); // frequency state here 7 is the days value
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState('all');
  const [categories, setCategories] = useState('other');
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);

    //useEffect Hook
    useEffect(() => {
      getAllTransactions()
    }, [frequency, selectedDate, type, categories]);

       /**
       * Get all transactions
       */
       const getAllTransactions = async () => {
        try {
          const user = JSON.parse(localStorage.getItem('user'));
          // console.log(user._id,'user id');
          setIsLoading(true);
          const response = await axios.post(
            '/api/v1/transaction/all-transaction',
            {
              user_id: user._id,
              frequency,
              selectedDate,
              type,
              categories,
            }
          );
          setIsLoading(false);
          setAllTransactionState(response.data);
          console.log(response.data);

        } catch (err) {
          console.error(err);
          message.error("Facing issue while fetching data!!");
        }
      }

  const showModel = () => {
    setIsModalOpen(true);
  }

  const onFinish = async (values) => {
    // console.log("success:", values);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      setIsLoading(true);
      if (editable) {
        console.log("values",values);
        await axios.post("/api/v1/transaction/edit-transaction", {
          payload: {
            ...values,
            user_id: user._id,
          },
          transactionId: editable._id,
        });
        setIsLoading(false);
        message.success("Transaction updated successfully!!");
        getAllTransactions();
      } else {
        await axios.post('/api/v1/transaction/add-transaction', {
          ...values,
          user_id: user._id,
        });
        setIsLoading(false);
        message.success('Transaction added successfully!!');
      }
      setIsModalOpen(false);
      setEditable(null);
      getAllTransactions();
    } catch (error) {
      setIsLoading(false);
      message.error("Failed to add transaction");
    }
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed', errorInfo);
  }



  //delete handler
  const handleDelete = async (record) => {
    try {
      setIsLoading(true);
      await axios.post("/api/v1/transaction/delete-transaction", {
        transactionId: record._id,
      });
      setIsLoading(false);
      message.success("Transaction Deleted!!!");
      getAllTransactions();
    } catch (error) {
      setIsLoading(false)
      console.log(error);
      message.error("Unable to delete!!!");
    }
  }

  /**
   * Table in ant design
   */
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      render: (text) => <span>{moment(text).format("DD-MM-YYYY")}</span>,
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
      title: 'Actions',
      render: (text, record) => (
        <div>
          <EditOutlined onClick={() => {
            setEditable(record)
            setIsModalOpen(true)
          }} />
          <DeleteOutlined className="mx-2"
            onClick={() => {
              handleDelete(record);
            }}
          />
        </div>
      )
    },
  ]
  return (
    <>
      <Layout>
        <div className="container-fluid">
          <div className="row">
            <div className="transaction-card">
              <div className="col-md-3">
                <p>Select Frequency</p>
                <Select value={frequency} onChange={(values) => setFrequency(values)}>
                  <Select.Option value="7">Last 1 Week</Select.Option>
                  <Select.Option value="30">Last 1 Month</Select.Option>
                  <Select.Option value="365">Last 1 Year</Select.Option>
                  <Select.Option value="custom">Custom</Select.Option>
                </Select>
                {frequency === 'custom' && (<RangePicker
                  value={selectedDate}
                  onChange={(values) => setSelectedDate(values)}
                />)}
              </div>
              <div className="col-md-2">
                <p>Select Type</p>
                <Select value={type} onChange={(values) => setType(values)}>
                  <Select.Option value="income">Income</Select.Option>
                  <Select.Option value="expanse">Expanse</Select.Option>
                </Select>
              </div>
              <div className="col-md-3 text-center">
                <p>Categories</p>
                <Select value={categories} onChange={(values) => setCategories(values)}>
                  <Select.Option value="other">Other</Select.Option>
                  <Select.Option value="salary">Salary</Select.Option>
                  <Select.Option value="tip">Tip</Select.Option>
                  <Select.Option value="project">Project</Select.Option>
                  <Select.Option value="movie">Movie</Select.Option>
                  <Select.Option value="bills">Bills</Select.Option>
                  <Select.Option value="tax">Tax</Select.Option>
                  <Select.Option value="medical">Medical</Select.Option>
                  <Select.Option value="fees">Fees</Select.Option>
                </Select>
              </div>
              <div className="col-md-3 text-center ">
                <p>Analytics</p>
                <div className='icons-container'>
                  <TableOutlined
                    className={`mx-2 ${viewData === 'table' ? 'active-icon' : 'inactive-icon'}`}
                    onClick={() => setViewData('table')} />
                  <PieChartOutlined
                    className={`mx-2 ${viewData === 'analytics' ? 'active-icon' : 'inactive-icon'}`}
                    onClick={() => setViewData('analytics')} />
                </div>
              </div>
              <div className="col-md-1 ">
                <button className="btn btn-warning" onClick={showModel}>Add Expanse</button>
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          {
            viewData === 'table'
              ? <Table className='mt-2 table-responsive' columns={columns} dataSource={allTransactionState} />
              : <Analytics className='mt-2' allTransaction={allTransactionState} />
          }
        </div>
        {/* start of modal code */}
        <Modal title={editable ? "Edit Transaction" : "Add New Transaction"}
          footer={null}
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}>
          <div className="card">
            <div className="card-body">
              <Form
                layout="vertical"
                onFinish={onFinish}
                initialValues={editable}
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