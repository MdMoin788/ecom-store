import { Navbar } from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProductsData } from "../Redux/Products/action";
import { WomenSlider } from "./Slider";
import { Carousel } from "./Carousel";
import { Footer } from "./Footer";
import "./Styles/Home.css";
import { BigCard } from "./BigCard";


export const Home = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);


  useEffect(() => {
    dispatch(getProductsData());
  }, []);

  return (
    <div>
      <Navbar />
      <Carousel />

      <div className="section">
        <div className="section_title">
          <h3>Product Category</h3>
        </div>
        <div className="big_card_container">
          <BigCard
     
            img={
              "https://ik.imagekit.io/thestylist/rba/pub/media_rb/HOMEPAGE_IMAGES/07_Dec_21/Rohit_Bal.png"
            }
            txt={"Women Clothes"}
            link={"/shop/women"}
          />
          <BigCard
               img={
                "https://ik.imagekit.io/thestylist/rba/pub/media_rb/HOMEPAGE_IMAGES/05_Apr_22/1_(1).jpg"
              }
            txt={"Men Clothes"}
            link={"/"}
          />

          <BigCard
            img={
              "https://static.hopscotch.in/fstatic/product/202112/09d53750-b439-436b-9375-69497e509349_full.jpg?version=1639389051489&tr=w-1080,c-at_max,n-medium"
            }
            txt={"Kids Clothes"}
            link={"/"}
          />
        </div>
      </div>

      <div className="section">
        <div className="section_title">
          <h3>Exclusive collections to explore now</h3>
        </div>
        <WomenSlider products={products} />
      </div>


      <Footer />
    </div>
  );
};
