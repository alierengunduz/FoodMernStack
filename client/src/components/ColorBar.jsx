import React from 'react'
import Lottie from 'lottie-react'
import animationData from '../assets/headerAnim.json'
const ColorBar = () => {
  return (
    <div className='bg-red-600 mt-20 w-full h-20 rotate-2 flex items-center justify-center'>
      <p className='text-white tracking-wider text-center text-2xl'>Yemekleriniz Özenle Hazırlanmaktadır. </p>
      <Lottie animationData={animationData} style={{ width: 100, height: 100 }} />
    </div>
  )
}

export default ColorBar