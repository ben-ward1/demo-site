import * as React from "react";
import styled, { css } from "styled-components";

type Message = {
  type: string;
  content: string;
};

interface IProps {
  message: Message;
  important: boolean;
}

const ChatMessageSC = styled.p`
  ${(props) =>
    css`
      color: ${props.theme.color};
      font-weight: ${props.theme.weight};
    `}
`;

export const ChatMessage: React.FC<IProps> = (props) => {
  const theme = {
    color: props.important ? "red" : "black",
    weight: props.important ? "bold" : "normal",
  };

  return (
    <ChatMessageSC theme={theme}>
      {props.message.type === "system" ? (
        <i>{props.message.content}</i>
      ) : (
        <>
          <b>
            {props.message.content.substring(
              0,
              props.message.content.indexOf(":") + 1
            )}
          </b>
          <span>
            {" " +
              props.message.content.substring(
                props.message.content.indexOf(":") + 2,
                props.message.content.length
              )}
          </span>
        </>
      )}
    </ChatMessageSC>
  );
};
