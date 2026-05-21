import { Link } from "react-router-dom";
import { FiHome, FiAlertCircle } from "react-icons/fi";

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-amber-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-800 dark:text-gray-200 flex flex-col justify-center items-center px-6 transition-colors">
      <div className="max-w-md w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-3xl border border-violet-100 dark:border-gray-800/80 p-8 shadow-2xl text-center space-y-6">
        <div className="inline-flex p-4 bg-amber-100 dark:bg-amber-950/40 rounded-3xl text-amber-600 dark:text-amber-400 animate-pulse">
          <FiAlertCircle className="text-5xl" />
        </div>

        <div className="space-y-2">
          <h1 className="text-7xl font-extrabold bg-gradient-to-r from-violet-600 to-amber-600 bg-clip-text text-transparent dark:from-violet-400 dark:to-amber-400 font-mono">
            404
          </h1>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Page Not Found
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-violet-500/20 transition duration-300 hover:-translate-y-0.5"
          >
            <FiHome className="text-lg" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
