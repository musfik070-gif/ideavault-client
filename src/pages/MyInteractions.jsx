import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { FiExternalLink, FiFolder, FiActivity } from "react-icons/fi";
import toast from "react-hot-toast";

const MyInteractions = () => {
  const { user } = useAuth();
  const [interactions, setInteractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!user?.email) {
      return;
    }

    setLoading(true);
    axiosSecure
      .get("/my-interactions")
      .then((res) => {
        setInteractions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load interactions");
        setLoading(false);
      });
  }, [user, axiosSecure]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-amber-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-800 dark:text-gray-200 py-16 px-6 transition-colors">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex p-3 bg-violet-100 dark:bg-violet-950/40 rounded-2xl text-violet-600 dark:text-violet-400 mb-4 animate-bounce">
            <FiActivity className="text-3xl" />
          </div>
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-violet-600 to-amber-600 bg-clip-text text-transparent dark:from-violet-400 dark:to-amber-400 mb-4">
            My Interactions
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-lg">
            Track and revisit the innovative startup proposals that you've commented on.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[40vh]">
            <span className="loading loading-spinner loading-lg text-violet-600"></span>
          </div>
        ) : interactions.length === 0 ? (
          <div className="flex flex-col justify-center items-center min-h-[40vh] text-center p-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-3xl border border-violet-100 dark:border-gray-800/80 shadow-lg max-w-md mx-auto">
            <div className="text-5xl mb-4">💬</div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
              No Interactions Yet
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              You haven't commented on any startup ideas yet. Start exploring and sharing your thoughts!
            </p>
            <Link
              to="/ideas"
              className="mt-6 bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-3 rounded-xl transition duration-300 shadow-md shadow-violet-500/20"
            >
              Browse Ideas
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-3xl border border-violet-100 dark:border-gray-800/80 shadow-xl">
            <div className="overflow-x-auto">
              <table className="table w-full text-left border-collapse">
                <thead>
                  <tr className="bg-violet-50/50 dark:bg-violet-950/20 text-gray-500 dark:text-gray-400 border-b border-violet-100 dark:border-gray-800">
                    <th className="py-5 px-6 font-semibold uppercase tracking-wider text-xs">No.</th>
                    <th className="py-5 px-6 font-semibold uppercase tracking-wider text-xs">Idea Title</th>
                    <th className="py-5 px-6 font-semibold uppercase tracking-wider text-xs">Category</th>
                    <th className="py-5 px-6 font-semibold uppercase tracking-wider text-xs">Founder</th>
                    <th className="py-5 px-6 font-semibold uppercase tracking-wider text-xs">Budget</th>
                    <th className="py-5 px-6 font-semibold uppercase tracking-wider text-xs text-right">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {interactions.map((item, index) => (
                    <tr
                      key={item._id}
                      className="border-b border-violet-50/50 dark:border-gray-800/50 hover:bg-violet-50/30 dark:hover:bg-violet-950/10 transition-colors"
                    >
                      <td className="py-5 px-6 font-bold text-gray-400 dark:text-gray-600">
                        {String(index + 1).padStart(2, "0")}
                      </td>
                      <td className="py-5 px-6">
                        <Link
                          to={`/ideas/${item._id}`}
                          className="font-bold text-gray-900 dark:text-white hover:text-violet-600 dark:hover:text-violet-400 transition-colors line-clamp-1"
                        >
                          {item.title || "Untitled Idea"}
                        </Link>
                      </td>
                      <td className="py-5 px-6">
                        <span className="inline-flex items-center gap-1 text-xs bg-violet-100/60 dark:bg-violet-950/40 text-violet-700 dark:text-violet-400 px-2.5 py-1 rounded-full font-semibold border border-violet-200/50 dark:border-violet-950/50">
                          <FiFolder />
                          {item.category || "General"}
                        </span>
                      </td>
                      <td className="py-5 px-6">
                        <div className="flex flex-col">
                          <span className="font-semibold text-sm text-gray-800 dark:text-gray-200">
                            {item.userName || "Founder"}
                          </span>
                          <span className="text-xs text-gray-400 font-mono">
                            {item.userEmail}
                          </span>
                        </div>
                      </td>
                      <td className="py-5 px-6 font-semibold text-amber-600 dark:text-amber-400 text-sm">
                        {item.budget || "N/A"}
                      </td>
                      <td className="py-5 px-6 text-right">
                        <Link
                          to={`/ideas/${item._id}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-violet-600 hover:bg-violet-700 dark:bg-violet-600 dark:hover:bg-violet-700 px-4 py-2.5 rounded-xl transition duration-200 shadow-md shadow-violet-500/10"
                        >
                          View Details
                          <FiExternalLink />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyInteractions;
