import React from "react";
import CartThema from "./CartThema";

const AllproductsRight = ({ filteredItems }) => {
  return (
    <ul className="grid grid-cols-3 gap-5">
      {filteredItems.map((product) => (
        <li key={product._id} >
          <CartThema product={product}/>
        </li>
      ))}
    </ul>
  );
};

export default AllproductsRight;
