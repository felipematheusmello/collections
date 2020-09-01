import { UsergroupAddOutlined, FrownOutlined } from "@ant-design/icons";
import { notification } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import styled from "styled-components";

import CharacterList from "../../characterList";

const PokemonList = ({ characters, setCharacters }) => {
  const [pokemon, setPokemon] = useState([]);
  const { page } = useParams();
  const [pages, setPages] = useState(0);
  const [next, setNext] = useState("");
  const history = useHistory();

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
    if (page < 1) return history.push("/characters/1");
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?offset=${pages}&limit=20`)
      .then(({ data }) => {
        const { results, next } = data;
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
          <Link
            onClick={() => {
              if (pages < 0) {
                setPages(0);
              } else {
                setPages(pages - 20);
              }
            }}
            to={`/characters/${page - 1}`}
          >
            {" < "}Anterior
          </Link>
          {page}
          <Link
            onClick={() => {
              if (next) setPages(pages + 20);
            }}
            to={`/characters/${parseInt(page) + 1}`}
          >
            Próximo
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
