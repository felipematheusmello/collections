import { Button } from "antd";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";
import { IoIosImages, IoIosPie } from "react-icons/io";
import { MdCollections } from "react-icons/md";
import { Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";
import Chart from "./component/";
import PokemonList from "./components/Routes/characters/pokemon";
import RickAndMorty from "./components/Routes/characters/rickAndMorty";
import Collection from "./components/home/collection";

function App() {
  const [characters, setCharacters] = useState([]);
  const [list, setList] = useState("rickList");

  const changeList = () => {
    if (list === "rickList") {
      setList("pokeList");
      console.log(list);
    } else {
      setList("rickList");
      console.log(list);
    }
  };

  return (
    <div className="App">
      <TopBar>
        <TobBarLinks>
          <motion.div whileHover={{ scale: 1.3 }} whileTap={{ scale: 0.8 }}>
            <StyledLink to="/">
              <MdCollections />
            </StyledLink>
          </motion.div>
          <motion.div whileHover={{ scale: 1.3 }} whileTap={{ scale: 0.8 }}>
            <StyledLink to="/characters/1">
              <IoIosImages />
            </StyledLink>
          </motion.div>
          <motion.div whileHover={{ scale: 1.3 }} whileTap={{ scale: 0.8 }}>
            <StyledLink to="/chart">
              <IoIosPie />
            </StyledLink>
          </motion.div>
        </TobBarLinks>
      </TopBar>

      <Body>
        <motion.div initial={{ scale: 0.1 }} animate={{ scale: 1.0 }}>
          <StyleButton type="primary" onClick={changeList}>
            <FaExchangeAlt />
          </StyleButton>
        </motion.div>
        <Switch>
          <Route path="/characters/:page">
            {list === "rickList" && (
              <>
                <RickAndMorty
                  setCharacters={setCharacters}
                  characters={characters}
                />
              </>
            )}
            {list === "pokeList" && (
              <>
                <PokemonList
                  characters={characters}
                  setCharacters={setCharacters}
                />
              </>
            )}
          </Route>
          <Route path="/">
            <Collection characters={characters} setCharacters={setCharacters} />
          </Route>
          <Route path="./chart"></Route>
        </Switch>
      </Body>
    </div>
  );
}

export default App;

const TobBarLinks = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const TopBar = styled.div`
  background-color: #000;
  width: 100%;
  position: fixed;
  top: 0;
  padding: 5px;
  z-index: 10;
`;

const Body = styled.div`
  margin-top: 38px;
  text-align: center;
  font-size: 20px;
`;

const StyledLink = styled(Link)`
  margin: 30px;
`;

const StyleButton = styled(Button)``;
