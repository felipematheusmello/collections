import { UsergroupAddOutlined, FrownOutlined } from "@ant-design/icons";
import { notification } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

import CharacterList from "../../characterList";

const PokemonList = ({ characters, setCharacters }) => {
  const [pokemon, setPokemon] = useState([]);
  const { page } = useParams();
  const handleOnSelect = (newCharacter = []) => {
    console.log(characters);
    if (characters) {
      const alreadyAdd = characters.some(
        ({ name }) => name === newCharacter.name
      );

      if (alreadyAdd) {
        return notification.error({
          key: newCharacter.name,
          message: "Erro",
          description: `Pokemon ${newCharacter.name} já foi adicionado!`,
          icon: <FrownOutlined style={{ color: "green" }} />,
        });
      }

      notification.success({
        key: newCharacter.name,
        message: "Boa!",
        description: `Pokemon ${newCharacter.name} adicionado!`,
        icon: <UsergroupAddOutlined style={{ color: "green" }} />,
      });

      setCharacters([...characters, newCharacter]);
    }
  };

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20")
      .then(({ data }) => {
        const { results } = data;
        setPokemon(results || []);
      });
  }, [setPokemon]);

  return (
    <CharacterList
      onSelect={handleOnSelect}
      characters={pokemon}
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

export default PokemonList;

const StyledControl = styled.div`
  padding: 10px;
  max-width: 500px;
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
