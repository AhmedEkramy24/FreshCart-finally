import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Categories() {
  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  let { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    select: (data) => data.data.data,
  });

  const MySwal = withReactContent(Swal);

  async function getSubCategory(id) {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories/${id}`
      );

      openModal(data.data.image, data.data.name);
    } catch (error) {
      console.warn(error);
    }
  }

  function openModal(imgUrl, name) {
    MySwal.fire({
      title: name,
      imageUrl: imgUrl,
      imageWidth: 300,
      imageAlt: name,
      confirmButtonText: "Close",
      confirmButtonColor: "#099309",
    });
  }

  return (
    <div className="container mt-14 p-4">
      {isLoading ? (
        <div className="flex fixed inset-0 bg-black bg-opacity-50 justify-center items-center">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="container mt-14 gap-5 flex flex-wrap justify-center">
          {data.map((category, index) => (
            <div
              key={index}
              onClick={() => getSubCategory(category._id)}
              className="md:w-1/5 border border-slate-300 hover:scale-[1.05] hover:border-main p-2 cursor-pointer transition-all duration-200"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full object-cover h-[200px] rounded-lg"
              />
              <h2 className="text-center text-main text-xl mt-2">
                {category.name}
              </h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
