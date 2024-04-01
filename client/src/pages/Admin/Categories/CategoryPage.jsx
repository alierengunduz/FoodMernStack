import React, { useState, useEffect } from "react";
import { Table, message,Button,Popconfirm,Space } from "antd";
import {useNavigate} from 'react-router-dom'
import moment from "moment";
const CategoryPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/api/startCategories`);
        if (!response.ok) {
          message.error("Kategori getirilemedi");
          return;
        }
        if (response.ok) {
          const data = await response.json();
          setDataSource(data);
          message.success("Kategori getirildi");
        }
      } catch (error) {
        console.log(error);
        message.error("Kategori getirilemedi");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [apiUrl]);



  const columns = [
    {
      title: "Kullanıcı Resmi",
      dataIndex: "img",
      key: "img",
      render: (avatar) => (
        <img
          src={avatar}
          alt="name"
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
      ),
    },
    {
      title: "Kullanıcı Adı",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Oluşturulma Tarihi",
      dataIndex: "createdAt",
      key: "createdAt",
      record:  (text, record) => (
        <span>{moment(record.createdAt).format("DD/MM/YYYY")}</span>
      ),
    },
    {
      title: "Action",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button  ghost
           type="primary" onClick={() => navigate(`/admin/categories/update/${record._id}`)
           }>Düzenle</Button>
          <Popconfirm
            title="Kullanıcıyı silmek istediğinize emin misiniz?"
            onConfirm={() => deleteUser(record._id)}
            okText="Evet"
            cancelText="Hayır"
          >
            <Button type="primary" danger   
            >Sil</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const deleteUser = async (categoryId) => {
    try {
      const response = await fetch(`${apiUrl}/api/startCategories/${categoryId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        message.error("Kullanıcı silinemedi");
        return;
      }
      if (response.ok) {
        const deletedCategoryId = categoryId;
        setDataSource((prev) => prev.filter((item) => item._id !== deletedCategoryId));
        message.success("Kullanıcı silindi");
      }
    } catch (error) {
      console.log(error);
      message.error("Kullanıcı silinemedi");
    }
  }
  

  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(record) => record._id}
        loading={loading}
      />
    </div>
  );
};


export default CategoryPage