import { Link } from "react-router-dom";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-[#0c0f1d] border-t border-violet-100 dark:border-violet-950/30 transition-colors mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* LOGO + DESCRIPTION */}
        <div className="space-y-4">
          <Link
            to="/"
            className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-violet-500 flex items-center gap-2"
          >
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-amber-500 flex items-center justify-center text-white text-lg font-black shadow-md">
              V
            </span>
            IdeaVolt
          </Link>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
            Empowering next-generation innovators. Share your concepts, receive community feedback, analyze budgets, and co-create future technologies.
          </p>
        </div>

        {/* PLATFORM LINKS */}
        <div>
          <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-5">
            Platform
          </h3>

          <div className="flex flex-col gap-3 text-sm text-gray-600 dark:text-gray-400">
            <Link
              to="/"
              className="hover:text-violet-600 dark:hover:text-violet-400 transition"
            >
              Home
            </Link>

            <Link
              to="/ideas"
              className="hover:text-violet-600 dark:hover:text-violet-400 transition"
            >
              Explore Ideas
            </Link>

            <Link
              to="/add-idea"
              className="hover:text-violet-600 dark:hover:text-violet-400 transition"
            >
              Add New Idea
            </Link>

            <Link
              to="/my-ideas"
              className="hover:text-violet-600 dark:hover:text-violet-400 transition"
            >
              My Ideas Dashboard
            </Link>
          </div>
        </div>

        {/* CONTACT INFO */}
        <div>
          <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-5">
            Support & Location
          </h3>

          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <p>
              Email:{" "}
              <a
                href="mailto:support@ideavolt.co"
                className="hover:text-violet-600 transition"
              >
                support@ideavolt.co
              </a>
            </p>

            <p>Phone: +880 1234-567890</p>

            <p>Rajshahi Innovation Center, Bangladesh</p>
          </div>
        </div>

        {/* SOCIAL LINKS */}
        <div>
          <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-5">
            Follow Us
          </h3>

          <div className="flex gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-950/30 text-violet-700 dark:text-violet-300 flex items-center justify-center hover:bg-violet-600 hover:text-white dark:hover:bg-violet-600 dark:hover:text-white hover:scale-105 duration-300"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-950/30 text-violet-700 dark:text-violet-300 flex items-center justify-center hover:bg-violet-600 hover:text-white dark:hover:bg-violet-600 dark:hover:text-white hover:scale-105 duration-300"
            >
              <FaGithub />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-950/30 text-violet-700 dark:text-violet-300 flex items-center justify-center hover:bg-violet-600 hover:text-white dark:hover:bg-violet-600 dark:hover:text-white hover:scale-105 duration-300"
            >
              <FaLinkedinIn />
            </a>

            {/* UPDATED X LOGO */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-950/30 text-violet-700 dark:text-violet-300 flex items-center justify-center hover:bg-violet-600 hover:text-white dark:hover:bg-violet-600 dark:hover:text-white hover:scale-105 duration-300"
            >
              <FaXTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-violet-100 dark:border-violet-950/20 py-6 text-center text-xs text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} IdeaVolt Platform. Built for Startup Innovators. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
