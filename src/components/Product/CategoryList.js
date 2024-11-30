import React from "react";
import { Button, Image } from "react-bootstrap";

const CategoryList = ({ categories, selectedCategory, onCategoryClick, sliderSettings }) => {
    return (
        <div className="category-list">
            {categories.map((category) => (
                <Button
                    key={category.name}
                    variant={selectedCategory === category.name ? "primary" : "outline-primary"}
                    onClick={() => onCategoryClick(category.name)}
                    className="category-button"
                >
                    <Image
                        src={category.imageUrl}
                        alt={category.name}
                        rounded
                        className="category-image mb-2"
                    />
                    <h5 className="category-name">{category.name.charAt(0).toUpperCase() + category.name.slice(1)}</h5>
                </Button>
            ))}
        </div>
    );
};

export default CategoryList;
