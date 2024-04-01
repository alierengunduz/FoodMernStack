import React from "react";
import { Button, Checkbox, Form, Input } from "antd";

const Account = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="w-full">
      <h1 className="text-4xl tracking-wider font-medium">Hesap Ayarları</h1>
      <Form
      className="grid grid-cols-2 gap-4 mt-10 w-full"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="fullName"
          rules={[
            {
              required: true,
              message: "Please input your fullName!",
            },
          ]}
        >
          <Input className="py-3" placeholder="Tam Adınızı Giriniz" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input className="py-3" placeholder="E-Posta Giriniz" />
        </Form.Item>

        <Form.Item
          name="phone"
          rules={[
            {
              required: true,
              message: "Please input your phone!",
            },
          ]}
        >
          <Input className="py-3" placeholder="Telefon Numaranızı Giriniz" />
        </Form.Item>

        <Form.Item
          name="adress"
          rules={[
            {
              required: true,
              message: "Please input your adress!",
            },
          ]}
        >
          <Input className="py-3" placeholder="Adresinizi Giriniz" />
        </Form.Item>
        <button className="bg-secondary text-white py-3 rounded-md w-full" type="submit">UPDATE</button>
      </Form>
    </div>
  );
};

export default Account;
