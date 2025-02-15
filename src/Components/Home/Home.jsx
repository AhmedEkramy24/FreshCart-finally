import { useContext, useEffect } from "react";
import RecentProducts from "./RecentProduct/RecentProducts";
import CategorySlider from "./CategorySlider/CategorySlider";
import MainSlider from "./MainSlider/MainSlider";
import { WishListContext } from "../../Context/WishListContext";

export default function Home() {
  let { getAllWishList } = useContext(WishListContext);

  useEffect(() => {
    getAllWishList();
  }, []);

  return (
    <>
      <MainSlider />
      <CategorySlider />
      <RecentProducts />
    </>
  );
}
