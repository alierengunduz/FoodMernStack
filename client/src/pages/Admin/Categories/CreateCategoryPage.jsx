import React, { useState } from "react";
import { Button, Form, Input,Spin,message } from "antd";

const CreateCategoryPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const resnpose = await fetch(
        `${apiUrl}/api/startCategories`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      if (resnpose.ok) {
        message.success("Kategori başarıyla eklendi");
        form.resetFields();
      } else {
        message.error("Kategori eklenirken bir hata oluştu");
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
          label="Kategori Adı"
          name="name"
          rules={[
            {
              required: true,
              message: "Lütfen kategori adını giriniz!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Kategori Resmi"
          name="img"
          rules={[
            {
              required: true,
              message: "Lütfen kategori görsel linkini giriniz!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button ghost type="primary" htmlType="submit">
            Kategori Ekle
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};


export default CreateCategoryPage