import axios from "axios";

import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

const Register = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    // PASSWORD VALID
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    if (!/[A-Z]/.test(password)) {
      return toast.error("Password must contain uppercase letter");
    }

    if (!/[a-z]/.test(password)) {
      return toast.error("Password must contain lowercase letter");
    }

    const userData = {
      name,
      email,
      photo,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:5001/register",
        userData,
      );

      // SAVE TOKEN
      localStorage.setItem("token", response.data.token);
      loginUser(response.data.user || { name, email, photo });

      toast.success("Registration Successful");
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-5">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl rounded-3xl p-8">
        <h2 className="text-4xl font-bold text-center mb-8">Register</h2>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block mb-2 font-medium">Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 outline-none"
            />
          </div>

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
            <label className="block mb-2 font-medium">Photo URL</label>

            <input
              type="text"
              name="photo"
              placeholder="Photo URL"
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

          <button className="w-full bg-blue-600 hover:bg-blue-700 duration-300 text-white py-3 rounded-xl font-semibold">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
