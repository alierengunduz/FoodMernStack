import React, { useState, useEffect } from 'react'
import { IoPizzaSharp } from "react-icons/io5";
import { GiHamburger } from "react-icons/gi";
import MonthCampaigns from "../MonthCampaigns";
import YearCampaigns from "../YearCampaigns";
import axios from "axios";
const Campaigns = () => {

    const [campaigns, setCampaigns] = useState([]);
    useEffect(() => {
      const fetchCampaigns = async () => {
        try {
          const res = await axios.get("json/campaignsData.json");
          const data = res.data;
          setCampaigns(data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchCampaigns();
    }, []);
  
  return (
    <div className='w-full h-full'>
        <div className="bg-[url('img/campaings.png')]  bg-cover w-full sm:h-[500px] h-[250px]  bg-center "></div>
      <section className="container mx-auto flex flex-col gap-y-20 items-center justify-center p-2">
        <div className="flex  items-center gap-x-5 border-2 p-2 rounded-2xl shadow-md shadow-gray-500">
          <span>
            <GiHamburger size={34} />
          </span>
          <h1 className="font-bold text-4xl tracking-wider">KAMPANYALAR</h1>
          <span>
            <IoPizzaSharp size={34} />
          </span>
        </div>
        <MonthCampaigns campaigns={campaigns}/>
        <YearCampaigns campaigns={campaigns}/>
      </section>
    </div>
  )
}

export default Campaigns