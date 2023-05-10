import { ReactElement } from "react";
import { Link } from "react-router-dom";

const Navbar = (): ReactElement => {
  return (
    <nav className="navbar">
      <h1>Resiliant NFT Marketplace</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/create"> Create Prediction </Link>
      </div>
    </nav>
  );
};

export default Navbar;
