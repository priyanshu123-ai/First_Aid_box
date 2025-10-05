import React, { useState } from "react";
import Heart from "../assets/heart.webp";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex justify-between p-5 items-center">
      <div className="flex gap-2">
        <img src={Heart} alt="heart" className="w-8" />
        <h2> Emergency Aid</h2>
      </div>

      <div className="flex gap-5 items-center text-md capitalize">
        <ul className=" gap-5 hidden md:flex items-center text-md">
          <li>
            <Link to="/"> home</Link>
          </li>
          <li>
            <Link to="/firstAid"> first aid</Link>
          </li>
          <li>
            <Link to="/emergency"> emergency</Link>
          </li>
          <li>
            <Link to="/hospital"> hospital</Link>
          </li>
          <li>
            <Link to="/myProfile"> my rpofile</Link>
          </li>
          <button className="bg-red-500 text-white px-8 py-2">
            <Link to="/register">signup</Link>{" "}
          </button>
        </ul>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        {isOpen && (
          <div className="absolute top-14 right-0 w-full bg-white shadow-md md:hidden z-5">
            <ul className="flex flex-col items-end pr-8 gap-5 py-5 text-gray-700 font-medium capitalize">
              <li className="flex flex-col">
                <Link to="/" onClick={() => setIsOpen(false)}>
                  home
                </Link>
                <Link to="/" onClick={() => setIsOpen(false)}>
                  home
                </Link>
                <Link to="/" onClick={() => setIsOpen(false)}>
                  home
                </Link>
                <Link to="/" onClick={() => setIsOpen(false)}>
                  home
                </Link>
                <Link to="/" onClick={() => setIsOpen(false)}>
                  home
                </Link>
                <Link to="/" onClick={() => setIsOpen(false)}>
                  home
                </Link>
              </li>
              <button onClick={() => setIsOpen(false)}>
                <Link to="/register">signup</Link>
              </button>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
