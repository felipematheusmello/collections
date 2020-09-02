import { UsergroupAddOutlined, FrownOutlined } from "@ant-design/icons";
import { notification } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import styled from "styled-components";

import CharacterList from "../../../../characterList";
const RickAndMorty = ({
  setCharacters,
  characters,
  setTypeChart,
  typeChart,
}) => {
  const [rickAndMorty, setRickAndMorty] = useState([]);
  const { page } = useParams();
  const history = useHistory();

  const handleOnSelect = (newCharacter = []) => {
    const alreadyAdd = characters.some(
      ({ name }) => name === newCharacter.name
    );

    if (alreadyAdd) {
      return notification.error({
        key: newCharacter.name,
        message: "Erro",
        description: `Personagem ${newCharacter.name} já foi adicionado!`,
        icon: <FrownOutlined style={{ color: "green" }} />,
      });
    }

    notification.success({
      key: newCharacter.name,
      message: "Boa!",
      description: `Personagem ${newCharacter.name} adicionado!`,
      icon: <UsergroupAddOutlined style={{ color: "green" }} />,
    });

    setCharacters([...characters, newCharacter]);
  };
  const openNotification = (message, description, fig) => {
    notification.open({
      message: { message },
      description: { description },
      icon: { fig },
    });
  };

  useEffect(() => {
    if (page < 1) return history.push("/characters/1");
    axios
      .get(`https://rickandmortyapi.com/api/character/?page=${page}`)
      .then(({ data }) => {
        data.results.map((rick) => {
          rick.type = "Rick and Morty";
        });
        setRickAndMorty(data.results || []);
      });
  }, [history, page]);

  return (
    <CharacterList
      setTypeChart={setTypeChart}
      typeChart={typeChart}
      onSelect={handleOnSelect}
      characters={rickAndMorty}
      header={
        <StyledControl>
          <Link to={`/characters/${page - 1}`}> {" < "}Anterior</Link>
          {page}
          <Link to={`/characters/${parseInt(page) + 1}`}>Próximo{" > "}</Link>
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
