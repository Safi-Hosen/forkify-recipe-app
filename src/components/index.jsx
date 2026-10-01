import { NavLink } from "react-router-dom";
import { GlobalContext } from "../context";
import { useContext } from "react";

export default function Navbar() {
  const { searchParam, setSearchParam, handleSubmit } =
    useContext(GlobalContext);
  console.log(searchParam);

  return (
    <>
      <nav className="flex justify-between items-center p-3 container mx-auto flex-col lg:flex-row gap-5 lg:gap-0 bg-amber-100">
        <NavLink
          to={"/"}
          className="text-black hover:text-gray-700 duration-300 font-bold "
        >
          <h1 className="text-3xl text-amber-500">FoodRecipe</h1>
        </NavLink>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="search"
            value={searchParam}
            onChange={(event) => setSearchParam(event.target.value)}
            placeholder="Enter Items..."
            className="border border-gray-600 pl-3 py-1 rounded-full outline-0 lg:w-96 shadow-lg shadow-red-100 focus:shadow-red-200 text-base "
          />
        </form>

        <ul className="flex gap-5">
          <li>
            <NavLink
              to={"/"}
              className="text-black hover:text-gray-700 duration-300 font-medium "
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/details-item/:id"}
              className="text-black hover:text-gray-700 duration-300 font-medium "
            >
              Details
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/favorites"}
              className="text-black hover:text-gray-700 duration-300 font-medium "
            >
              Favorites
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}
