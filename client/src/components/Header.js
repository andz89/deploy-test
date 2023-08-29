import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="flex justify-between  items-center bg-teal-600 p-3  text-white cursor-pointer">
      <div className="font-semibold text-2xl">Project Manager</div>
      <ul className="flex  mx-2 gap-5">
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/clients">
          <li>Clients</li>
        </Link>
        <Link to="/projects">
          <li>Projects</li>
        </Link>
      </ul>
    </div>
  );
};

export default Header;
