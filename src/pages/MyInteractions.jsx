import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../providers/AuthProvider";

const MyInteractions = () => {
  const { user } = useAuth();
  const [interactions, setInteractions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      return;
    }

    axios
      .get(`http://localhost:5001/my-interactions?email=${user.email}`)
      .then((res) => {
        setInteractions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [user]);

  return (
    <div className="min-h-screen bg-[#020817] text-white py-16 px-5">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-14">
          My Interactions
        </h1>

        {loading ? (
          <div className="flex justify-center items-center min-h-[40vh]">
            <span className="loading loading-spinner loading-lg text-blue-500"></span>
          </div>
        ) : interactions.length === 0 ? (
          <div className="flex flex-col justify-center items-center min-h-[40vh] text-gray-400 border border-gray-700 rounded-3xl bg-[#1e293b] p-10">
            <h2 className="text-3xl font-bold mb-3 text-white">
              No Interactions Yet
            </h2>
            <p>
              You haven't shown interest in any ideas yet. Explore ideas to
              connect.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-[#1e293b] rounded-3xl p-5 shadow-lg">
            <table className="table w-full text-left">
              <thead>
                <tr className="text-gray-400 border-b border-gray-700">
                  <th className="py-4">No.</th>
                  <th>Idea Title</th>
                  <th>Owner Email</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {interactions.map((item, index) => (
                  <tr
                    key={item._id}
                    className="border-b border-gray-700 hover:bg-gray-800 transition"
                  >
                    <td className="py-4 font-bold">{index + 1}</td>
                    <td className="font-semibold">
                      {item.ideaTitle || "Startup Idea"}
                    </td>
                    <td className="text-blue-400">
                      {item.ideaOwnerEmail || "Not specified"}
                    </td>
                    <td className="text-sm text-gray-400">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString()
                        : "Not specified"}
                    </td>
                    <td>
                      <span className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-xs font-semibold">
                        Interested
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyInteractions;
