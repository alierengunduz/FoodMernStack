import HomePage from './pages/HomePage'
import { Routes, Route } from 'react-router-dom'
import AllProductPage from './pages/AllProductPage'
import CampaignsPage from './pages/CampaignsPage'
import CartPage from './pages/CartPage'
import Profile from './pages/Profile'
import AdminUserPage from './pages/Admin/AdminUserPage'
import CategoryPage from './pages/Admin/Categories/CategoryPage'
import UpdateCategoryPage from './pages/Admin/Categories/UpdateCategoryPage'
import CreateCategoryPage from './pages/Admin/Categories/CreateCategoryPage'
import CreateProductPage from './pages/Admin/Products/CreateProductPage'
import ProductPage from './pages/Admin/Products/ProductPage'
import UpdateProductPage from './pages/Admin/Products/UpdateProductPage'
import CouponPage from './pages/Admin/Coupons/CouponPage'
import CreateCouponsPage from './pages/Admin/Coupons/CreateCouponsPage'
import UpdateCouponPage from './pages/Admin/Coupons/UpdateCouponPage'
import PizzaProductPage from './pages/Admin/PizzaProducts/PizzaProductPage'
import CreatePizzaProductPage from './pages/Admin/PizzaProducts/CreatePizzaProductPage'
import UpdatePizzaProductPage from './pages/Admin/PizzaProducts/UpdatePizzaProductPage'
const App = () => {
  return (
    <>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/allproduct" element={<AllProductPage />} />
      <Route path="/campaigns" element={<CampaignsPage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path='/admin/*'>
        <Route path="users" element={<AdminUserPage />} />
        <Route path="categories" element={<CategoryPage />} />
        <Route path="categories/update/:id" element={<UpdateCategoryPage />} />
        <Route path="categories/create" element={<CreateCategoryPage />} />
        <Route path="products/create" element={<CreateProductPage />} />
        <Route path="products" element={<ProductPage />} />
        <Route path="products/update/:id" element={<UpdateProductPage />} />
        <Route path="coupons" element={<CouponPage />} />
        <Route path="coupons/create" element={<CreateCouponsPage />} />
        <Route path="coupons/update/:id" element={<UpdateCouponPage />} />
        <Route path="pizzaproducts" element={<PizzaProductPage />} />
        <Route path="pizzaproducts/create" element={<CreatePizzaProductPage />} />
        <Route path="pizzaproducts/update/:id" element={<UpdatePizzaProductPage />} />
      </Route>
    </Routes>
    </>
    
    
  )
}

export default App