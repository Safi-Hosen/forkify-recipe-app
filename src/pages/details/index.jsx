import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { GlobalContext } from "../../context";

export default function Details() {
  const { id } = useParams();
  const {
    recipeDetailsData,
    setRecipeDetailsData,
    handleAddToFavorite,
    favoritesList,
  } = useContext(GlobalContext);
  // console.log(params);

  useEffect(() => {
    async function getRecipeDetails() {
      const response = await fetch(
        `https://forkify-api.jonas.io/api/v2/recipes/${id}`,
      );
      const data = await response.json();
      console.log(data);
      if (data?.data) {
        setRecipeDetailsData(data?.data);
      }
    }
    getRecipeDetails();
  }, []);
  return (
    <>
      <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="row-start-1 lg:row-start-auto">
          <div className="h-96 overflow-hidden rounded-xl group">
            <img
              src={recipeDetailsData?.recipe?.image_url}
              alt="image-recipe"
              className="w-full h-full object-cover block group-hover:scale-105 duration-300"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-sm text-cyan-700 font-medium">
            {recipeDetailsData?.recipe?.publisher}
          </span>
          <h3 className="font-bold text-2xl truncate text-black">
            {recipeDetailsData?.recipe?.title}
          </h3>
          <div>
            <button
              onClick={() => handleAddToFavorite(recipeDetailsData?.recipe)}
              className="text-sm p-2 px-6 uppercase font-bold tracking-wider inline-block shadow-md bg-black text-white mt-2 rounded-xl cursor-pointer"
            >
              {favoritesList &&
              favoritesList.length > 0 &&
              favoritesList.findIndex(
                (item) => item.id === recipeDetailsData?.recipe?.id,
              ) !== -1
                ? "Remove From Favorites"
                : "Add to Favorites"}
            </button>
          </div>

          <div>
            <span className="text-3xl font-semibold text-amber-600 inline-block mb-4">
              Recipe Ingredients:
            </span>
            <ul className="flex flex-col">
              {recipeDetailsData?.recipe?.ingredients.map(
                (ingredient, index) => (
                  <li key={index} className="font-medium text-md text-black">
                    <span>
                      {ingredient.quantity} {ingredient.unit}
                    </span>
                    <span>{ingredient.description}</span>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
