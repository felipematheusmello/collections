import React, { useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import RickAndMorty from "./components/characters/rickAndMorty";
import Collection from "./components/home/collection";
import { MdCollections } from "react-icons/md";
import { BsPeopleFill } from "react-icons/bs";
import styled from "styled-components";

function App() {
  const [characters, setCharacters] = useState([]);
  const [pokemon, setPokemon] = useState([]);

  return (
    <div className="App">
      <TopBar>
        <StyledLink to="/">
          <MdCollections />
        </StyledLink>
        <StyledLink to="/rick-and-morty/1">
          <BsPeopleFill />
        </StyledLink>
      </TopBar>

      <Body>
        <Switch>
          <Route path="/rick-and-morty/:page">
            <RickAndMorty
              setCharacters={setCharacters}
              characters={characters}
            />
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
`;

const StyledLink = styled(Link)`
  margin: 30px;
`;
