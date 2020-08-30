import React from "react";
import { Card } from "antd";
import { motion } from "framer-motion";
import styled from "styled-components";

const CharacterList = ({ characters, header, onSelect = () => {} }) => {
  return (
    <StyledCharacter initial={{ scale: 0.1 }} animate={{ scale: 1.0 }}>
      <StyledHeader>{header}</StyledHeader>
      <StyledList>
        {characters &&
          characters.map(({ name, image, species }, key) => (
            <StyledCard
              key={key}
              hoverable
              onClick={() => {
                onSelect({ name, image, species });
              }}
              cover={<img alt="example" src={image} />}
            >
              <Card.Meta title={name} description={species} />
            </StyledCard>
          ))}
      </StyledList>
    </StyledCharacter>
  );
};

export default CharacterList;

const StyledHeader = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const StyledCharacter = styled(motion.div)`
  display: flex;
  padding: 20px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledCard = styled(Card)`
  margin: 10px;
  width: 240px;
  height: 324px;
`;

const StyledList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
