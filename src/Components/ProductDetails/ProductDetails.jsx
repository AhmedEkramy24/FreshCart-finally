import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext";
import { WishListContext } from "../../Context/WishListContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
  let { addToCart, getAllProductsFromCart } = useContext(CartContext);
  let { addToWishList, wishList , getAllWishList} = useContext(WishListContext);
  let { id } = useParams();
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState(null);
  async function getProduct() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    setProduct(data.data);
  }
  let navigate = useNavigate();
  var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  var settings2 = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  var settingsSm = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  useEffect(() => {
    getProduct();
    getProducts();
    getAllProductsFromCart();
    getAllWishList();
  }, []);

  async function getProducts() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    setProducts(data.data);
  }

  return (
    <>
      {product ? (
        <div className="container flex items-center gap-6 flex-col md:flex-row mt-14">
          <div className="md:w-1/3 p-2">
            <div className="hidden md:block">
              <Slider {...settings}>
                {product.images.map((img, index) => (
                  <img
                    src={img}
                    alt={product.title}
                    className="object-cover h-[300px] w-full "
                    key={index}
                  />
                ))}
              </Slider>
            </div>
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-[300px] md:hidden object-cover"
            />
          </div>
          <div className="md:w-2/3 p-4">
            <h1 className="text-2xl">{product.title}</h1>
            <p className="text-sm text-slate-500 mt-3">{product.description}</p>
            <div className="flex justify-between text-sm mt-4">
              <span className="font-bold">{product.price} EGP</span>
              <span>
                <i className="fa-solid fa-star text-yellow-400 me-1"></i>
                {product.ratingsAverage}
              </span>
            </div>
            <div className="flex items-center gap-4">
            <button
              className="block mt-4 w-full"
              onClick={() => {
                addToCart(product.id);
              }}
            >
              Add To Cart
            </button>
            <span
            className="mt-2 cursor-pointer"
              onClick={() => {
                addToWishList(product.id);
                toast.success("Add successfuly to wish list");
                getAllWishList();
              }}
            >
              {wishList.some((item) => item.id === product.id) ? (
                <i className="fa-solid fa-heart text-red-500 text-3xl"></i>
              ) : (
                <i className="fa-regular fa-heart text-slate-300 text-3xl"></i>
              )}
            </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex top-0 right-0 left-0 bottom-0 bg-black bg-opacity-50 fixed justify-center items-center">
          <span className="loader"></span>
        </div>
      )}
      <div className="container mt-5 lg:block hidden p-4">
        <h1 className="text-lg ">Another Products :</h1>

        <Slider {...settings2}>
          {products
            ?.filter((item) => item.category.name === product.category.name)
            .map((product, index) => (
              <Link to={`/Productdetails/${product.id}`} key={index}>
                <div className="p-2 hover:border border-main cursor-pointer">
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="h-[250px] block mx-auto"
                    key={index}
                  />
                  <h3 className="p-2 text-center">{product.title}</h3>
                </div>
              </Link>
            ))}
        </Slider>
      </div>

      <div className="container mt-5 md:block lg:hidden hidden p-4">
        <h1 className="text-lg ">Another Products :</h1>

        <Slider {...settingsSm}>
          {products
            ?.filter((item) => item.category.name === product.category.name)
            .map((product, index) => (
              <Link to={`/Productdetails/${product.id}`} key={index}>
                <div className="p-2 hover:border border-main cursor-pointer">
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="h-[250px] block mx-auto"
                    key={index}
                  />
                  <h3 className="p-2 text-center">{product.title}</h3>
                </div>
              </Link>
            ))}
        </Slider>
      </div>

      <div className="container mt-5 md:hidden block p-4">
        <h1 className="text-lg ">Another Products :</h1>

        <Slider {...settings}>
          {products
            ?.filter((item) => item.category.name === product.category.name)
            .map((product, index) => (
              <Link to={`/Productdetails/${product.id}`} key={index}>
                <div className="p-2 hover:border border-main cursor-pointer">
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="h-[250px] block mx-auto"
                    key={index}
                  />
                  <h3 className="p-2 text-center">{product.title}</h3>
                </div>
              </Link>
            ))}
        </Slider>
      </div>
    </>
  );
}
