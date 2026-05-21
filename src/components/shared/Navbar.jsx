import { useState, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiUser, FiLogOut, FiSettings } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, loginUser, logoutUser } = useAuth();
  const profileDialogRef = useRef(null);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    logoutUser();
    toast.success("Logout Successful");
    navigate("/");
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;

    try {
      const response = await axiosSecure.put("/users/profile", { name, photo });
      if (response.data.success) {
        loginUser(response.data.user);
        toast.success("Profile Updated Successfully");
        profileDialogRef.current?.close();
      }
    } catch {
      toast.error("Failed to update profile");
    }
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-2 rounded-xl transition ${
              isActive
                ? "bg-violet-600 text-white"
                : "hover:bg-violet-50 dark:hover:bg-violet-950/20 text-gray-700 dark:text-gray-200"
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/ideas"
          className={({ isActive }) =>
            `px-4 py-2 rounded-xl transition ${
              isActive
                ? "bg-violet-600 text-white"
                : "hover:bg-violet-50 dark:hover:bg-violet-950/20 text-gray-700 dark:text-gray-200"
            }`
          }
        >
          Ideas
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to="/add-idea"
              className={({ isActive }) =>
                `px-4 py-2 rounded-xl transition ${
                  isActive
                    ? "bg-violet-600 text-white"
                    : "hover:bg-violet-50 dark:hover:bg-violet-950/20 text-gray-700 dark:text-gray-200"
                }`
              }
            >
              Add Idea
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-ideas"
              className={({ isActive }) =>
                `px-4 py-2 rounded-xl transition ${
                  isActive
                    ? "bg-violet-600 text-white"
                    : "hover:bg-violet-50 dark:hover:bg-violet-950/20 text-gray-700 dark:text-gray-200"
                }`
              }
            >
              My Ideas
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-interactions"
              className={({ isActive }) =>
                `px-4 py-2 rounded-xl transition ${
                  isActive
                    ? "bg-violet-600 text-white"
                    : "hover:bg-violet-50 dark:hover:bg-violet-950/20 text-gray-700 dark:text-gray-200"
                }`
              }
            >
              My Interactions
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  const mobileLinks = (
    <>
      {links}
      {!user ? (
        <>
          <div className="border-t border-gray-100 dark:border-gray-700 my-2"></div>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `px-4 py-2 rounded-xl transition ${
                  isActive
                    ? "bg-violet-600 text-white"
                    : "hover:bg-violet-50 dark:hover:bg-violet-950/20 text-gray-700 dark:text-gray-200"
                }`
              }
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                `px-4 py-2 rounded-xl transition ${
                  isActive
                    ? "bg-violet-600 text-white"
                    : "hover:bg-violet-50 dark:hover:bg-violet-950/20 text-gray-700 dark:text-gray-200"
                }`
              }
            >
              Register
            </NavLink>
          </li>
        </>
      ) : (
        <>
          <div className="border-t border-gray-100 dark:border-gray-700 my-2"></div>
          <li className="px-4 py-2 text-xs font-bold text-gray-400 dark:text-gray-500 truncate">
            {user.name}
          </li>
          <li>
            <button
              onClick={() => profileDialogRef.current?.showModal()}
              className="px-4 py-2 text-left rounded-xl hover:bg-violet-50 dark:hover:bg-violet-950/20 text-gray-700 dark:text-gray-200 w-full"
            >
              Manage Profile
            </button>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-left rounded-xl hover:bg-red-50 dark:hover:bg-red-950/20 text-red-500 w-full"
            >
              Logout
            </button>
          </li>
        </>
      )}
    </>
  );

  return (
    <>
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-violet-100 dark:border-violet-950/30 transition-colors">
        <div className="navbar max-w-7xl mx-auto px-4 py-3">
          {/* LEFT */}
          <div className="navbar-start">
            {/* LOGO */}
            <Link
              to="/"
              className="text-lg md:text-xl font-bold truncate text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-violet-500 flex items-center gap-2"
            >
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-amber-500 flex items-center justify-center text-white text-lg font-black shadow-md shadow-violet-500/20 shrink-0">
                V
              </span>
              IdeaVolt
            </Link>
          </div>

          {/* CENTER */}
          <div className="navbar-center hidden md:flex">
            <ul className="menu menu-horizontal px-1 gap-2 font-medium">
              {links}
            </ul>
          </div>

          {/* RIGHT */}
          <div className="navbar-end flex items-center gap-2">
            <ThemeToggle />

            {/* Desktop User Section */}
            {user ? (
              <div className="dropdown dropdown-end hidden md:block">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar border-2 border-violet-200 dark:border-violet-900 shadow-md transition-transform hover:scale-105"
                >
                  <div className="w-10 rounded-full">
                    <img
                      src={user.photo || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80"}
                      alt="user avatar"
                      className="object-cover"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow-2xl bg-white dark:bg-gray-800 rounded-2xl w-64 border border-violet-100 dark:border-violet-950/30 text-gray-700 dark:text-gray-200"
                >
                  <li className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 mb-1">
                    <p className="font-bold text-gray-900 dark:text-white truncate text-base">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate font-mono">
                      {user.email}
                    </p>
                  </li>
                  <li>
                    <button
                      onClick={() => profileDialogRef.current?.showModal()}
                      className="py-2.5 rounded-lg hover:bg-violet-50 dark:hover:bg-violet-950/20 hover:text-violet-600 dark:hover:text-violet-400 transition"
                    >
                      <FiSettings className="mr-2" /> Manage Profile
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="py-2.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition"
                    >
                      <FiLogOut className="mr-2" /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Link to="/login">
                  <button className="border border-violet-200 dark:border-violet-900 px-5 py-2.5 rounded-xl text-violet-700 dark:text-violet-300 font-semibold hover:bg-violet-50 dark:hover:bg-violet-950/20 transition duration-300">
                    Login
                  </button>
                </Link>

                <Link to="/register">
                  <button className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-violet-500/25 transition duration-300 hover:-translate-y-0.5">
                    Register
                  </button>
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Dropdown */}
            <div className="dropdown dropdown-end flex md:hidden">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle text-gray-700 dark:text-white flex items-center justify-center"
              >
                <FiMenu className="text-2xl" />
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[50] p-3 shadow-2xl bg-white dark:bg-gray-800 rounded-2xl w-56 gap-2 border border-gray-100 dark:border-gray-700 text-gray-700 dark:text-white"
              >
                {mobileLinks}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* MANAGE PROFILE MODAL */}
      <dialog
        ref={profileDialogRef}
        onClick={(e) => {
          if (e.target === profileDialogRef.current) {
            profileDialogRef.current.close();
          }
        }}
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 m-0 h-fit p-0 rounded-3xl border border-violet-100 dark:border-violet-950/30 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 w-full max-w-md shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm overflow-hidden"
      >
        {user && (
          <div className="p-6">
            <h3 className="font-bold text-2xl mb-4 text-violet-700 dark:text-violet-400">
              Manage Profile
            </h3>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={user.name}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 transition"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Photo URL
                </label>
                <input
                  type="text"
                  name="photo"
                  defaultValue={user.photo}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 transition"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700 mt-6">
                <button
                  type="button"
                  onClick={() => profileDialogRef.current?.close()}
                  className="px-5 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-semibold shadow-lg shadow-violet-500/20 transition cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}
      </dialog>
    </>
  );
};

export default Navbar;
