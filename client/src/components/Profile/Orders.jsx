import React from 'react'
import { Table } from 'antd';
const Orders = () => {

  const dataSource = [
    {
      key: '1',
      id: '1',
      adress: 'New York No. 1 Lake Park',
      date: '2021-05-10',
      total: '200',
      status: 'Delivered'
    },
    {
      key: '2',
      id: '2',
      adress: 'London No. 1 Lake Park',
      date: '2021-05-10',
      total: '200',
      status: 'Delivered'
    },
    {
      key: '3',
      id: '3',
      adress: 'Sidney No. 1 Lake Park',
      date: '2021-05-10',
      total: '200',
      status: 'Delivered'
    },

  ];
  
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Adress',
      dataIndex: 'adress',
      key: 'adress',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  return (
    <div>
      <h1 className='text-3xl font-medium tracking-wider'>Şipariş Detayı</h1>
      <div className='mt-5'>
      <Table pagination={false} dataSource={dataSource} columns={columns} />
      </div>
    </div>
  )
}

export default Orders