import React, { useState, useEffect } from "react";
import { Table, message,Button,Popconfirm } from "antd";
const AdminUserPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/api/users`);
        if (!response.ok) {
          message.error("Kullanıcılar getirilemedi");
          return;
        }
        if (response.ok) {
          const data = await response.json();
          setDataSource(data);
          message.success("Kullanıcılar getirildi");
        }
      } catch (error) {
        console.log(error);
        message.error("Kullanıcılar getirilemedi");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [apiUrl]);



  const columns = [
    {
      title: "Kullanıcı Resmi",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar) => (
        <img
          src={avatar}
          alt="avatar"
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
      ),
    },
    {
      title: "Kullanıcı Adı",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Action",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <Popconfirm
        title="Kullanıcıyı sil?"
        description="Kullanıcıyı silmek istediğinize emin misiniz"
        okText= <span style={{color:"black"}}>Yes</span>
        cancelText="No"
        onConfirm={()=>deleteUser(record.email)}
      >
        <Button danger>Delete</Button>
      </Popconfirm>
      ),
    },
  ];
  const deleteUser = async (userEmail) => {
    try {
      const response = await fetch(`${apiUrl}/api/users/${userEmail}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        message.error("Kullanıcı silinemedi");
        return;
      }
      if (response.ok) {
        const data = await response.json();
        setDataSource((prev) => prev.filter((item) => item._id !== data._id));
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

export default AdminUserPage;
