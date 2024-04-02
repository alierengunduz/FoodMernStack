import MainLayout from "./MainLayout";
import AdminLayout from "./AdminLayout";

const isAdmin =  window.location.pathname.includes('/admin')
export const Layout = isAdmin ? AdminLayout : MainLayout