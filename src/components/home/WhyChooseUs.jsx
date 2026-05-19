const WhyChooseUs = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">Why Choose IdeaVault?</h2>

        <p className="text-gray-500 dark:text-gray-400 mt-4">
          Empowering innovators with collaboration, visibility, and feedback.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-md">
          <h3 className="text-2xl font-bold mb-4">Share Ideas</h3>

          <p className="text-gray-600 dark:text-gray-400">
            Publish startup concepts and reach a global audience.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-md">
          <h3 className="text-2xl font-bold mb-4">Community Feedback</h3>

          <p className="text-gray-600 dark:text-gray-400">
            Receive comments and suggestions to improve your innovation.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-md">
          <h3 className="text-2xl font-bold mb-4">Discover Trends</h3>

          <p className="text-gray-600 dark:text-gray-400">
            Explore the latest startup trends and ideas across multiple
            industries.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
