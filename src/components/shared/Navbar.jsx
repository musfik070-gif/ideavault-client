import { Link, NavLink } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  // temporary fake user
  const user = null;

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>

      <li>
        <NavLink to="/ideas">Ideas</NavLink>
      </li>

      <li>
        <NavLink to="/add-idea">Add Idea</NavLink>
      </li>

      <li>
        <NavLink to="/my-ideas">My Ideas</NavLink>
      </li>

      <li>
        <NavLink to="/my-interactions">My Interactions</NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-white dark:bg-gray-900 shadow-md">
      <div className="navbar max-w-7xl mx-auto px-4">
        {/* LEFT */}
        <div className="navbar-start">
          {/* MOBILE MENU */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <FiMenu className="text-2xl" />
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white dark:bg-gray-800 rounded-box w-52"
            >
              {links}
            </ul>
          </div>

          {/* LOGO */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            IdeaVault
          </Link>
        </div>

        {/* CENTER */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2 text-gray-800 dark:text-white font-medium">{links}</ul>
        </div>

        {/* RIGHT */}
        <div className="navbar-end gap-3">
          <ThemeToggle />

          {user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="avatar">
                <div className="w-10 rounded-full">
                  <img src="https://i.ibb.co/4pDNDk1/avatar.png" alt="user" />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-box w-52"
              >
                <li>
                  <Link to="/profile">Profile Management</Link>
                </li>

                <li>
                  <button>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="px-4 py-2 rounded-lg bg-blue-600 text-white">
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 rounded-lg bg-blue-600 text-white"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
