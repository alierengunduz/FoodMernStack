import React,{useState,useEffect} from 'react'
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import AllProductLeft from "./AllproductsLeft";
import AllProductRight from "./AllproductsRight";
import axios from "axios";
import { Pagination, Dropdown, Space, Button, Popover } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const AllProduct = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const [sort, setSort] = useState("");
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9; // Sayfa başına gösterilecek öğe sayısı

    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const res = await axios.get("http://localhost:8000/api/allProduct");
            const data = res.data;
            setProducts(data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchProducts();
      }, []);
    
      const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Arama yapıldığında sayfayı sıfırla
      };
    
      const handlePageChange = (page) => {
        setCurrentPage(page);
      };
    
      const sortItems = (items) => {
        if (sort === "asc") {
          return items.slice().sort((a, b) => a.price.current - b.price.current);
        } else if (sort === "desc") {
          return items.slice().sort((a, b) => b.price.current - a.price.current);
        } else {
          return items;
        }
      };
      const filteredItems = products.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
      const sortedAndFilteredItems = sortItems(filteredItems).slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );
    
      const items = [
        {
          key: "1",
          label: (
            <div
              onClick={() => setSort("desc")}
              className="flex items-center gap-x-1"
            >
              <p>Yüksekten Düşüğe</p>
              <p>
                <FaArrowUp />
              </p>
            </div>
          ),
        },
        {
          key: "2",
          label: (
            <div
              onClick={() => setSort("asc")}
              className="flex items-center gap-x-1"
            >
              <p>Düşükten Yükseğe</p>
              <p>
                <FaArrowDown />
              </p>
            </div>
          ),
        },
      ];
    
      const content = (
        <div className="grid grid-cols-3">
          <p>pizza</p>
          <p>sos</p>
          <p>yan ürün</p>
        </div>
      ); 
  return (
    <div>
    <div className="w-full flex flex-col mt-5 container mx-auto sm:p-0 p-1   pb-10">
      {/* ---------Üst---------------- */}
      <div className="flex sm:flex-row flex-col sm:items-center items-start sm:gap-y-0 gap-y-3  w-full p-1">
        <div className="flex sm:items-center text-sm   gap-x-1 sm:w-[55%] w-full">
          <h2>Anasayfa</h2>
          <p>
            <MdOutlineKeyboardDoubleArrowRight size={20} />
          </p>
          <h2>Tüm Ürünler</h2>
        </div>
        <div className="w-full sm:ml-24 ml-0">
          <Popover content={content} title="Lütfen Anahtar Kelime Arayın">
            <input
              value={searchTerm}
              onChange={handleSearch}
              type="search"
              placeholder="Search..."
              className="outline-none border sm:w-[60%] w-full py-1 rounded-md pl-2 border-gray-500"
            />
          </Popover>
        </div>
        <div>
          <Dropdown
            menu={{
              items,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space className="border p-2   w-48 rounded-lg">
                {sort === "asc" ? "Düşükten Yükseğe" : "Yüksekten Düşüğe"}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
      </div>
      {/* ---------Alt---------------- */}
      <div className="w-full flex sm:items-start items-center  text sm:gap-x-10 gap-x-2 mt-5">
        <div className="w-1/3 sm:flex hidden">
            <AllProductLeft />
        </div>
        <div className="sm:w-2/3 w-full sm:ml-0 ml-10">
            <AllProductRight filteredItems={sortedAndFilteredItems} /> 
          <Pagination
            className="text-white bg-white p-1 rounded-lg"
            defaultCurrent={1}
            current={currentPage}
            total={products.length}
            pageSize={itemsPerPage}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  </div>
);
  
}

export default AllProduct