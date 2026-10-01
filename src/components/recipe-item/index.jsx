import { Link } from "react-router";

export default function RecipeItem({ item }) {
  return (
    <>
      <div
        key={item.id}
        className="flex flex-col w-80 overflow-hidden p-5 bg-white/75 shadow-xl gap-5 border-2 rounded-xl border-white"
      >
        <div className="h-40 flex justify-center overflow-hidden items-center rounded-xl">
          <img
            src={item?.image_url}
            alt="recipe-item"
            className="block w-full"
          />
        </div>

        <div>
          <span className="text-sm text-cyan-700 font-medium">
            {item?.publisher}
          </span>
          <h3 className="font-bold text-2xl truncate text-black">
            {item?.title}
          </h3>
          <Link
            to={`/details-item/${item?.id}`}
            className="text-sm p-2 px-6 uppercase font-medium tracking-wider inline-block shadow-md bg-black text-white mt-2 rounded-xl"
          >
            Recipe Details
          </Link>
        </div>
      </div>
    </>
  );
}
