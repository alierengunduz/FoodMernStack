import React, { useState } from "react";
import { Button, Form, Input,Spin,message,InputNumber } from "antd";

const CreateCouponsPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const resnpose = await fetch(
        `${apiUrl}/api/coupons`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      if (resnpose.ok) {
        message.success("Kupon başarıyla eklendi");
        form.resetFields();
      } else {
        message.error("Kupon eklenirken bir hata oluştu");
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
          label="Kupon Kodu"
          name="code"
          rules={[
            {
              required: true,
              message: "Lütfen kupon adını giriniz!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Kupon İndirim Oranı"
          name="discountPercent"
          rules={[
            {
              required: true,
              message: "Lütfen kupon indirim oranını giriniz!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item>
          <Button ghost type="primary" htmlType="submit">
            Kupon Oluştur
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
};


export default CreateCouponsPage