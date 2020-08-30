import React from "react";
import CharacterList from "../../characterList";

const Home = ({ characters, setCharacters }) => {
  const handleOnSelect = ({ name }) => {
    setCharacters(characters.filter((character) => character.name !== name));
  };

  return (
    <CharacterList
      onSelect={handleOnSelect}
      header="Sua coleção de Cards!"
      characters={characters}
    />
  );
};

export default Home;
