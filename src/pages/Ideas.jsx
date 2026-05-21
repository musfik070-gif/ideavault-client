import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Ideas = () => {
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/ideas")
      .then((res) => {
        setIdeas(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-[#020817] text-white p-10">
      <h1 className="text-5xl font-bold text-center mb-10">All Ideas</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ideas.map((idea) => (
          <div key={idea._id} className="bg-[#1e293b] p-5 rounded-xl">
            <img
              src={idea.image}
              alt={idea.title}
              className="h-52 w-full object-cover rounded-lg mb-4"
            />

            <h2 className="text-2xl font-bold mb-2">{idea.title}</h2>

            <p className="text-gray-300 mb-3">{idea.description}</p>

            <div className="flex justify-between items-center">
              <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">
                {idea.category}
              </span>

              <Link
                to={`/ideas/${idea._id}`}
                className="bg-white text-black px-4 py-2 rounded-lg"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ideas;
