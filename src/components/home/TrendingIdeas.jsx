const TrendingIdeas = () => {
  const ideas = [
    {
      title: "AI Productivity Suite",
      description: "Automate workflows and boost team output.",
    },
    {
      title: "Sustainable Living App",
      description: "Track eco habits with smart rewards.",
    },
    {
      title: "Virtual Event Hub",
      description: "Create immersive online gatherings easily.",
    },
  ];

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.3em] text-sky-600">
            Trending
          </p>
          <h2 className="text-3xl font-bold mt-3">Trending Ideas</h2>
          <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
            These ideas are gaining momentum and inspiring the community.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {ideas.map((idea) => (
            <article
              key={idea.title}
              className="rounded-3xl border p-6 shadow-sm hover:shadow-md transition-all duration-200 dark:border-gray-700"
            >
              <h3 className="text-xl font-semibold">{idea.title}</h3>
              <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                {idea.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingIdeas;
