"use client";
import React from "react";
import styles from "@/app/ui/products/products.module.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const SellProductForm = () => {
  return (
    <form className=" bg-white md:p-6 rounded-3xl ">
      <div className="">
        <label className="block text-sm font-medium text-gray-700">
          Product Category
        </label>
        <select
          name={"productCategory"}
          id={"productCategory"}
          className={`${styles.customSelect} mt-2 block w-full border px-5 py-4 border-gray-300 rounded-2xl focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
        >
          <option className="" value="">
            Select Product Category{" "}
          </option>
          <option key={1} value={1}>
            Insurance
          </option>
        </select>
      </div>
      <div className="mt-5">
        <label className="block text-sm font-medium text-gray-700">
          Product
        </label>
        <select
          name={"productCategory"}
          id={"productCategory"}
          className={`${styles.customSelect} mt-2 block w-full border px-5 py-4 border-gray-300 rounded-2xl focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
        >
          <option className="" value="">
            Select Product
          </option>
          <option key={1} value={1}>
            Insurance
          </option>
        </select>
        <p className="text-sm font-medium mt-1">Total Balance: </p>
      </div>
      <div className="mt-8 space-y-5">
        <p className=" font-medium text-center">Customer&apos;s Details</p>
        <div>
          <label className="block text-sm font-medium" htmlFor="firstName">
            First Name
          </label>
          <input
            id={"firstName"}
            name={"firstName"}
            className={`form-input-field`}
            placeholder="Enter your first name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="lastName">
            Last Name
          </label>
          <input
            id={"lastName"}
            name={"lastName"}
            className={`form-input-field`}
            placeholder="Enter your last name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium" htmlFor={"phoneNumber"}>
            Phone Number
          </label>
          <PhoneInput
            country={"ng"}
            inputClass="!w-full !h-auto !p-2 !pl-14 !border !rounded focus:!outline-none focus:!ring-2 focus:!ring-blue-500"
            containerClass="w-full"
            buttonClass="!border-r-0 !rounded-l !p-2"
            dropdownClass="!rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor={"dateOfBirth"}>
            Date Of Birth
          </label>
          <input
            id={"dateOfBirth"}
            type="date"
            name={"dateOfBirth"}
            className={`form-input-field`}
          />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor={"gender"}>
            Gender
          </label>
          <select id={"gender"} name={"gender"} className={`form-input-field`}>
            <option value="">Select your gender</option>
            <option value={0}>Male</option>
            <option value={1}>Female</option>
            <option value={2}>Other</option>
          </select>
        </div>
      </div>
      <div className="md:w-1/2 mt-8 mx-auto">
        <button
          type="submit"
          className=" w-full px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white btn-primary hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Confirm Details
        </button>
      </div>
    </form>
  );
};

export default SellProductForm;
