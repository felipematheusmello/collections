import React, { useEffect } from "react";
import axios from "axios";
import { useParams, Link, useHistory } from "react-router-dom";

const RickAndMorthy = ({ setCharacters }) => {
  const { page } = useParams();
  const history = useHistory();

  const handleOnSelect = (newCharacter) => {
    setCharacters((prevState) =>
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
  }, [history, page, setCharacters]);

  return <div>Rick and Morthy</div>;
};

export default RickAndMorthy;
