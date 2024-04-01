import React from "react";
import { Button, Checkbox, Form, Input } from "antd";

const Password = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="w-full">
      <h1 className="text-4xl tracking-wider font-medium">Şifre Ayarları</h1>
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
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password placeholder="Şifrenizi Giriniz" className="py-3" />
      </Form.Item>

      <Form.Item
        name="confirm"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The new password that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password placeholder="Şifrenizi Tekrar Giriniz" className="py-3" />
      </Form.Item>
        <button className="bg-secondary text-white py-3 rounded-md w-full" type="submit">UPDATE</button>
      </Form>
    </div>
  );
};



export default Password