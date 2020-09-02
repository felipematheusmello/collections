import { Button } from "antd";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";
import { IoIosImages, IoIosPie } from "react-icons/io";
import { MdCollections } from "react-icons/md";
import { Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";

import { Collection } from "./components/helper";
import PokemonList from "./components/routes/pages/characters/pokemon";
import RickAndMorty from "./components/routes/pages/characters/rickAndMorty";
import Chart from "./components/routes/pages/chart";

function App() {
  let retrievedObject = localStorage.getItem("characterList");
  retrievedObject = ("retrievedObject: ", JSON.parse(retrievedObject));
  const [characters, setCharacters] = useState(
    retrievedObject !== null ? retrievedObject : []
  );
  const [list, setList] = useState("rickList");
  const [typeChart, setTypeChart] = useState([{}]);

  const changeList = () => {
    if (list === "rickList") {
      setList("pokeList");
    } else {
      setList("rickList");
    }
  };
  localStorage.setItem("characterList", JSON.stringify(characters));
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
          <Route path="/chart">
            <Chart characters={characters} />
          </Route>
          <Route path="/characters/:page">
            {list === "rickList" && (
              <>
                <RickAndMorty
                  setCharacters={setCharacters}
                  setTypeChart={setTypeChart}
                  typeChart={typeChart}
                  characters={characters}
                />
              </>
            )}
            {list === "pokeList" && (
              <>
                <PokemonList
                  characters={characters}
                  setTypeChart={setTypeChart}
                  setCharacters={setCharacters}
                />
              </>
            )}
          </Route>

          <Route exact path="/">
            <Collection characters={characters} setCharacters={setCharacters} />
          </Route>
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
