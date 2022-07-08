import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [dropdownClicked, setDropdownClicked] = React.useState(false);

  return (
    <nav className="bg-blue-400 shadow-lg px-2 sm:px-4 py-2.5 fixed top-0 w-full h-[4rem]">
      <div className="container h-full flex items-center mx-auto">
        <h1 className="text-2xl inline-flex font-semibold whitespace-nowrap dark:text-white">
          Beep
        </h1>
        <div className="flex justify-between w-full font-bold">
          <div className="w-fit mx-6 my-auto">
            <Link to="/home">
              <h3 className="text-white hover:text-yellow-500 hover:cursor-pointer inline-flex mx-4">
                Home
              </h3>
            </Link>
            <Link to="/coffee">
              <h3 className="text-white hover:text-yellow-500 hover:cursor-pointer inline-flex mx-4">
                Grab a Coffee
              </h3>
            </Link>
            <h3 className="text-white hover:text-yellow-500 hover:cursor-pointer inline-flex mx-4">
              Create an Event
            </h3>
          </div>
          <div className="">
            <button
              className="flex items-center justify-between w-full py-2 pl-3 pr-4 font-medium text-white hover:bg-gray-50 md:hover:bg-transparent hover:text-yellow-500"
              onClick={() => setDropdownClicked((prevState) => !prevState)}
            >
              Username{' '}
              <svg
                className={`${
                  dropdownClicked ? 'rotate-180' : ''
                } transition-transform w-4 h-4 ml-1`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <div
              id="dropdownNavbar"
              className={`z-10 ${
                dropdownClicked ? 'visible' : 'hidden'
              } bg-white divide-y divide-gray-100 rounded shadow fixed top-[3rem] w-[8rem]`}
            >
              <ul className="py-1 text-sm text-gray-700 px-2">
                <li>
                  <p>Test</p>
                </li>
                <li>
                  <p>Test</p>
                </li>
                <li>
                  <p>Test</p>
                </li>
              </ul>
              <ul className="py-1 text-sm text-gray-700">
                <li>Log Out</li>
              </ul>
              <div className="py-1"></div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
