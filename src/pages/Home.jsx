import { useEffect, useState } from "react";
import axios from "axios";
import Banner from "../components/home/Banner";
import TrendingIdeas from "../components/home/TrendingIdeas";
import FeaturedCategories from "../components/home/FeaturedCategories";
import WhyChooseUs from "../components/home/WhyChooseUs";

const Home = () => {
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/trending-ideas")
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
