const WhyChooseUs = () => {
  const reasons = [
    {
      title: "Curated Idea Pipeline",
      description: "Handpicked concepts with practical product potential.",
    },
    {
      title: "Community Insights",
      description: "Create and refine ideas with real user feedback.",
    },
    {
      title: "Fast Prototyping",
      description: "Move from concept to launch-ready plan quickly.",
    },
  ];

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-sky-600">
            Why Choose Us
          </p>
          <h2 className="text-3xl font-bold mt-3">Why Choose IdeaVault</h2>
          <p className="mt-2 text-base text-gray-600 dark:text-gray-300">
            We help founders, builders, and creators find clarity, speed, and
            confidence.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="rounded-3xl border border-gray-200 dark:border-gray-700 p-6 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <h3 className="text-xl font-semibold">{reason.title}</h3>
              <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
