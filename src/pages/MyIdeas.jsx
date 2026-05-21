import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

const MyIdeas = () => {
  const { user } = useAuth();

  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    const fetchMyIdeas = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5001/my-ideas?email=${user.email}`,
        );

        setIdeas(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (user?.email) {
      fetchMyIdeas();
    }
  }, [user]);

  return (
    <div className="min-h-screen px-5 py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-14">My Ideas</h2>

        {ideas.length === 0 ? (
          <h3 className="text-center text-xl">No Ideas Found</h3>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ideas.map((idea) => (
              <div
                key={idea._id}
                className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden"
              >
                <img
                  src={idea.image}
                  alt={idea.title}
                  className="h-56 w-full object-cover"
                />

                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3">{idea.title}</h3>

                  <p className="text-gray-500 dark:text-gray-300 mb-4">
                    {idea.description}
                  </p>

                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm">
                    {idea.category}
                  </span>

                  <div className="mt-5">
                    <Link to={`/ideas/${idea._id}`}>
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyIdeas;
