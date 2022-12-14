import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import "./Slider.css";
import { ProductCard } from "./ProductCard";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsData } from "../Redux/Products/action";

const SliderDiv = styled(Slider)`
  margin: auto;
  width: 90%;
  .product_card {
    width: 260px;
  }
  @media (max-width: 798px) {
    .product_card {
      width: 220px;
    }
  }
  @media (max-width: 520px) {
    .product_card {
      width: 180px;
    }
  }

  img {
    width: 100%;
  }
  .product_img_sec {
    height: 70%;
  }
  .slick-list {
    margin: 0 -0px;
    padding: 0 20% 0 0 !important;
  }
  .slick-slide {
    padding: 0 10px;
  }
  .slick-list {
    padding: 0 20% 0 0;
  }
`;

export const WomenSlider = ({ products }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsData());
  }, []);

  const settings = {
    // dots: true,
    infinite: false,
    speed: 500,
    lazyLoad: true,
    slidesToShow: 4.2,
    slidesToScroll: 4,
    initialSlide: 4,
    variableWidth: true,
    adaptiveHeight: true,
    infinite: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  return (
    <div>
      <SliderDiv {...settings}>
        {products.map((e) => (
          <ProductCard
            key={e._id}
            id={e._id}
            imageURL={e.imageURL}
            name={e.name}
            oldPrice={e.oldPrice}
            newPrice={e.newPrice}
            off={e.off}
            category={e.category}
            color={e.color}
            size={e.size}
          />
        ))}
      </SliderDiv>
    </div>
  );
};
