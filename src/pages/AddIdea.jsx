import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AddIdea = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleAddIdea = async (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value.trim();
    const shortDescription = form.shortDescription.value.trim();
    const description = form.description.value.trim(); // Detailed Description
    const category = form.category.value;
    const tagsString = form.tags.value.trim();
    const image = form.image.value.trim();
    const budget = form.budget.value.trim();
    const targetAudience = form.targetAudience.value.trim();
    const problem = form.problem.value.trim();
    const solution = form.solution.value.trim();

    if (!title || !shortDescription || !description || !category || !image || !budget || !targetAudience || !problem || !solution) {
      return toast.error("Please fill in all required fields");
    }

    const tags = tagsString
      ? tagsString.split(",").map((tag) => tag.trim()).filter((tag) => tag.length > 0)
      : [];

    const ideaData = {
      title,
      shortDescription,
      description, // Detailed Description
      category,
      tags,
      image,
      budget,
      targetAudience,
      problemStatement: problem,
      proposedSolution: solution,
      userEmail: user?.email,
      userName: user?.name,
      userPhoto: user?.photo, // Let's also pass user photo for detail page showing avatar
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post("/ideas", ideaData);

      if (res.data.insertedId) {
        toast.success("Idea Added Successfully!");
        form.reset();
        navigate("/my-ideas");
      } else {
        toast.error("Failed to add idea");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to add idea");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-amber-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-800 dark:text-gray-200 px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-violet-600 to-amber-600 bg-clip-text text-transparent dark:from-violet-400 dark:to-amber-400 mb-3">
            Add New Startup Idea
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Submit your innovative idea, define the problem, and lay out your roadmap to attract feedback and collaborators.
          </p>
        </div>

        <form
          onSubmit={handleAddIdea}
          className="space-y-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-xl border border-violet-100/50 dark:border-gray-800/50"
        >
          {/* Title */}
          <div>
            <label className="block mb-2 font-semibold text-sm text-gray-700 dark:text-gray-300">Idea Title *</label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g. Decentralized Freelance Escrow Protocol"
              className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:bg-gray-800 dark:text-white transition duration-200"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category */}
            <div>
              <label className="block mb-2 font-semibold text-sm text-gray-700 dark:text-gray-300">Category *</label>
              <select
                name="category"
                required
                className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:bg-gray-800 dark:text-white transition duration-200"
              >
                <option value="">Select a category</option>
                <option value="Technology">Technology</option>
                <option value="Business">Business</option>
                <option value="Education">Education</option>
                <option value="Health">Health</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Finance">Finance</option>
                <option value="Agriculture">Agriculture</option>
              </select>
            </div>

            {/* Estimated Budget */}
            <div>
              <label className="block mb-2 font-semibold text-sm text-gray-700 dark:text-gray-300">Estimated Budget *</label>
              <input
                type="text"
                name="budget"
                required
                placeholder="e.g. $10k - $25k"
                className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:bg-gray-800 dark:text-white transition duration-200"
              />
            </div>
          </div>

          {/* Short Description */}
          <div>
            <label className="block mb-2 font-semibold text-sm text-gray-700 dark:text-gray-300">Short Description (One-liner summary) *</label>
            <input
              type="text"
              name="shortDescription"
              required
              maxLength={150}
              placeholder="e.g. A secure protocol for milestone-based freelancing using smart contracts."
              className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:bg-gray-800 dark:text-white transition duration-200"
            />
          </div>

          {/* Detailed Description */}
          <div>
            <label className="block mb-2 font-semibold text-sm text-gray-700 dark:text-gray-300">Detailed Description *</label>
            <textarea
              name="description"
              required
              placeholder="Provide a deep-dive explanation of the idea, core value proposition, and mechanism."
              rows="4"
              className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:bg-gray-800 dark:text-white transition duration-200"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Target Audience */}
            <div>
              <label className="block mb-2 font-semibold text-sm text-gray-700 dark:text-gray-300">Target Audience *</label>
              <input
                type="text"
                name="targetAudience"
                required
                placeholder="e.g. Independent freelancers and tech startups"
                className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:bg-gray-800 dark:text-white transition duration-200"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block mb-2 font-semibold text-sm text-gray-700 dark:text-gray-300">Tags (Comma separated)</label>
              <input
                type="text"
                name="tags"
                placeholder="e.g. blockchain, freelancing, solidity"
                className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:bg-gray-800 dark:text-white transition duration-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Problem Statement */}
            <div>
              <label className="block mb-2 font-semibold text-sm text-gray-700 dark:text-gray-300">Problem Statement *</label>
              <textarea
                name="problem"
                required
                placeholder="What critical pain point does this idea solve?"
                rows="3"
                className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:bg-gray-800 dark:text-white transition duration-200"
              ></textarea>
            </div>

            {/* Proposed Solution */}
            <div>
              <label className="block mb-2 font-semibold text-sm text-gray-700 dark:text-gray-300">Proposed Solution *</label>
              <textarea
                name="solution"
                required
                placeholder="How does your platform solve this problem?"
                rows="3"
                className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:bg-gray-800 dark:text-white transition duration-200"
              ></textarea>
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block mb-2 font-semibold text-sm text-gray-700 dark:text-gray-300">Image URL *</label>
            <input
              type="url"
              name="image"
              required
              placeholder="e.g. https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format"
              className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:bg-gray-800 dark:text-white transition duration-200"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-4 bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800 text-white py-4 rounded-xl font-bold transition duration-300 transform active:scale-[0.98] shadow-lg shadow-violet-500/25"
          >
            Launch Idea to Vault
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddIdea;
