const FeaturedCategories = () => {
  const categories = [
    {
      name: "Productivity",
      detail: "Tools for smarter work and faster delivery.",
    },
    {
      name: "Health & Wellness",
      detail: "Ideas that support better habits and balance.",
    },
    {
      name: "Education",
      detail: "Learning platforms and knowledge-sharing concepts.",
    },
  ];

  return (
    <section className="py-16 px-6 bg-base-200 rounded-3xl">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.3em] text-violet-600">
            Featured
          </p>
          <h2 className="text-3xl font-bold mt-3">Featured Categories</h2>
          <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
            Browse the most popular categories for the latest idea trends.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category.name}
              className="rounded-3xl border border-gray-200 dark:border-gray-700 p-6 hover:border-violet-500 transition-all"
            >
              <h3 className="text-xl font-semibold">{category.name}</h3>
              <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                {category.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
