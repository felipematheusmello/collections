import React, { useEffect } from "react";
import axios from "axios";
import { useParams, Link, useHistory } from "react-router-dom";
import CharacterList from "../../characterList";
import styled from "styled-components";

const RickAndMorty = ({ setRickAndMorty, rickAndMorty }) => {
  const { page } = useParams();
  const history = useHistory();

  const handleOnSelect = (newCharacter) => {
    setRickAndMorty((prevState) =>
      prevState.find(({ name }) => name === newCharacter.name)
        ? prevState
        : [...prevState, newCharacter]
    );
  };

  useEffect(() => {
    if (page < 1) return history.push("/rick-and-morty/1");
    axios
      .get(`https://rickandmortyapi.com/api/character/?page=${page}`)
      .then(({ data }) => console.log(data.results));
  }, [history, page, setRickAndMorty]);

  return (
    <CharacterList
      onSelect={handleOnSelect}
      characters={rickAndMorty}
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

export default RickAndMorty;

const StyledControl = styled.div`
  padding: 10px;
  max-width: 500px;
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
