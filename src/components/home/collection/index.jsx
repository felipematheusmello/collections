import { UsergroupDeleteOutlined } from "@ant-design/icons";
import { notification } from "antd";
import React from "react";

import CharacterList from "../../characterList";
const Collection = ({ characters, setCharacters }) => {
  const handleOnSelect = ({ name }) => {
    notification.success({
      key: name,
      message: "Nice!",
      description: `Personagem ${name} removido!`,
      icon: <UsergroupDeleteOutlined style={{ color: "green" }} />,
    });
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

export default Collection;
