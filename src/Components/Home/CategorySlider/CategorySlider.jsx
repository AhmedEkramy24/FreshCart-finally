import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";

export default function CategorySlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  var settings2 = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };
  // const [categories, setCategories] = useState([]);
  // async function getCategories() {
  //   let { data } = await axios.get(
  //     "https://ecommerce.routemisr.com/api/v1/categories"
  //   );
  //   setCategories(data.data);
  // }
  // useEffect(() => {
  //   getCategories();
  // }, []);

  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  let { data, isLoading } = useQuery({
    queryKey: ["categoriesSlider"],
    queryFn: getCategories,
  });

  return (
    <>
      {!isLoading && (
        <div className="container sm:block hidden">
          <h1 className="text-3xl my-4">Categories</h1>
          <Slider {...settings}>
            {data.data.data.map((category, index) => (
              <div key={index} className="w-1/5">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-[200px] object-cover object-top"
                />
                <p className="text-center">{category.name}</p>
              </div>
            ))}
          </Slider>
        </div>
      )}

      {!isLoading && (
        <div className="container block md:hidden p-2">
          <h1 className="text-3xl my-4">Categories</h1>
          <Slider {...settings2}>
            {data.data.data.map((category, index) => (
              <div key={index} className="w-1/5">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-[300px] object-cover object-top"
                />
                <p className="text-center text-xl">{category.name}</p>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </>
  );
}
