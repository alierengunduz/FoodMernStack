import React, { useState,useEffect } from "react";
import { Button, Form, Input, InputNumber, Spin, message, Select } from "antd";
import {useParams,useNavigate} from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const UpdateProductPage = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const productId = params.id;
  const [form] = Form.useForm();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;


 
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [categoriesResponse, productsResponse] = await Promise.all([
          fetch(`${apiUrl}/api/startCategories`),
          fetch(`${apiUrl}/api/allProduct/${productId}`),
        ]);
        if (!categoriesResponse.ok || !productsResponse.ok) {
          message.error("Kategori veya ürün getirilemedi");
          return;
        }
        const [categoriesData, productsData] = await Promise.all([
          categoriesResponse.json(),
          productsResponse.json(),
        ]);
        
        setCategories(categoriesData);

      if (productsData) {
        form.setFieldsValue({
          title: productsData.title,
          type: productsData.type,
          img: productsData.img,
          description: productsData.description,
          current: productsData.price.current,
          discount: productsData.price.discount,
          category: productsData.category,
        });  
      }
      } catch (error) {
        console.log(error);
        message.error("Kategori getirilemedi");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [apiUrl, productId, form]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const resnpose = await fetch(`${apiUrl}/api/allProduct/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          price:{
            current:values.current,
            discount:values.discount
          }
        }),
      });
      if (resnpose.ok) {
        message.success("Ürün başarıyla eklendi");
        form.resetFields();
        navigate("/admin/products");
      } else {
        message.error("Ürün eklenirken bir hata oluştu");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <Form
        form={form}
        layout="vertical"
        name="basic"
        labelCol={{
          span: 8,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Ürün Adı"
          name="title"
          rules={[
            {
              required: true,
              message: "Lütfen ürün adını giriniz!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Ürün Tipi"
          name="type"
          rules={[
            {
              required: true,
              message: "Lütfen ürün tipini giriniz!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Ürün Resmi"
          name="img"
          rules={[
            {
              required: true,
              message: "Lütfen ürün resmini giriniz!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Ürün Açıklaması"
          name="description"
          rules={[
            {
              required: true,
              message: "Lütfen ürün açıklamasını giriniz!",
            },
          ]}
        >
          <ReactQuill
            theme="snow"
            style={{
              backgroundColor: "white",
            }}
          />
        </Form.Item>
        <Form.Item
          label="Ürün Fiyatı"
          name="current"
          rules={[
            {
              required: true,
              message: "Lütfen ürün fiyatını giriniz!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Ürün İndirimi Oranı"
          name="discount"
          rules={[
            {
              required: true,
              message: "Lütfen ürün indirimi oranını giriniz!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Ürün Kategori Seçiniz"
          name="category"
          rules={[
            {
              required: true,
              message: "Lütfen ürün kategorisini seçiniz!",
            },
          ]}
        >
          <Select>
            {
              categories.map((category) => (
                <Select.Option value={category._id} key={category._id}>
                  {category.name}
                </Select.Option>
              ))
            }
          </Select>
        </Form.Item>

        <Form.Item>
          <Button ghost type="primary" htmlType="submit">
            Ürünü Güncelle
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};


export default UpdateProductPage;
