import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import { Button, Image } from "react-bootstrap";
import "./Slider.css";

const CategorySlider = ({ selectedCategory, onCategoryClick }) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/kategori"); // Adjust the endpoint if necessary
        setCategories(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (isLoading) {
    return <div>Loading categories...</div>;
  }

  return (
    <div className="category-slider">
      <Slider {...sliderSettings}>
        {categories.map((category) => (
          <div key={category.id} className="text-center category-slider-item">
            <Button
              variant={
                selectedCategory === category.nama_kategori
                  ? "primary"
                  : "outline-primary"
              }
              onClick={() => onCategoryClick(category.nama_kategori)}
              className="category-button"
            >
              <Image
                src={category.gambar_kategori || "/images/default-category.png"} // Default image if not provided
                rounded
                className="category-image mb-2"
              />
              <h5 className="category-name">{category.nama_kategori}</h5>
            </Button>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CategorySlider;
