import React, { useState, useEffect } from "react";
import RecentPeoducts from "../RecentPeoducts/RecentPeoducts";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import MainSlider from "../MainSlider/MainSlider";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import Background from "../../assets/images/light-patten.svg";
import { Helmet } from "react-helmet";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    document.body.style.backgroundImage = `url(${Background})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundPosition = "center";
  }, []);
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div>
          <MainSlider />
          <CategoriesSlider />
          <RecentPeoducts />
        </div>
      )}
    </>
  );
}
