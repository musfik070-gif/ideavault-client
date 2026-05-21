import axios from "axios";
import toast from "react-hot-toast";
import { useLoaderData } from "react-router";
import { useAuth } from "../providers/AuthProvider";

const IdeaDetails = () => {
  const idea = useLoaderData();
  const { user } = useAuth();

  const handleInterest = async () => {
    if (!user) {
      return toast.error("Please login first");
    }

    if (user.email === idea.userEmail) {
      return toast.error("You cannot interact with your own idea");
    }

    const interactionData = {
      ideaId: idea._id,
      ideaTitle: idea.title,
      ideaImage: idea.image,
      ideaCategory: idea.category,
      ideaOwnerEmail: idea.userEmail,
      userEmail: user.email,
      userName: user.name,
      createdAt: new Date(),
    };

    try {
      const res = await axios.post(
        "http://localhost:5001/interested",
        interactionData,
      );

      if (res.data.insertedId) {
        toast.success("Interest Added");
      }
    } catch {
      toast.error("Failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#020817] text-white py-20 px-4">
      <div className="max-w-4xl mx-auto bg-[#1e293b] rounded-2xl overflow-hidden">
        <img
          src={idea.image}
          alt={idea.title}
          className="w-full h-[400px] object-cover"
        />

        <div className="p-8">
          <h1 className="text-5xl font-bold mb-4">{idea.title}</h1>

          <p className="text-gray-300 text-lg mb-6">{idea.description}</p>

          <span className="bg-blue-600 px-4 py-2 rounded-full">
            {idea.category}
          </span>

          <div className="mt-8 border-t border-gray-700 pt-6">
            <p className="text-gray-400">Posted By:</p>

            <h3 className="text-2xl font-semibold">{idea.userName}</h3>

            <p className="text-gray-300">{idea.userEmail}</p>
          </div>

          <button
            onClick={handleInterest}
            className="mt-6 bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-xl"
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default IdeaDetails;
