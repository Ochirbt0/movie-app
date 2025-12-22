import React from "react";

export const Header = () => {
  return (
    <div className="h-14.75 flex justify-center items-center">
      <div className="flex w-7xl h-9 justify-between items-center">
        <div className="flex space-x-2 justify-center items-center">
          <img src="/film.png" alt="" className="w-5 h-5" />
          <p className="text-indigo-700 font-bold text-base">Movie Z</p>
        </div>
        <div className="flex justify-center items-center space-x-3">
          <div className="flex w-24.25 h-9 border justify-center rounded-md">
            <button>Genre</button>
          </div>
          <div className="flex">
            <input
              type="text"
              placeholder="Search.."
              className="flex w-94.75 h-9 pl-9.5 border rounded-lg"
            />
          </div>
        </div>
        <div className="w-9 h-9 flex border justify-center items-center rounded-md">
          <button>
            <img src="./moon.png" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};
