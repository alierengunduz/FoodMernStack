import React from 'react';

const Dialog = ({isDialogShow, setIsDialogShow, handleOverlayClick}) => {

 const handleCloseDialog = (e) => {
     const  checked = e.target.checked;
     localStorage.setItem('dialog', JSON.stringify(!checked));
 }

  return (
    <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-85 z-50 ${isDialogShow ? "" : "hidden"}`} onClick={handleOverlayClick}>
      <div className='bg-white w-[50%] h-[60%] flex gap-y-10 p-5 rounded-md'>
        <div className='w-[50%]'>
          <img src="img/content5.jpg" className='w-full h-full object-cover rounded-md' alt="" />
        </div>
        <div className='w-[50%] flex flex-col items-center justify-start gap-y-10 p-5'>
          <h1 className='text-xl tracking-wider font-semibold'>NEWSLETTER</h1>
          <p className='text-center'>
            Subscribe to our newsletter and get 10% off your first purchase
          </p>
          <input className='border w-full py-2 rounded-md pl-2 outline-none ring-1 ring-gray-300 focus:ring-2 focus:ring-gray-500 transition-all duration-300' type="text" placeholder='Email adresinizi girin...' />
          <button className='bg-blue-500 text-white w-full py-2 rounded-md hover:bg-blue-800 transition-colors duration-300'>Tekliflerden haberdar ol</button>
          <div className='flex items-center gap-x-2'>
            <input className='w-4 h-4' type="checkbox" id='dialog'
                onChange={handleCloseDialog}
            />
            <label className='cursor-pointer' htmlFor="dialog">
              Bir dahaki sefere gösterme
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dialog;
