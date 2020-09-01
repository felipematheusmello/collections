import { UsergroupDeleteOutlined } from "@ant-design/icons";
import { notification, Input } from "antd";
import React, { useState } from "react";

import CharacterList from "../../characterList/index";
import filterSearch from "../../helper";
const Collection = ({ characters, setCharacters }) => {
  const [inputsSelected, setInputsSelected] = useState(undefined);
  const { Search } = Input;

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
    <>
      <Search
        placeholder="input search text"
        onSearch={(value) => setInputsSelected(value)}
        style={{ width: 200 }}
      />

      <CharacterList
        onSelect={handleOnSelect}
        header="Sua coleção de Cards!"
        characters={
          inputsSelected && inputsSelected !== "all"
            ? filterSearch(characters, inputsSelected)
            : characters
        }
      />
    </>
  );
};

export default Collection;
