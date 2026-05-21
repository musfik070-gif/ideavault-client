const TrendingIdeas = ({ ideas = [] }) => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">Trending Ideas</h2>

        <p className="text-gray-500 dark:text-gray-400 mt-4">
          Discover innovative startup concepts trending in the community.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ideas.length > 0 ? (
          ideas.map((idea) => (
            <div
              key={idea._id || idea.title}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden"
            >
              <img
                src={idea.image || "https://i.ibb.co/ZYW3VTp/brown-brim.png"}
                alt={idea.title}
                className="h-56 w-full object-cover"
              />

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">{idea.title}</h3>

                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {idea.description}
                </p>

                <div className="flex justify-between text-sm text-gray-500 mb-5">
                  <span>Category: {idea.category}</span>

                  {idea.budget && <span>Budget: {idea.budget}</span>}
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 duration-300 text-white py-3 rounded-xl font-semibold">
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 dark:text-gray-400">
            No trending ideas available.
          </div>
        )}
      </div>
    </section>
  );
};

export default TrendingIdeas;
