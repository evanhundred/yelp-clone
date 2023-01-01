import "./IndexPage.css";
import BusinessesTextBlock from "./BusinessesTextBlock";
import { useDispatch, useSelector } from "react-redux";
import { fetchBusinesses, getBusinesses } from "../../store/businesses";
import { useEffect } from "react";
import BusinessTitleCard from "../BusinessTitleCard";
import IndexPhotoCard from "../../assets/restaurant-skyline.jpg";

const SectionHeader = ({ title }) => {
  const textContent = title.text;
  return (
    <div className="section-header">
      <h2>{textContent}</h2>
    </div>
  );
};

const IndexPage = () => {
  const dispatch = useDispatch();
  const businesses = useSelector((state) => state.businesses);
  // debugger;
  useEffect(() => {
    // debugger;
    dispatch(fetchBusinesses());
  }, [dispatch]);

  // if (!businesses) return null;
  if (!businesses.length)
    return (
      <div>
        <h1>loading...</h1>
      </div>
    );

  return (
    <>
      <div className="image-height-reset">
        <div className="image-container">
          <img src={IndexPhotoCard} alt="outdoor dining" />
        </div>
      </div>
      <div className="business-block-container">
        <SectionHeader title={{ text: "Wonderful Restaurants" }} />
        <BusinessTitleCard businesses={businesses} />
        <BusinessesTextBlock businesses={businesses} />
      </div>
    </>
  );
};

export default IndexPage;
