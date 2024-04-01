import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import {message} from 'antd'
const Content = () => {

 const [products, setProducts] = useState([])
 const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
   const fetchProducts = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/startCategories`);
      if (!response.ok) {
        message.error('Bir hata oluştu');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
   }
    fetchProducts();
  }, [
    apiUrl
  ])


  return (
    <div className='w-full sm:px-20 px-0 flex items-start  mt-10 py-5 p-1'>
      <div className='w-full '>
        <h1 className='pt-10 pb-2 text-2xl font-medium tracking-widest border-b-2 border-double border-secondary'>Şiparişe Başla</h1>
        <div className='grid sm:grid-cols-7 grid-cols-2 gap-x-6 mt-10 gap-5 place-items-center  w-full'>
         {
          products.map((item) => (
            <Link  to={item.goLink} target='_top'  key={item._id} className='flex flex-col items-center justify-between border-2 p-3 h-52 rounded-lg shadow-sm shadow-gray-500 cursor-pointer hover:translate-x-2 transition-all duration-300'>
            <img className='sm:w-32 sm:h-32 w-32 h-28 object-cover  rounded-md' src={item.img} alt={item.name} />
          <span className='font-bold'>{item.name}</span>
        </Link>
          ))
         }
        </div>
      </div>
    </div>
  )
}

export default Content