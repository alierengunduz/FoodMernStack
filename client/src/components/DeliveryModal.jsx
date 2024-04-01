import React, { useState } from "react";
import AdreseTeslim from "./AdreseTeslim";
import GelAl from "./GelAl";
import ArabayaTeslim from "./ArabayaTeslim";
import { PiMotorcycleBold } from "react-icons/pi";

const DeliveryModal = () => {
  const [deliveryType, setDeliveryType] = useState(null);

  return (
    <div>
      <div className="flex items-center gap-x-10  justify-between p-2">
        <button
          onClick={(e) => setDeliveryType("0")}
          className={`bg-primary text-white w-full py-1 rounded-md  ${
            deliveryType === "0" ? "bg-secondary" : ""
          }
             `}
        >
          Adrese Teslim
        </button>
        <button
          onClick={(e) => setDeliveryType("1")}
          className={`bg-primary text-white w-full py-1 rounded-md  ${
            deliveryType === "1" ? "bg-secondary" : ""
          }
             `}
        >
          Gel Al
        </button>
        <button
          onClick={(e) => setDeliveryType("2")}
          className={`bg-primary text-white w-full py-1 rounded-md  ${
            deliveryType === "2" ? "bg-secondary" : ""
          }
             `}
        >
          Arabaya Teslim
        </button>
      </div>
      {/* -------------Adrese Teslim---------------- */}
      {deliveryType === "0" && <AdreseTeslim />}
      {/* -------------Gel Al---------------- */}
      {deliveryType === "1" && <GelAl />}
      {/* -------------Arabaya Teslim---------------- */}
      {deliveryType === "2" && <ArabayaTeslim />}
      {deliveryType === null && (
        <div className="flex items-center justify-center py-20 text-2xl gap-x-3">
          <p>Lütfen Şipariş Türünüzü Seçiniz...</p>
          <span className="animate-pulse">
            <PiMotorcycleBold size={35} />
          </span>
        </div>
      )}
    </div>
  );
};

export default DeliveryModal;
