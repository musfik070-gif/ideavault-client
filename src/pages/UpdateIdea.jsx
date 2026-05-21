import axios from "axios";
import toast from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router";

const UpdateIdea = () => {
  const idea = useLoaderData();
  const navigate = useNavigate();

  const handleUpdateIdea = async (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const category = form.category.value;
    const image = form.image.value;

    const updatedIdea = {
      title,
      description,
      category,
      image,
    };

    try {
      const res = await axios.put(
        `http://localhost:5001/ideas/${idea._id}`,
        updatedIdea,
      );

      if (res.data.modifiedCount > 0) {
        toast.success("Idea Updated Successfully");
        navigate("/my-ideas");
      }
    } catch {
      toast.error("Failed to update idea");
    }
  };

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Update Idea</h1>

        <form
          onSubmit={handleUpdateIdea}
          className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg"
        >
          <div>
            <label className="block mb-2 font-medium">Idea Title</label>
            <input
              type="text"
              name="title"
              defaultValue={idea.title}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Description</label>
            <textarea
              name="description"
              defaultValue={idea.description}
              rows="5"
              className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 outline-none"
            ></textarea>
          </div>

          <div>
            <label className="block mb-2 font-medium">Category</label>
            <select
              name="category"
              defaultValue={idea.category}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 outline-none"
            >
              <option value="">Select a category</option>
              <option value="Technology">Technology</option>
              <option value="Business">Business</option>
              <option value="Education">Education</option>
              <option value="Health">Health</option>
              <option value="Entertainment">Entertainment</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">Image URL</label>
            <input
              type="text"
              name="image"
              defaultValue={idea.image}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 duration-300 text-white py-3 rounded-xl font-semibold"
          >
            Update Idea
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateIdea;
