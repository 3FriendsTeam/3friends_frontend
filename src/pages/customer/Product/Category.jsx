import  { useEffect, useState } from "react";
import axios from "axios";
const getImagePath = (imageName) => {
  if (!imageName) return ""; 
  return new URL(`../../../assets/client/${imageName}`, import.meta.url).href;
};

const Category = () => {
  
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []); 

  return (
<div className="w-full bg-[#F2F2F2]">
  <div className="w-full max-w-[1170px] mx-auto py-12 bg-white rounded-lg px-[50px]">
    <h2 className="text-xl font-bold mb-8 -ml-4 -mt-2">Danh mục nổi bật</h2>
    <div className="flex flex-wrap justify-between text-[12px] gap-4 -mt-4">
      {categories.map((category, index) => (
        <div
          key={index}
          className={`flex flex-col items-center bg-pink-100 p-4 rounded-lg group hover:scale-110 transition-transform duration-300 relative ${
            index > 4 ? 'hidden lg:flex' : ''
          }`}
          style={{ width: "95px", height: "95px" }}
        >
          <img
            src={category.pathImg ? getImagePath(category.pathImg) : ""}
            className="w-[48px] h-[60px] mb-4"
          />
          <span className="text-[13px] font-bold mt-2 text-nowrap">{category.CategoryName}</span>
        </div>
      ))}
    </div>
  </div>
</div>

  );
};

export default Category;
