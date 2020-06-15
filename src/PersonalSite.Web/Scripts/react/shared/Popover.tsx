import * as React from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 16rem;
  // position: fixed;
  // top: 46px;
  // right: 47px;
  z-index: 1222;
`;

const Content = styled.div`
  background: green;
  color: white;
  padding: 0.8rem;
  border-radius: 15px 0px 15px 15px;
  box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.5);
`;

const ArrowContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Arrow = styled.div`
  border-width: 1px;
  border-color: green;
  border-style: solid;
  height: 30vh;
  width: 0px;
`;

interface IProps {
  message: string;
  id: string;
}

export const Popover: React.FC<IProps> = (props) => {
  return (
    <Container id={props.id}>
      <ArrowContainer>
        <Arrow />
      </ArrowContainer>
      <Content>{props.message}</Content>
    </Container>
  );
};
