import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useHistory } from "react-router-dom";
import CharacterList from "../../characterList";
import styled from "styled-components";
import { notification } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";

const RickAndMorty = ({ setCharacters, characters }) => {
  const [rickAndMorty, setRickAndMorty] = useState([]);
  const { page } = useParams();
  const history = useHistory();

  const openNotification = (message, description, fig) => {
    notification.open({
      message: { message },
      description: { description },
      icon: { fig },
    });
  };

  const handleOnSelect = (newCharacter) => {
    const alreadyAdd = characters.some(
      ({ name }) => name === newCharacter.name
    );

    if (alreadyAdd) {
      return notification.error({
        key: newCharacter.name,
        message: "Erro",
        description: "Personagem já foi adicionado!",
        icon: <FrownOutlined style={{ color: "green" }} />,
      });
    }

    notification.success({
      key: newCharacter.name,
      message: "Boa!",
      description: "Personagem adicionado!",
      icon: <SmileOutlined style={{ color: "green" }} />,
    });

    setCharacters([...characters, newCharacter]);
  };

  useEffect(() => {
    if (page < 1) return history.push("/rick-and-morty/1");
    axios
      .get(`https://rickandmortyapi.com/api/character/?page=${page}`)
      .then(({ data }) => setRickAndMorty(data.results || []));
  }, [history, page, setCharacters]);

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
