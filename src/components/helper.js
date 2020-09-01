import { Card } from "antd";
import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

export const getPokemonID = (url) => {
  console.log(url);

  const splitUrl = url.split("/");
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
    splitUrl[splitUrl.length - 2]
  }.png`;
};
