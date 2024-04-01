import React,{useState} from 'react'
import { MdAccountBalance } from "react-icons/md";
import { TbPasswordUser } from "react-icons/tb";
import { FaMotorcycle } from "react-icons/fa";
import { IoIosExit } from "react-icons/io";
import Account from '../components/Profile/Account'
import Password from '../components/Profile/Password'
import Orders from '../components/Profile/Orders'
import Exit from '../components/Profile/Exit'
const Profile = () => {

 const [activeTab, setActiveTab] = useState('account')


  return (
    <div className='w-full '>
      <div className='flex items-start gap-x-10 p-20'>
      <div className='w-1/3 border-2 flex flex-col items-center justify-center rounded-lg shadow-sm shadow-gray-300'>
        <img className='w-28 h-28 object-cover' src="img/pizza/pizza1.png" alt="" />
        <h1 className='font-bold tracking-wider text-xl'>Hasan Balıkçı</h1>
        <ul className='w-full flex flex-col gap-y-4 p-5 text-xl'>
              <li onClick={() => setActiveTab('account')}
               className='flex items-center gap-x-2 border-2 cursor-pointer h-16 hover:bg-secondary transition-all duration-300 hover:text-gray-100 hover:translate-x-1 rounded-2xl p-2'>
                <span><MdAccountBalance /></span>
                <p>Hesap</p>
              </li>
              <li onClick={() => setActiveTab('password')} 
              className='flex items-center gap-x-2 border-2 h-16 cursor-pointer hover:bg-secondary transition-all duration-300 hover:text-gray-100 hover:translate-x-1 rounded-2xl p-2'>
                <span><TbPasswordUser/></span>
                <p>Şifre</p>
              </li>
              <li onClick={() => setActiveTab('orders')} 
              className='flex items-center gap-x-2 border-2 h-16 cursor-pointer hover:bg-secondary transition-all duration-300 hover:text-gray-100 hover:translate-x-1 rounded-2xl p-2'>
                <span><FaMotorcycle /></span>
                <p>Sipariş</p>
              </li>
              <li onClick={() => setActiveTab('exit')} 
              className='flex items-center gap-x-2 border-2 h-16 cursor-pointer hover:bg-secondary transition-all duration-300 hover:text-gray-100 hover:translate-x-1 rounded-2xl p-2'>
                <span><IoIosExit /></span>
                <p>Çıkış</p>
              </li>
        </ul>
      </div>
        <div className='w-2/3'>
            {
                activeTab === 'account' && <Account />
                }
                {
                activeTab === 'password' && <Password />
                }
                {
                activeTab === 'orders' && <Orders />
            }
            {
                activeTab === 'exit' && <Exit />
            }
        </div>
      </div>
    </div>
  )
}

export default Profile