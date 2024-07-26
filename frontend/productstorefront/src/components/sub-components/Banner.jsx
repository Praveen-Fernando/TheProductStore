import React from "react";
import Sidebar from "./Sidebar";
import BannerSlider from "./BannerSlider";

const Banner = () => {
  return (
    <div class="flex flex-wrap justify-center gap-4 p-4 bg-gray-100">
      <Sidebar />
      <BannerSlider />
    </div>
  );
};

export default Banner;
