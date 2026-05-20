const MyInteractions = () => {
  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">My Interactions</h1>
        <div className="grid gap-6">
          {/* Interactions will be rendered here */}
          <p className="text-gray-600 dark:text-gray-300">
            You haven't had any interactions yet.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyInteractions;
