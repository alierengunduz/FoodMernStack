import React from "react";
import Slider from "../components/Slider";
import Content from "../components/Content";
import ColorBar from "../components/ColorBar";
import RecommendPizza from "../components/RecomendedPizza/RecommendPizza";
import Testimonial from "../components/Testimonal/Testimonial";
import BookATable from "../components/BookaTable/BookATable";
import Ords from "../components/Ords";

const HomePage = () => {
  return (
    <div>
       <Slider /> 
       <Content /> 
       <ColorBar /> 
       <RecommendPizza /> 
       <ColorBar /> 
       <Testimonial /> 
       <BookATable /> 
       <Ords />
    </div>
  );
};

export default HomePage;
