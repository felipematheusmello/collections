import Collection from "./home/collection";
export const getPokemonID = (url) => {
  const splitUrl = url.split("/");
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
    splitUrl[splitUrl.length - 2]
  }.png`;
};

export { Collection };

const filterSearch = (filtered = [], filter) => {
  return filtered.filter((char) => char.type === filter);
};
export default filterSearch;
