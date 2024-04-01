import React, { useState } from "react";
import { useFormik } from "formik";
import { userSchema } from "../BookATableYup";
import {message} from 'antd';
const BookATable = () => {

  const onSubmit = async (values, actions) => {
    console.log(values);
    actions.resetForm();
    actions.setSubmitting(false);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    message.success("Table Booked Successfully");
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      person: "",
      date: "",
    },
    validationSchema: userSchema,
    onSubmit,
  });

 

  return (
    <div className="w-full flex sm:flex-row flex-col  container mx-auto justify-between sm:px-20 px-2 items-center sm:p-5 p-2 py-10">
      <div className="flex flex-col gap-y-5 sm:w-1/2 w-full shadow-md shadow-gray-500 p-5 border  rounded-xl items-center border-gray-200">
        <h1 className="text-3xl font-bold tracking-wide">Book A Table</h1>
        <form
          onSubmit={formik.handleSubmit}
          className="w-[70%] flex flex-col gap-y-7"
        >
          <div>
            <input
              className="outline-none border-2 h-10 pl-3 rounded-lg w-full focus:ring-2 focus:ring-gray-600 transition-all duration-300"
              type="text"
              placeholder="Your Full Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500">{formik.errors.name}</p>
            )}
          </div>
          <div>
            <input
              className="outline-none border-2 h-10 pl-3 rounded-lg w-full focus:ring-2 focus:ring-gray-600 transition-all duration-300"
              type="text"
              placeholder="Your Phone Number"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-500">{formik.errors.phone}</p>
            )}
          </div>
          <div>
            <input
              className="outline-none border-2 h-10 pl-3 rounded-lg w-full focus:ring-2 focus:ring-gray-600 transition-all duration-300"
              type="email"
              placeholder="Your Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500">{formik.errors.email}</p>
            )}
          </div>
          <div>
            <input
              className="outline-none border-2 h-10 pl-3 rounded-lg w-full focus:ring-2 focus:ring-gray-600 transition-all duration-300"
              type="number"
              placeholder="How Many Person?"
              name="person"
              value={formik.values.person}
              onChange={formik.handleChange}
            />
            {formik.touched.person && formik.errors.person && (
              <p className="text-red-500">{formik.errors.person}</p>
            )}
          </div>
          <div>
            <input
              className="outline-none border-2 h-10 pl-3 rounded-lg w-full focus:ring-2 focus:ring-gray-600 transition-all duration-300"
              type="date"
              placeholder="Date"
              name="date"
              value={formik.values.date}
              onChange={formik.handleChange}
            />
            {formik.touched.date && formik.errors.date && (
              <p className="text-red-500">{formik.errors.date}</p>
            )}
          </div>
          <button 
            className="bg-secondary text-white py-2 rounded-lg"
            type="submit"
          >
            Book Now
          </button>
        </form>
       
      </div>
      <div className="sm:w-1/2 w-full">
        <img
          className="w-full h-full object-cover"
          src="img/pizza/pizza1.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default BookATable;
