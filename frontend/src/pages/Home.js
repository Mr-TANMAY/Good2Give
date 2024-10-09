import React from "react";
import { useSelector } from "react-redux";
import ImageSlider from "../components/ImageSlider";
import Statistics from "../components/Statistics";
import Goals from "../components/Goals";
import AdminHome from "../components/AdminHome";
import StoreHome from "../components/StoreHome";
import OrganisationHome from "../components/OrganisationHome";
import HotelHome from "../components/HotelHome";
import UserHome from "../components/UserHome";
import Testimonials from "../components/Testimonials"; 
import ImpactMetrics from "../components/ImpactMetrics"; 
import FoodWasteQuiz from "../components/FoodWasteQuiz";

function Home() {
  const { user } = useSelector((state) => state.auth);

  const renderHomeContent = () => {
    if (!user) {
      // Content for users who are not logged in
      return (
        <>
          <ImageSlider />
          <Statistics />
          <Goals />
          <FoodWasteQuiz />
          <ImpactMetrics />
          <Testimonials /> 
        </>
      );
    }

    // Content based on user role
    switch (user.role) {
      case "admin":
        return <AdminHome />;
      case "stores":
        return <StoreHome />;
      case "organisation":
        return <OrganisationHome />;
      case "hotel":
        return <HotelHome />;
      case "user":
        return <UserHome />;
      default:
        // Fallback content or message for unknown roles
        return <div>Role not recognized</div>;
    }
  };

  return <div className="home">{renderHomeContent()}</div>;
}

export default Home;
