import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Few Shot Image Processing based EHR</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/create"> Create Prediction </Link>
        <Link to="/explore">Explore</Link>
        <Link to="/image_test">Image Train Upload</Link>
      </div>
    </nav>
  );
};

export default Navbar;
