import { Card } from "antd";
import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

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
