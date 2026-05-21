import { useEffect, useState } from "react";
import axios from "axios";
import Banner from "../components/home/Banner";
import TrendingIdeas from "../components/home/TrendingIdeas";
import FeaturedCategories from "../components/home/FeaturedCategories";
import WhyChooseUs from "../components/home/WhyChooseUs";

const Home = () => {
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    const apiBase = import.meta.env.VITE_API_URL || "https://ideavault-server-topaz.vercel.app";
    axios
      .get(`${apiBase}/trending-ideas`)
      .then((res) => {
        setIdeas(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <Banner />

      <TrendingIdeas ideas={ideas} />

      <FeaturedCategories />

      <WhyChooseUs />
    </div>
  );
};

export default Home;
