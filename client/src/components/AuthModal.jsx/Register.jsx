import React from "react";
import { Form, Input,message } from "antd";
import {useNavigate} from "react-router-dom";
const Register = ({onCloseModal}) => {
   const [form] = Form.useForm();
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const onFinish = async (values) => {
      try {
        const response = await fetch(`${apiUrl}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
            });
             if (response.status === 400) {
                message.error("Bu e-posta adresi zaten kullanılmakta");
                return;
              
             }
            if (response.ok) {
                const data = await response.json();
                const {password, ...rest} = data;
                 localStorage.setItem("user", JSON.stringify(rest));
                message.success("Kayıt başarılı");
                form.resetFields();
                onCloseModal();
            }
      } catch (error) {
        console.log(error);
        message.error("Kayıt başarısız");
      }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
        form={form}
      className="mt-5"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input placeholder="Ad Soyad" />
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
        <Input placeholder="E-Posta" className="py-2" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password className="py-2" placeholder="Şifre" />
      </Form.Item>

      <Form.Item
        name="confirm"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The new password that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password className="py-2" placeholder="Şifre Tekrar" />
      </Form.Item>

      <button
        className="bg-red-600 text-white w-full py-2 rounded-lg"
        type="submit"
      >
        Kayıt Ol
      </button>
    </Form>
  );
};

export default Register;
