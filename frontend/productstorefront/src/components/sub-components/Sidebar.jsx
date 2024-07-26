import React from "react";

const Sidebar = () => {
  return (
    <div class="lg:visible md:flex">
      <ul class="space-y-4">
        <li class="flex items-center space-x-2">
          <span>💻</span>
          <span>Electronic Accessories</span>
        </li>
        <li class="flex items-center space-x-2">
          <span>📱</span>
          <span>Electronic Devices</span>
        </li>

        <li class="flex items-center space-x-2">
          <span>📺</span>
          <span>TV & Home Appliances</span>
        </li>
        <li class="flex items-center space-x-2">
          <span>🧑‍⚕️</span>
          <span>Health & Beauty</span>
        </li>
        <li class="flex items-center space-x-2">
          <span>🧸</span>
          <span>Babies & Toys</span>
        </li>

        <li class="flex items-center space-x-2">
          <span>🪴</span>
          <span>Groceries & Pet</span>
        </li>
        <li class="flex items-center space-x-2">
          <span>🏡</span>
          <span>Home & Lifestyle</span>
        </li>
        <li class="flex items-center space-x-2">
          <span>👗</span>
          <span>Women's Fashion</span>
        </li>
        <li class="flex items-center space-x-2">
          <span>👔</span>
          <span>Men's Fashion</span>
        </li>
        <li class="flex items-center space-x-2">
          <span>⌚</span>
          <span>Watches & Accessories</span>
        </li>

        <li class="flex items-center space-x-2">
          <span>🏀</span>
          <span>Sports & Outdoor</span>
        </li>
        <li class="flex items-center space-x-2">
          <span>🚲</span>
          <span>Automotive & Motorbike</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
