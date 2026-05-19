import { Link } from "react-router-dom";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* LOGO + DESCRIPTION */}
        <div>
          <Link to="/" className="text-3xl font-bold text-blue-600">
            IdeaVault
          </Link>

          <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            A collaborative platform where innovators share startup ideas,
            explore trends, and connect through meaningful discussions.
          </p>
        </div>

        {/* PLATFORM LINKS */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Platform</h3>

          <div className="flex flex-col gap-3 text-gray-600 dark:text-gray-400">
            <Link to="/">Home</Link>

            <Link to="/ideas">Ideas</Link>

            <Link to="/add-idea">Add Idea</Link>

            <Link to="/my-ideas">My Ideas</Link>
          </div>
        </div>

        {/* CONTACT INFO */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact</h3>

          <div className="space-y-3 text-gray-600 dark:text-gray-400">
            <p>Email: support@ideavault.com</p>

            <p>Phone: +880 1234-567890</p>

            <p>Rajshahi, Bangladesh</p>
          </div>
        </div>

        {/* SOCIAL LINKS */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>

          <div className="flex gap-4">
            <a
              href="https://facebook"
              target="_blank"
              className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:scale-110 duration-300"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://githubcom"
              target="_blank"
              className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center hover:scale-110 duration-300"
            >
              <FaGithub />
            </a>

            <a
              href="https://linkedincom"
              target="_blank"
              className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center hover:scale-110 duration-300"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-gray-200 dark:border-gray-800 py-5 text-center text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} IdeaVault. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
