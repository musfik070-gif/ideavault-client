const FeaturedCategories = () => {
  const categories = [
    "AI",
    "Health",
    "Education",
    "FinTech",
    "E-Commerce",
    "Cyber Security",
  ];

  return (
    <section className="bg-gray-100 dark:bg-gray-800 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Explore Categories</h2>

          <p className="text-gray-600 dark:text-gray-300 mt-4">
            Browse ideas based on industries and startup sectors.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category}
              className="bg-white dark:bg-gray-900 p-10 rounded-3xl text-center shadow-md hover:-translate-y-2 duration-300 border border-gray-100 dark:border-gray-800"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{category}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
