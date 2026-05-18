import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex gap-5 p-5 bg-gray-200">
      <Link to="/">Home</Link>
      <Link to="/ideas">Ideas</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  );
};

export default Navbar;
