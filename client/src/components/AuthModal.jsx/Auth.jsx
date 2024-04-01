import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { Modal, Form, Input,message } from "antd";
import { Link } from "react-router-dom";
import Register from "./Register";
const Auth = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authIndex, setAuthIndex] = useState(true);
  const [form] = Form.useForm();
   const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const onFinish = async (values) => {
    try {
      const response = await fetch(`${apiUrl}/api/auth/login`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
          });
           if (response.status === 400) {
              message.error("Bu e-posta adresi ile kayıtlı kullanıcı bulunamadı. Lütfen bilgilerinizi kontrol edin.");
              return;
            
           }
          if (response.ok) {
              const data = await response.json();
              localStorage.setItem("user", JSON.stringify(data));
              if (data.role === "admin") {
                  window.location.href = "/admin";
              }
              if (data.role === "user") {
                  window.location.href = "/";
                  location.reload();
              }
              message.success("Giriş başarılı");
              handleCancel();
          }
          
    } catch (error) {
      console.log(error);
      message.error("Kayıt başarısız");
    }
};
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const changeAuth = () => {
    setAuthIndex(!authIndex);
  };

 

  return (
    <div>
      <span onClick={showModal}>
        <FaUser className="sm:text-2xl text-base" />
      </span>
      <Modal
        footer={null}
        title="Monster Pizza"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p
          className="text-center text-base font-light text-gray-600 cursor-pointer hover:translate-x-1 transition-all duration-300 tracking-wider"
          onClick={changeAuth}
        >
          {authIndex ? "Hesabın yok mu? Kayıt Ol" : "Hesabın var mı? Giriş Yap"}
        </p>
        {authIndex ? (
          <div id="login">
            <Form
              className="mt-5"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
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
              >
                <Input.Password placeholder="Şifre" className="py-2" />
              </Form.Item>
              <button
                className="bg-red-600 text-white w-full py-2 rounded-lg"
                type="submit"
              >
                GİRİŞ
              </button>
            </Form>
            <div className="flex flex-col gap-y-5 items-center justify-center mt-5">
              <Link className="tracking-wide" to="/">
                Şifremi Unuttum
              </Link>
            </div>
          </div>
        ) : (
          <div id="register">
            <Register  onCloseModal={handleCancel}/>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Auth;
