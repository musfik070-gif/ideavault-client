import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const handleLogin = async (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    const loginData = { email, password };

    try {
      const response = await axios.post(
        "http://localhost:5001/login",
        loginData,
      );

      // SAVE TOKEN
      localStorage.setItem("token", response.data.token);

      // SAVE USER
      localStorage.setItem("user", JSON.stringify(response.data.user));

      const isPasswordMatched = response.data.isPasswordMatched;
      console.log(isPasswordMatched);

      toast.success("Login Successful");

      navigate(from);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-5">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl rounded-3xl p-8">
        <h2 className="text-4xl font-bold text-center mb-8">Login</h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block mb-2 font-medium">Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Password</label>

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 outline-none"
            />
          </div>

          <div className="text-right">
            <button
              type="button"
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 duration-300 text-white py-3 rounded-xl font-semibold">
            Login
          </button>
        </form>

        <p className="text-center mt-5">
          New here?
          <Link to="/register" className="text-blue-500 ml-2">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
