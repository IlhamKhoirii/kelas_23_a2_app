import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import { Button, Image, Spinner } from "react-bootstrap";
import "./Slider.css";

const CategorySlider = ({ selectedCategory, onCategoryClick }) => {
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/kategori");
        setCategories(response.data);
        setIsLoadingCategories(false);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: false, // Slider stops at the last slide
    speed: 500,
    slidesToShow: categories.length < 4 ? categories.length : 4, // Dynamically adjust slidesToShow
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: categories.length < 3 ? categories.length : 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: categories.length < 2 ? categories.length : 2,
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

  if (isLoadingCategories) {
    return <Spinner animation="border" variant="primary" />;
  }

  return (
    <div className="category-slider">
      <Slider {...sliderSettings}>
        {categories.map((category) => (
          <div key={category.id_kategori} className="text-center category-slider-item">
            <Button
              variant={
                selectedCategory === category.id_kategori
                  ? "primary"
                  : "outline-primary"
              }
              onClick={() => onCategoryClick(category.id_kategori)}
              className="category-button"
            >
              <Image
                src={category.gambar_kategori || "/images/default-category.png"}
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