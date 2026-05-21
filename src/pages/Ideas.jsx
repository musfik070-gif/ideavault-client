import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Ideas = () => {
  const [ideas, setIdeas] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("newest"); // newest, oldest, budgetAsc, budgetDesc
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5001/ideas?search=${search}&filter=${filter}`)
      .then((res) => {
        setIdeas(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load ideas");
        setLoading(false);
      });
  }, [search, filter]);

  // Helper to extract a number from budget string (e.g. "$10k - $25k" -> 10000)
  const parseBudget = (budgetString) => {
    if (!budgetString) return 0;
    const clean = budgetString.toLowerCase().replace(/[^0-9km]/g, "");
    let num = parseInt(clean, 10);
    if (isNaN(num)) return 0;
    if (clean.includes("m")) num *= 1000000;
    else if (clean.includes("k")) num *= 1000;
    return num;
  };

  // Sort ideas on client side
  const sortedIdeas = [...ideas].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (sortBy === "oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    if (sortBy === "budgetAsc") {
      return parseBudget(a.budget) - parseBudget(b.budget);
    }
    if (sortBy === "budgetDesc") {
      return parseBudget(b.budget) - parseBudget(a.budget);
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-amber-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-800 dark:text-gray-200 px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-violet-600 to-amber-600 bg-clip-text text-transparent dark:from-violet-400 dark:to-amber-400 mb-4">
            Startup Idea Vault
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Explore innovative business proposals, solutions to modern problems, and collaborate with the founders.
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-violet-100/50 dark:border-gray-800/50 p-6 rounded-2xl shadow-lg mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Search Ideas</label>
              <input
                type="text"
                placeholder="Search by Title..."
                value={search}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:bg-gray-800 dark:text-white transition duration-200"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Category</label>
              <select
                value={filter}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:bg-gray-800 dark:text-white transition duration-200"
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="Technology">Technology</option>
                <option value="Business">Business</option>
                <option value="Education">Education</option>
                <option value="Health">Health</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Finance">Finance</option>
                <option value="Agriculture">Agriculture</option>
              </select>
            </div>

            {/* Sorting */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">Sort By</label>
              <select
                value={sortBy}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:bg-gray-800 dark:text-white transition duration-200"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="budgetAsc">Budget: Low to High</option>
                <option value="budgetDesc">Budget: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* List of Ideas */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-5 space-y-4 animate-pulse">
                <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-2xl w-full"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
                <div className="flex justify-between items-center pt-2">
                  <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-full w-20"></div>
                  <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-xl w-24"></div>
                </div>
              </div>
            ))}
          </div>
        ) : sortedIdeas.length === 0 ? (
          <div className="flex flex-col justify-center items-center min-h-[40vh] text-center p-8 bg-white dark:bg-gray-900 rounded-3xl border border-violet-100 dark:border-gray-800 shadow-sm">
            <div className="text-5xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
              No Startup Ideas Found
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm">
              We couldn't find any ideas matching your search query or category filter. Try clearing filters or submit a new idea yourself!
            </p>
            <Link to="/add-idea" className="mt-6 bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-3 rounded-xl transition duration-300">
              Post an Idea
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedIdeas.map((idea) => (
              <div
                key={idea._id}
                className="group flex flex-col h-full bg-white dark:bg-gray-900/60 border border-violet-100 dark:border-gray-800/80 hover:border-violet-300 dark:hover:border-violet-800/80 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/5 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img
                    src={idea.image}
                    alt={idea.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Category overlay */}
                  <span className="absolute top-4 left-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur shadow-sm text-xs font-bold text-violet-700 dark:text-violet-400 px-3 py-1.5 rounded-full border border-violet-100 dark:border-gray-800">
                    {idea.category}
                  </span>
                  {/* Budget overlay */}
                  <span className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                    Budget: {idea.budget}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-3">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors line-clamp-1">
                      {idea.title}
                    </h2>
                    
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
                      {idea.shortDescription || idea.description}
                    </p>

                    {/* Tag list */}
                    {idea.tags && idea.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {idea.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 px-2 py-0.5 rounded"
                          >
                            #{tag}
                          </span>
                        ))}
                        {idea.tags.length > 3 && (
                          <span className="text-xs text-gray-400 px-2 py-0.5">+{idea.tags.length - 3} more</span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Footer action */}
                  <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800/80 pt-4 mt-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-7 h-7 rounded-full bg-violet-100 dark:bg-violet-950/40 flex items-center justify-center text-xs font-bold text-violet-700 dark:text-violet-400 uppercase">
                        {idea.userName ? idea.userName[0] : "U"}
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 max-w-[100px] truncate">
                        By {idea.userName || "Founder"}
                      </span>
                    </div>

                    <Link
                      to={`/ideas/${idea._id}`}
                      className="inline-flex items-center gap-1 bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-md shadow-violet-500/10 transition-all duration-300"
                    >
                      View Details
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
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

export default Ideas;
