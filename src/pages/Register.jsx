import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const searchParams = new URLSearchParams(location.search);
  const redirectParam = searchParams.get("redirect");
  
  let statePath = null;
  if (typeof location.state === "string") {
    statePath = location.state;
  } else if (location.state && typeof location.state.from === "string") {
    statePath = location.state.from;
  }
  
  const from = redirectParam || statePath || "/";
  const { loginUser } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const photo = form.photo.value.trim();
    const password = form.password.value;

    if (!name) {
      return toast.error("Name is required");
    }
    if (!email) {
      return toast.error("Email is required");
    }
    if (!password) {
      return toast.error("Password is required");
    }

    // PASSWORD VALID
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    if (!/[A-Z]/.test(password)) {
      return toast.error("Password must contain at least one uppercase letter");
    }

    if (!/[a-z]/.test(password)) {
      return toast.error("Password must contain at least one lowercase letter");
    }

    const userData = {
      name,
      email,
      photo: photo || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150",
      password,
    };

    try {
      const apiBase = import.meta.env.VITE_API_URL || "https://ideavault-server-topaz.vercel.app";
      const response = await axios.post(
        `${apiBase}/register`,
        userData,
      );

      // SAVE TOKEN
      localStorage.setItem("token", response.data.token);
      loginUser(response.data.user || { name, email, photo: userData.photo });

      toast.success("Registration Successful");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-5 py-12 bg-gradient-to-br from-violet-50 via-white to-amber-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-800 dark:text-gray-200">
      <div className="w-full max-w-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-2xl rounded-3xl p-8 border border-violet-100/50 dark:border-gray-800/50">
        <h2 className="text-4xl font-extrabold text-center mb-2 bg-gradient-to-r from-violet-600 to-amber-600 bg-clip-text text-transparent dark:from-violet-400 dark:to-amber-400">
          Create Account
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
          Join IdeaVolt and start sharing your innovations
        </p>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block mb-1.5 font-semibold text-sm text-gray-700 dark:text-gray-300">Name</label>
            <input
              type="text"
              name="name"
              required
              placeholder="Enter your name"
              className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:bg-gray-800 dark:text-white transition duration-200"
            />
          </div>

          <div>
            <label className="block mb-1.5 font-semibold text-sm text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:bg-gray-800 dark:text-white transition duration-200"
            />
          </div>

          <div>
            <label className="block mb-1.5 font-semibold text-sm text-gray-700 dark:text-gray-300">Photo URL</label>
            <input
              type="url"
              name="photo"
              placeholder="https://example.com/photo.jpg (optional)"
              className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:bg-gray-800 dark:text-white transition duration-200"
            />
          </div>

          <div>
            <label className="block mb-1.5 font-semibold text-sm text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              required
              placeholder="Password (min 6 chars, A-Z, a-z)"
              className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:bg-gray-800 dark:text-white transition duration-200"
            />
          </div>

          <button className="w-full bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800 text-white py-3.5 rounded-xl font-bold transition duration-300 transform active:scale-[0.98] shadow-lg shadow-violet-500/25">
            Register
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link to={`/login?redirect=${encodeURIComponent(from)}`} state={{ from }} className="font-bold text-violet-600 dark:text-violet-400 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
