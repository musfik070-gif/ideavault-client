import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
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

  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    if (!email || !password) {
      return toast.error("Please fill in all fields");
    }

    try {
      const apiBase = import.meta.env.VITE_API_URL || "https://ideavault-server-topaz.vercel.app";
      const response = await axios.post(`${apiBase}/login`, {
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

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const apiBase = import.meta.env.VITE_API_URL || "https://ideavault-server-topaz.vercel.app";
      const res = await axios.post(
        `${apiBase}/auth/google-login`,
        { credential: credentialResponse.credential }
      );

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        loginUser(res.data.user);
        toast.success("Logged in successfully!");
        navigate(from, { replace: true });
      }
    } catch (error) {
      if (error.response?.status === 404) {
        toast.error("Account not found. Please register first.");
        navigate("/register");
      } else {
        toast.error("Google login failed. Please try again.");
      }
    }
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
        <div className="w-full flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => toast.error("Google login failed.")}
            useOneTap={false}
            theme="filled_black"
            shape="rectangular"
            width="100%"
          />
        </div>

        <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
          New to IdeaVolt?
          <Link
            to={`/register?redirect=${encodeURIComponent(from)}`}
            state={{ from }}
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
    </div>
  );
};

export default Login;
