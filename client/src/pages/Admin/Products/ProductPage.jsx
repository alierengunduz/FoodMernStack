import React, { useState, useEffect } from "react";
import { Table, message, Button, Popconfirm, Space } from "antd";
import { useNavigate } from "react-router-dom";
import moment from "moment";
const ProductPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [categoriesResponse, productsResponse] = await Promise.all([
          fetch(`${apiUrl}/api/startCategories`),
          fetch(`${apiUrl}/api/allProduct`),
        ]);
        if (!categoriesResponse.ok || !productsResponse.ok) {
          message.error("Kategori veya ürün getirilemedi");
          return;
        }
        const [categoriesData, productsData] = await Promise.all([
          categoriesResponse.json(),
          productsResponse.json(),
        ]);
        const productsWithCategory = productsData.map((product) => {
          const categoryId = product.category;
          const category = categoriesData.find(
            (item) => item._id === categoryId
          );
          return {
            ...product,
            category: category ? category.name : "Kategori bulunamadı",
          };
        });
        setDataSource(productsWithCategory);
      } catch (error) {
        console.log(error);
        message.error("Kategori getirilemedi");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [apiUrl]);

  const columns = [
    {
      title: "Ürün Resmi",
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
      title: "Ürün Adı",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Kategori Adı",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Oluşturulma Tarihi",
      dataIndex: "createdAt",
      key: "createdAt",
      record: (text, record) => (
        <span>{moment(record.createdAt).format("DD/MM/YYYY")}</span>
      ),
    },
    {
      title: "Action",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button
            ghost
            type="primary"
            onClick={() => navigate(`/admin/products/update/${record._id}`)}
          >
            Düzenle
          </Button>
          <Popconfirm
            title="Kullanıcıyı silmek istediğinize emin misiniz?"
            onConfirm={() => deleteUser(record._id)}
            okText="Evet"
            cancelText="Hayır"
          >
            <Button type="primary" danger>
              Sil
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const deleteUser = async (productId) => {
    try {
      const response = await fetch(`${apiUrl}/api/allProduct/${productId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        message.error("Ürün silinemedi");
        return;
      }
      if (response.ok) {
       setDataSource((prevProducts) => {
        return prevProducts.filter((product) => product._id !== productId);
       })
      }
    } catch (error) {
      console.log(error);
      message.error("Ürün silinemedi");
    }
  };

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

export default ProductPage;
