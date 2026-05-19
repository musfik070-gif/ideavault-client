const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-5">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl rounded-3xl p-8">
        <h2 className="text-4xl font-bold text-center mb-8">Login</h2>

        <form className="space-y-5">
          <div>
            <label className="block mb-2 font-medium">Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Password</label>

            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 outline-none"
            />
          </div>

          <div className="text-right">
            <button
              type="button"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 duration-300 text-white py-3 rounded-xl font-semibold">
            Login
          </button>
        </form>
      </div>
      
    </div>
  );
};

export default Login;
