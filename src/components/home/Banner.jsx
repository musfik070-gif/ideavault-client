const Banner = () => {
  return (
    <section className="bg-gradient-to-r from-sky-500 via-indigo-600 to-violet-700 text-white py-16 px-6 rounded-3xl shadow-xl">
      <div className="max-w-5xl mx-auto grid gap-8 lg:grid-cols-2 items-center">
        <div>
          <p className="uppercase tracking-[0.3em] text-sm opacity-80">
            Welcome to IdeaVault
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mt-4">
            Launch ideas faster with the right tools.
          </h1>
          <p className="mt-6 text-lg leading-8 opacity-90">
            Discover trending concepts, curated categories, and the clarity you
            need to turn ideas into action.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button className="btn btn-primary">Explore Ideas</button>
            <button className="btn btn-outline btn-secondary">
              Learn More
            </button>
          </div>
        </div>
        <div className="rounded-3xl bg-white/10 p-8 backdrop-blur-xl border border-white/20">
          <div className="h-64 rounded-3xl bg-white/10 flex items-center justify-center text-center text-xl font-semibold opacity-90">
            Your next big idea starts here.
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
