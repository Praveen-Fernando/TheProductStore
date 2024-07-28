import Banner from "../sub-components/Banner";
import Benefits from "../sub-components/Benefits";
import FastSaleProducts from "../sub-components/FastSaleProducts ";
import ProductCategory from "../sub-components/ProductCategory";

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
