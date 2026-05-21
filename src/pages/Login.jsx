import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";
  const { loginUser } = useAuth();

  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState("");
  const [customGoogleName, setCustomGoogleName] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    if (!email || !password) {
      return toast.error("Please fill in all fields");
    }

    try {
      const response = await axios.post("http://localhost:5001/login", {
        email,
        password,
      });

      // SAVE TOKEN
      localStorage.setItem("token", response.data.token);

      // SAVE USER
      loginUser(response.data.user);

      toast.success("Login Successful");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    const email = e.target.forgotEmail.value;
    if (email) {
      toast.success(`Password reset email sent to: ${email}`);
      setIsForgotModalOpen(false);
    }
  };

  const triggerGoogleLogin = async (googleProfile) => {
    try {
      // Check if user exists in the database first
      const checkRes = await axios.get(`http://localhost:5001/users/check/${googleProfile.email}`);
      if (!checkRes.data.exists) {
        toast.error("Account not found. Please register first.");
        setIsGoogleModalOpen(false);
        return;
      }

      const response = await axios.post(
        "http://localhost:5001/google-login",
        googleProfile
      );

      // SAVE TOKEN & USER
      localStorage.setItem("token", response.data.token);
      loginUser(response.data.user);

      toast.success(`Signed in as ${googleProfile.name}`);
      setIsGoogleModalOpen(false);
      navigate(from, { replace: true });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("Account not found. Please register first.");
      } else {
        toast.error("Google Login failed");
      }
      setIsGoogleModalOpen(false);
    }
  };

  const handleCustomGoogleSubmit = (e) => {
    e.preventDefault();
    if (!customGoogleEmail || !customGoogleName) {
      return toast.error("Please enter email and name");
    }
    triggerGoogleLogin({
      name: customGoogleName,
      email: customGoogleEmail,
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80",
    });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-5 py-10 transition-colors">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-8 border border-violet-100 dark:border-violet-950/20">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Sign in to explore and share innovation
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              required
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 bg-transparent text-gray-900 dark:text-white outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 transition"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              required
              className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 bg-transparent text-gray-900 dark:text-white outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600 transition"
            />
          </div>

          <div className="text-right">
            <button
              type="button"
              onClick={() => setIsForgotModalOpen(true)}
              className="text-sm text-violet-600 dark:text-violet-400 hover:underline font-semibold"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-700 duration-300 text-white py-3 rounded-xl font-bold shadow-lg shadow-violet-500/25 cursor-pointer"
          >
            Login
          </button>
        </form>

        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-200 dark:border-gray-700"></span>
          </div>
          <span className="relative bg-white dark:bg-gray-800 px-4 text-sm text-gray-500 dark:text-gray-400">
            or continue with
          </span>
        </div>

        {/* GOOGLE SIGN IN BUTTON */}
        <button
          onClick={() => setIsGoogleModalOpen(true)}
          className="w-full border border-gray-800 dark:border-gray-600 bg-white dark:bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 duration-300 flex items-center justify-center gap-3 py-3 rounded-xl font-bold text-gray-900 dark:text-gray-200 cursor-pointer"
        >
          <FcGoogle className="text-2xl" />
          Sign in with Google
        </button>

        <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
          New to IdeaVolt?
          <Link
            to="/register"
            className="text-violet-600 dark:text-violet-400 font-bold ml-2 hover:underline"
          >
            Create an Account
          </Link>
        </p>
      </div>

      {/* FORGOT PASSWORD MODAL */}
      {isForgotModalOpen && (
        <dialog open className="modal modal-open">
          <div className="modal-box bg-white dark:bg-gray-800 border border-violet-100 dark:border-violet-950/30 rounded-3xl shadow-2xl max-w-sm p-6">
            <h3 className="font-bold text-2xl mb-2 text-violet-700 dark:text-violet-400">
              Reset Password
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Enter your email and we'll send you a password reset link.
            </p>
            <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  name="forgotEmail"
                  placeholder="name@example.com"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600"
                />
              </div>
              <div className="modal-action flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsForgotModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-150 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-semibold transition"
                >
                  Send Reset Link
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}

      {/* GOOGLE ACCOUNTS PICKER SIMULATION */}
      {isGoogleModalOpen && (
        <dialog open className="modal modal-open">
          <div className="modal-box bg-white dark:bg-gray-800 border border-violet-100 dark:border-violet-950/30 rounded-3xl shadow-2xl max-w-md p-6">
            <div className="text-center mb-6">
              <FcGoogle className="text-4xl mx-auto mb-2" />
              <h3 className="font-bold text-2xl text-gray-900 dark:text-white">
                Choose an account
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                to continue to <span className="font-bold">IdeaVolt</span>
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() =>
                  triggerGoogleLogin({
                    name: "Alex Innovator",
                    email: "alex.innovator@gmail.com",
                    photo: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80",
                  })
                }
                className="w-full flex items-center gap-3 p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-violet-50 dark:hover:bg-violet-950/20 text-left transition"
              >
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80"
                  alt="Alex"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-sm text-gray-900 dark:text-white">
                    Alex Innovator
                  </p>
                  <p className="text-xs text-gray-500">
                    alex.innovator@gmail.com
                  </p>
                </div>
              </button>

              <button
                onClick={() =>
                  triggerGoogleLogin({
                    name: "Emma AI Dev",
                    email: "emma.ai.developer@gmail.com",
                    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80",
                  })
                }
                className="w-full flex items-center gap-3 p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-violet-50 dark:hover:bg-violet-950/20 text-left transition"
              >
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80"
                  alt="Emma"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-sm text-gray-900 dark:text-white">
                    Emma AI Dev
                  </p>
                  <p className="text-xs text-gray-500">
                    emma.ai.developer@gmail.com
                  </p>
                </div>
              </button>

              <div className="border-t border-gray-200 dark:border-gray-700 my-4 pt-4">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
                  Or use a custom Google ID:
                </p>
                <form onSubmit={handleCustomGoogleSubmit} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={customGoogleName}
                    onChange={(e) => setCustomGoogleName(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent text-sm text-gray-900 dark:text-white outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600"
                  />
                  <input
                    type="email"
                    placeholder="google-email@gmail.com"
                    value={customGoogleEmail}
                    onChange={(e) => setCustomGoogleEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent text-sm text-gray-900 dark:text-white outline-none focus:border-violet-600 focus:ring-1 focus:ring-violet-600"
                  />
                  <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm py-2 rounded-xl"
                  >
                    Use Custom Google Profile
                  </button>
                </form>
              </div>
            </div>

            <div className="modal-action">
              <button
                type="button"
                onClick={() => setIsGoogleModalOpen(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-300 transition"
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Login;
