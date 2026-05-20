const AddIdea = () => {
  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Add New Idea</h1>
        <form className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
          <div>
            <label className="block mb-2 font-medium">Idea Title</label>
            <input
              type="text"
              placeholder="Enter your idea title"
              className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Description</label>
            <textarea
              placeholder="Describe your idea"
              rows="5"
              className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 outline-none"
            ></textarea>
          </div>

          <div>
            <label className="block mb-2 font-medium">Category</label>
            <select className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 outline-none">
              <option>Select a category</option>
              <option>Technology</option>
              <option>Business</option>
              <option>Education</option>
              <option>Health</option>
              <option>Entertainment</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 duration-300 text-white py-3 rounded-xl font-semibold"
          >
            Submit Idea
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddIdea;
