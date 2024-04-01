import React, { useState,useEffect } from "react";
import { Button, Form, Input, InputNumber, Spin, message, Select } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const CreateProductPage = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [form] = Form.useForm();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;


  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/api/startCategories`);
        if (!response.ok) {
          message.error("Product getirilemedi");
          return;
        }
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
          message.success("Product getirildi");
        }
      } catch (error) {
        console.log(error);
        message.error("Product getirilemedi");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [apiUrl]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const resnpose = await fetch(`${apiUrl}/api/allProduct`, {
        method: "POST",
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
        message.success("Product başarıyla eklendi");
        form.resetFields();
      } else {
        message.error("Product eklenirken bir hata oluştu");
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
            Oluştur
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};

export default CreateProductPage;
