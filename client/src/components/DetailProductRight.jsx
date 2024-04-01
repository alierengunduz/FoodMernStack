import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const DetailProductRight = ({}) => {
  return (
    <div className="w-full text-primary">
      <h1>isim Özellikleri</h1>
      <div className="w-full flex items-center justify-between text-red-600 border-b pb-1 border-gray-300">
        <span className="text-primary">Ürün Boyutu</span>
        <span className="text-sm"> "Küçük"</span>
      </div>
      <div className="w-full flex items-center justify-between text-red-600 border-b pb-1 border-gray-300">
        <span className="text-primary">Hamur</span>
        <span className="text-sm">"Klasik Hamur"</span>
      </div>
      <div className="w-full flex flex-col gap-y-2">
        <h2 className="text-primary text-center text-xl mt-2">Extra Malzeme</h2>
        <ul className="grid grid-cols-2 place-items-center gap-y-3 my-2">
          extralar var burada
        </ul>
      </div>
      <div className="w-full flex mt-5 items-center justify-between text-white bg-black p-2 rounded-md">
        <span className="">Adet</span>
        <div className="flex items-center gap-x-4">
          <button>
            <FaMinus size={14} />
          </button>
          <span className="text-xl font-bold">10</span>
          <button>
            <FaPlus size={14} />
          </button>
        </div>
      </div>
      <div className="w-full flex items-center justify-between mt-2 text-primary rounded-md bg-secondary p-2">
        <span className="font-medium">Satın Al</span>
        <div className="flex items-center gap-x-4">
          <span className="text-xl font-bold">total fiyat</span>
          <span>TL</span>
        </div>
      </div>
    </div>
  );
};

export default DetailProductRight;
