import { UsergroupAddOutlined, FrownOutlined } from "@ant-design/icons";
import { notification } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import styled from "styled-components";

import CharacterList from "../../../characterList";

const PokemonList = ({ characters, setCharacters }) => {
  const [pokemon, setPokemon] = useState([]);
  const { page } = useParams();
  const [pages, setPages] = useState(0);
  const [next, setNext] = useState("");
  const history = useHistory();

  const EndPointConstructor = (pagination) => {
    return `https://pokeapi.co/api/v2/pokemon?offset=
      ${20 * (pagination - 1)} 
      "&limit=20`;
  };

  const handleOnSelect = (newCharacter = []) => {
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
  };

  useEffect(() => {
    if (page < 1) return history.push("/characters/1");
    axios.get(EndPointConstructor(page)).then(({ data }) => {
      const { results, next } = data;
      results.map((pokemon) => {
        pokemon.type = "Pokemon";
      });
      setPokemon(results || []);
      setNext(next);
    });
  }, [setPokemon, page, history]);
  return (
    <CharacterList
      onSelect={handleOnSelect}
      characters={pokemon}
      header={
        <StyledControl>
          <Link to={`/characters/${page - 1}`}>{" < "}Anterior</Link>
          {page}
          <Link to={`/characters/${parseInt(page) + 1}`}>Próximo</Link>
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
