import { Button } from "antd";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { BsPeopleFill } from "react-icons/bs";
import { MdCollections } from "react-icons/md";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import styled from "styled-components";

import PokemonList from "./components/characters/pokemon";
import RickAndMorty from "./components/characters/rickAndMorty";
import Collection from "./components/home/collection";

function App() {
  const [characters, setCharacters] = useState([]);
  const [list, setList] = useState("rickList");

  const history = useHistory();
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
              <BsPeopleFill />
            </StyledLink>
          </motion.div>
        </TobBarLinks>
      </TopBar>

      <Body>
        <Button type="primary" onClick={changeList}>
          Change List
        </Button>
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
  background-color: white;
  width: 100%;
  position: fixed;
  top: 0;
  padding: 5px;
  z-index: 10;
`;

const Body = styled.div`
  margin-top: 38px;
  font-size: 20px;
  background-color: rgb(18, 20, 21);
`;

const StyledLink = styled(Link)`
  margin: 30px;
`;
