import { createContext, useState } from "react";
import { useNavigate } from "react-router";
import useLocalStorage from "../hooks/useLocalStorage";

export const GlobalContext = createContext(null);
// console.log(GlobalContext)

export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeDetailsData, setRecipeDetailsData] = useState(null);

  const [favoritesList, setFavoritesList] = useLocalStorage("favorites", []);
  const [recipeList, setRecipeList] = useLocalStorage("recipeList", []);
  const [lastSearch, setLastSearch] = useLocalStorage("lastSearch", "");

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setSearchParam("");
    try {
      const res = await fetch(
        `https://forkify-api.jonas.io/api/v2/recipes?search=${searchParam}`,
      );

      const data = await res.json();
      if (data?.data?.recipes) {
        setRecipeList(data?.data?.recipes);
        setLoading(false);
        setSearchParam("");
        navigate("/");
      }

      console.log(data);
    } catch (e) {
      setLoading(false);
      setSearchParam("");
      console.log(e);
    }
  }

  function handleAddToFavorite(getCurrentItem) {
    let copyFavoritesList = [...favoritesList];
    const index = copyFavoritesList.findIndex(
      (item) => item.id === getCurrentItem.id,
    );

    if (index === -1) {
      copyFavoritesList.push(getCurrentItem);
    } else {
      copyFavoritesList.splice(index, 1);
    }

    setFavoritesList(copyFavoritesList);
  }

  // console.log(favoritesList, setFavoritesList);

  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        setSearchParam,
        handleSubmit,
        loading,
        recipeList,
        recipeDetailsData,
        setRecipeDetailsData,
        handleAddToFavorite,
        favoritesList,
        lastSearch,
        setLastSearch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
