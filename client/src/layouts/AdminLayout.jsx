import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  AppstoreOutlined,
  LaptopOutlined,
  BarcodeOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const { Sider, Header, Content } = Layout;

const getUserRole = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? user.role : null;
};

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const userRole = getUserRole();
  const menuItems = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => {
        navigate(`/admin`);
      },
    },
    {
      key: "2",
      icon: <AppstoreOutlined />,
      label: "Kategoriler",
      path: "/",
      children: [
        {
          key: "3",
          label: "Kategori Listesi",
          path: "/admin/categories",
          onClick: () => {
            navigate(`/admin/categories`);
          },
        },
        {
          key: "4",
          label: "Yeni Kategori Oluştur",
          path: "/admin/categories/create",
          onClick: () => {
            navigate("/admin/categories/create");
          },
        },
      ],
    },
    {
      key: "5",
      icon: <AppstoreOutlined />,
      label: "Pizza Ürünler",
      path: "/",
      children: [
        {
          key: "6",
          label: "Pizza Ürün Listesi",
          path: "/admin/pizzaproducts",
          onClick: () => {
            navigate(`/admin/pizzaproducts`);
          },
        },
        {
          key: "7",
          label: "Yeni Pizza Ürün Oluştur",
          path: "/admin/pizzaproducts/create",
          onClick: () => {
            navigate("/admin/pizzaproducts/create");
          },
        },
      ],
    },
    {
      key: "8",
      icon: <LaptopOutlined />,
      label: "Ürünler",
      path: "/",
      children: [
        {
          key: "9",
          label: "Ürün Listesi",
          path: "/admin/products",
          onClick: () => {
            navigate(`/admin/products`);
          },
        },
        {
          key: "10",
          label: "Yeni Ürün Oluştur",
          path: "/admin/products/create",
          onClick: () => {
            navigate("/admin/products/create");
          },
        },
      ],
    },
    {
      key: "11",
      icon: <BarcodeOutlined />,
      label: "Kuponlar",
      path: "/admin/coupons",
      children: [
        {
          key: "12",
          label: "Kupon Listesi",
          path: "/admin/coupons",
          onClick: () => {
            navigate(`/admin/coupons`);
          },
        },
        {
          key: "13",
          label: "Yeni Kupon Oluştur",
          path: "/admin/coupons/create",
          onClick: () => {
            navigate("/admin/coupons/create");
          },
        },
      ],
    },
    {
      key: "14",
      icon: <UserOutlined />,
      label: "Kullanıcı Listesi",
      path: "/admin/users",
      onClick: () => {
        navigate(`/admin/users`);
      },
    },
    {
      key: "15",
      icon: <ShoppingCartOutlined />,
      label: "Siparişler",
      onClick: () => {
        navigate(`/admin/orders`);
      },
    },
    {
      key: "16",
      icon: <RollbackOutlined />,
      label: "Ana Sayfaya Git",
      onClick: () => {
        window.location.href = "/";
      },
    },
  ];

  if (userRole === "admin") {
    return (
      <div className="admmin-layout">
        <Layout
          style={{
            minHeight: "100vh",
          }}
        >
          <Sider width={200} theme="dark">
            <Menu
              mode="vertical"
              style={{ height: "100%" }}
              items={menuItems}
            />
          </Sider>
          <Layout>
            <Header>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "white",
                }}
              >
                <h2>Admin Paneli</h2>
              </div>
            </Header>
            <Content>
              <div
                className="site-layout-background"
                style={{ padding: "24px 50px", minHeight: 360 }}
              >
                {children}
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  } else {
    return (window.location.href = "/");
  }
};

export default AdminLayout;