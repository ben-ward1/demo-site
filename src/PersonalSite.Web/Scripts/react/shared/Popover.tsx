import * as React from "react";
import styled, { css } from "styled-components";

const Container = styled.div`
  max-width: 16rem;
  z-index: 1222;
`;

const Content = styled.div`
  padding: 0.8rem;
  border-radius: 15px 0px 15px 15px;
  box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.5);

  ${(props) =>
    css`
      background: ${props.color};
      color: ${props.color === "lightgray" ? "black" : "white"};
    `}
`;

const ArrowContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Arrow = styled.div`
  border-width: 1px;
  border-style: solid;
  height: 30vh;
  width: 0px;

  ${(props) =>
    css`
      border-color: ${props.color};
    `}
`;

interface IProps {
  message: string;
  id: string;
  active: boolean;
}

export const Popover: React.FC<IProps> = (props) => {
  const color = props.active ? "green" : "lightgray";

  return (
    <Container id={props.id}>
      <ArrowContainer>
        <Arrow color={color} />
      </ArrowContainer>
      <Content color={color}>{props.message}</Content>
    </Container>
  );
};
