import styled from "styled-components";

const WindowContainer = styled.div`
  position: fixed;
  z-index: 1201;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  width: 30%;
  background: rgb(241, 241, 241);
  padding: 1rem;

  @media (max-width: 1020px) {
    width: 100%;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
`;

const MessageBoard = styled.div`
  height: 72vh;
  background: white;
  padding: 0.5rem;
  overflow-x: hidden;
  overflow-y: auto;

  & > p {
    margin-bottom: 0.5rem;
  }
`;

const UserPanel = styled.div`
  height: 72vh;
  background: rgb(241, 241, 241);
  padding: 0.5rem;
  overflow-x: hidden;
  overflow-y: auto;

  & > p {
    margin-bottom: 0.5rem;
    text-align: right;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const IconContainer = styled.div`
  display: flex;
  width: 2.5rem;
  justify-content: space-between;
`;

export const NameInputControlsContainer = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-self: center;
  height: 50%;
  justify-content: space-around;
`;

export const ChatNameInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
`;

export const RecaptchaContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0.5rem;
`;

const ChatSC = {
  WindowContainer,
  Container,
  MessageBoard,
  UserPanel,
  Header,
  IconContainer,
};

export default ChatSC;
