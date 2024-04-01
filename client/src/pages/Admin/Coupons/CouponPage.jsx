import React, { useState, useEffect } from "react";
import { Table, message,Button,Popconfirm,Space } from "antd";
import {useNavigate} from 'react-router-dom'
import moment from "moment";
const CouponPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/api/coupons`);
        if (!response.ok) {
          message.error("Kupon getirilemedi");
          return;
        }
        if (response.ok) {
          const data = await response.json();
          setDataSource(data);
          message.success("Kupon getirildi");
        }
      } catch (error) {
        console.log(error);
        message.error("Kupon getirilemedi");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [apiUrl]);



  const columns = [
    {
      title: "Kupon Kodu",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "İndirim Oranı",
      dataIndex: "discountPercent",
      key: "discountPercent",
      render: (text) => (
        <span>%{text}</span>
      ),
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
           type="primary" onClick={() => navigate(`/admin/coupons/update/${record._id}`)
           }>Düzenle</Button>
          <Popconfirm
            title="Kullanıcıyı silmek istediğinize emin misiniz?"
            onConfirm={() => deleteCoupons(record._id)}
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
  const deleteCoupons = async (couponId) => {
    try {
      const response = await fetch(`${apiUrl}/api/coupons/${couponId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        message.error("Kupon silinemedi");
        return;
      }
      if (response.ok) {
        const deletedCouponId = couponId;
        setDataSource((prev) => prev.filter((item) => item._id !== deletedCouponId));
        message.success("Kupon silindi");
      }
    } catch (error) {
      console.log(error);
      message.error("Kupon silinemedi");
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


export default CouponPage