const TrendingIdeas = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">Trending Ideas</h2>

        <p className="text-gray-500 dark:text-gray-400 mt-4">
          Discover innovative startup concepts trending in the community.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((idea) => (
          <div
            key={idea}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden"
          >
            <img
              src="https://i.ibb.co/ZYW3VTp/brown-brim.png"
              alt="idea"
              className="h-56 w-full object-cover"
            />

            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3">AI Startup Platform</h3>

              <p className="text-gray-600 dark:text-gray-400 mb-4">
                A platform helping startups automate customer support using AI
                solutions.
              </p>

              <div className="flex justify-between text-sm text-gray-500 mb-5">
                <span>Category: AI</span>

                <span>Budget: $20k</span>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 duration-300 text-white py-3 rounded-xl font-semibold">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingIdeas;
