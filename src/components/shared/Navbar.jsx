import { Link, NavLink } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logout Successful");
    window.location.reload();
  };

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
          <ul className="menu menu-horizontal px-1 gap-2 text-gray-800 dark:text-white font-medium">
            {links}
          </ul>
        </div>

        {/* RIGHT */}
        <div className="navbar-end gap-3">
          <ThemeToggle />

          {user ? (
            <div className="flex items-center gap-4">
              <img
                src={user.photo}
                alt="user"
                className="w-10 h-10 rounded-full object-cover border"
              />

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <button className="border px-5 py-2 rounded-xl">Login</button>
              </Link>

              <Link to="/register">
                <button className="bg-blue-600 text-white px-5 py-2 rounded-xl">
                  Register
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
