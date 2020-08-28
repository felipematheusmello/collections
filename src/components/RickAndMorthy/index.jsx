import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import styled from "styled-components";

import CharacterList from "../../components/character-list";

const Characters = ({ setCharacters }) => {
  const { page } = useParams();
  const history = useHistory();
  const [characters, setCharactersAPI] = useState([]);

  const handleOnSelect = (newCharacter) => {
    setCharacters((prevState) =>
      prevState.find(({ name }) => name === newCharacter.name)
        ? prevState
        : [...prevState, newCharacter]
    );
  };

  useEffect(() => {
    if (page < 1) return history.push("/rick-and-morty/1");

    fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
      .then((res) => res.json())
      .then(({ results }) => setCharactersAPI(results || []));
  }, [history, page, setCharacters]);

  return (
    <CharacterList
      onSelect={handleOnSelect}
      characters={characters}
      header={
        <StyledControl>
          <Link to={`/rick-and-morty/${page - 1}`}> {" < "}Anterior</Link>
          {page}
          <Link to={`/rick-and-morty/${parseInt(page) + 1}`}>
            Próximo{" > "}
          </Link>
        </StyledControl>
      }
    />
  );
};

export default Characters;

const StyledControl = styled.div`
  padding: 10px;
  max-width: 500px;
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
