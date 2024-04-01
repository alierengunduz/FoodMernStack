import React, { useState, useContext } from "react";
import { Table, Flex, Progress, message } from "antd";
import { FaGift } from "react-icons/fa";
import { IoMdPricetags } from "react-icons/io";
import { CartContext } from "../context/CartProvider";
import Swal from 'sweetalert2'
 
const CartPage = () => {
  const [fastCargoChecked, setFastCargoChecked] = useState(false);
  const { cartItems, removeFromCart, setCartItems } = useContext(CartContext);
  const [couponCode, setCouponCode] = useState("");
  const [cartTotals, setCartTotals] = useState(
    cartItems.reduce(
      (previousValue, item) =>
        previousValue + item.price.current * item.quantity,
      0
    )
  );

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  // Sepetin alt toplamını hesapla
  const subTotals = cartItems.reduce(
    (previousValue, item) =>
      previousValue + item.price.current * item.quantity,
    0
  );

  // Miktarı güncelle ve toplamı hesapla
  const handleQuantityChange = (productId, amount) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item._id === productId) {
        const newQuantity = item.quantity + amount;
        item.quantity = Math.max(1, newQuantity);
      }
      return item;
    });

    const updatedSubTotals = updatedCartItems.reduce(
      (previousValue, item) =>
        previousValue + item.price.current * item.quantity,
      0
    );
    const updatedCartTotals = fastCargoChecked
      ? updatedSubTotals + cargoFee
      : updatedSubTotals;
    setCartTotals(updatedCartTotals);
  };

  const cargoFee = 15;

  const dataSource = cartItems.map((item) => ({
    key: item._id,
    productImg: <img src={item.img} alt={item.Name} className="w-10 h-10" />,
    product: item.name || item.title,
    price: item.price.current,
    quantity: item.quantity,
  }));

  const columns = [
    {
      title: "Ürün Resmi",
      dataIndex: "productImg",
      key: "productImg",
    },
    {
      title: "Ürün",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => (
        <div className="flex items-center gap-x-2">
          <button
            onClick={() => handleQuantityChange(record.key, -1)}
            className="bg-primary text-white py-1 px-3 rounded-md hover:bg-third transition-all duration-300"
          >
            -
          </button>
          <span>{record.quantity}</span>
          <button
            onClick={() => handleQuantityChange(record.key, 1)}
            className="bg-primary text-white py-1 px-3 rounded-md hover:bg-third transition-all duration-300"
          >
            +
          </button>
        </div>
      ),
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <button
          onClick={() => removeFromCart(record.key)}
          className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition-all duration-300"
        >
          Sil
        </button>
      ),
    },
  ];

  const handleFastCargoChange = () => {
    setFastCargoChecked(!fastCargoChecked);
    const updatedCartTotals = fastCargoChecked
      ? cartTotals - cargoFee
      : cartTotals + cargoFee;
    setCartTotals(updatedCartTotals);
  };
  const applyCoupon = async () => {
    if (couponCode.trim().length === 0) {
      return message.warning("Boş değer girilimez.");
    }
  
 
    try {
      const res = await fetch(`${apiUrl}/api/coupons/code/${couponCode}`);

      if (!res.ok) {
        return message.warning("Girdiğiniz kupon kodu yanlış!");
      }

      const data = await res.json();
      const discountPercent = data.discountPercent;

       const updatedCartTotals = cartTotals - (cartTotals * discountPercent) / 100;
      setCartTotals(updatedCartTotals);

      
      message.success(`${couponCode} kupon kodu başarıyla uygulandı.`);
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className="w-full min-h-[550px]">
      <div className="flex sm:flex-row flex-col sm:gap-y-0 gap-y-5 items-start justify-center pt-10 sm:p-0 p-3">
        {/* ---------left components---------- */}
        <div className="sm:w-2/3 w-full flex flex-col sm:px-10 px-2 gap-y-10">
          <div className="border min-h-[100px] p-2 rounded-md flex flex-col gap-y-2 shadow-md shadow-blue-300">
            <div className="flex items-center gap-x-2">
              <span className="animate-bounce">
                <FaGift />
              </span>
              <p className="tracking-wider">
                Bar doldurduğunda ücretsiz bir sürpriz hediye kazanırsınız.
              </p>
            </div>
            <Flex gap="small" vertical>
              <Progress percent={50} status="active" />
            </Flex>
          </div>
          <div>
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={false}
            />
          </div>
          <div className="flex items-center justify-between border p-3 rounded-md">
            <div className="flex items-center gap-x-2">
              <input
                type="text"
                placeholder="Kupon Codu"
                className="border p-2 rounded-md"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button
                onClick={applyCoupon}
                className="bg-primary text-white py-2 px-10 rounded-md hover:bg-third transition-all duration-300"
              >
                Apply Coupon
              </button>
            </div>

          </div>
        </div>
        {/* ---------right components---------- */}
        <div className="sm:w-1/3 w-full flex h-[400px] relative flex-col sm:mx-10 mx-1 sm:p-5 p-2 gap-y-2 items-start justify-between shadow-md border border-gray-300 shadow-gray-500">
          <span className="absolute left-4 top-3">
            <IoMdPricetags size={30} />
          </span>
          <h2 className="text-center w-full text-xl tracking-wider font-semibold border-b py-2">
            Toplam Ürün Fiyatı
          </h2>
          <div className="w-full flex flex-col gap-y-4">
            <p className="w-full flex items-center justify-between border-b py-2">
              Sub Total: <span>$
              {subTotals}
              </span>
            </p>
            <div className="w-full flex items-center justify-between border-b py-2">
              <p>Shipping</p>
              <div className="flex items-center gap-x-2">
                <label className="cursor-pointer" htmlFor="kargo">
                  Hızlı Kargo <span className="border-b-4">$15.00</span>
                </label>
                <input
                  id="kargo"
                  type="checkbox"
                  className="w-4 h-4 cursor-pointer"
                  checked={fastCargoChecked}
                  onChange={handleFastCargoChange}
                />
              </div>
            </div>
            <p className="w-full flex items-center justify-between border-b py-2">
              Total: <span className="font-bold">${cartTotals}</span>
            </p>
          </div>
          <button  onClick={() => {
            Swal.fire({
              title: 'Do you want to save the changes?',
              showDenyButton: true,
              showCancelButton: true,
              confirmButtonText: `Save`,
              denyButtonText: `Don't save`,
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                Swal.fire('Saved!', '', 'success')
                 setCartItems([])
                 location.reload()
              } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
              }
            })
          }}
          className="bg-secondary text-white w-full py-2 rounded-lg hover:bg-yellow-600 transition-all duration-300">
            Checkout Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
