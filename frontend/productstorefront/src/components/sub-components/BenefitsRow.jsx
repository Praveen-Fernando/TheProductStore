import React from "react";
import {
  FaShippingFast,
  FaRegThumbsUp,
  FaShieldAlt,
  FaDollarSign,
  FaHeadphones,
  FaGift,
} from "react-icons/fa";

const benefits = [
  {
    icon: <FaShippingFast className="text-2xl text-blue-500" />,
    text: "Fast Shipping",
  },
  {
    icon: <FaRegThumbsUp className="text-2xl text-blue-500" />,
    text: "Quality Assurance",
  },
  {
    icon: <FaShieldAlt className="text-2xl text-blue-500" />,
    text: "Secure Payment",
  },
  {
    icon: <FaDollarSign className="text-2xl text-blue-500" />,
    text: "Best Prices",
  },
  {
    icon: <FaHeadphones className="text-2xl text-blue-500" />,
    text: "24/7 Support",
  },
  {
    icon: <FaGift className="text-2xl text-blue-500" />,
    text: "Exclusive Offers",
  },
];

const Benefits = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-4 bg-gray-100">
      {benefits.map((benefit, index) => (
        <div
          key={index}
          className="flex items-center p-4 bg-white rounded-lg shadow-md min-w-max"
        >
          <div className="mr-4">{benefit.icon}</div>
          <p className="text-lg font-semibold">{benefit.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Benefits;
