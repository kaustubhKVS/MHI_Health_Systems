import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Few Shot Image Processing based EHR</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/create"> Create NFT </Link>
        <Link to="/explore">Explore</Link>
      </div>
    </nav>
  );
};

export default Navbar;
