import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const IdeaDetails = () => {
  const { id } = useParams();

  const [idea, setIdea] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5001/ideas/${id}`)
      .then((res) => {
        setIdea(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!idea) {
    return <div className="text-white text-center mt-20">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#020817] text-white p-10">
      <div className="max-w-4xl mx-auto bg-[#1e293b] p-8 rounded-2xl">
        <img
          src={idea.image}
          alt={idea.title}
          className="w-full h-[400px] object-cover rounded-xl mb-6"
        />

        <h1 className="text-5xl font-bold mb-4">{idea.title}</h1>

        <p className="text-gray-300 text-lg mb-5">{idea.description}</p>

        <span className="bg-blue-600 px-4 py-2 rounded-full">
          {idea.category}
        </span>
      </div>
    </div>
  );
};

export default IdeaDetails;
