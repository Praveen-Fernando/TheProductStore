import Banner from "../sub-components/Banner";
import BannerSlider from "../sub-components/BannerSlider";
import Benefits from "../sub-components/BenefitsRow";
import FastSaleProducts from "../sub-components/FastSaleProducts ";
import ProductCategory from "../sub-components/ProductCategory";
import Sidebar from "../sub-components/Sidebar";

export default function Home() {
  return (
    <div className="flex flex-col items-center p-4">
      <Banner />
      <Benefits />

      <br />
      <ProductCategory />

      <FastSaleProducts />
    </div>
  );
}
