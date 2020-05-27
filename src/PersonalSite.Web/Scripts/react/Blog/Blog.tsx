import * as React from "react";
import {
  BlogContainer,
  MainEntryContainer,
  MainHeaderContainer,
  MainEntryContent,
  EntryContainer,
  EntryContent,
  EntryHeader,
  EntryItem,
  StyleAccent,
} from "./BlogStyledComponents";

type blogItem = {
  title: string;
  content: string;
};

interface IProps {
  entries: Array<blogItem>;
}

class Blog extends React.Component<IProps, {}> {
  canWebp: boolean;

  constructor(props) {
    super(props);

    this.canWebp = window.Modernizr.webp;
  }

  render() {
    const { entries } = this.props;

    return (
      <React.Fragment>
        <MainEntryContainer>
          <MainHeaderContainer>
            <EntryHeader>Hi, I'm Ben. Nice to meet you.</EntryHeader>
            <img
              src={`../../../Content/img/me-small.${
                this.canWebp ? "webp" : "JPG"
              }`}
            />
          </MainHeaderContainer>
          <MainEntryContent>
            <EntryItem>Welcome to my website.</EntryItem>
          </MainEntryContent>
          <StyleAccent index={0} />
        </MainEntryContainer>
        <BlogContainer>
          {entries.map((e, index) => (
            <EntryContainer
              key={index}
              index={index}
              className="entry-container"
            >
              <EntryContent index={index}>
                <EntryHeader>{e.title}</EntryHeader>
                <EntryItem>{e.content}</EntryItem>
              </EntryContent>
            </EntryContainer>
          ))}
          <StyleAccent index={1} />
          <StyleAccent index={2} />
        </BlogContainer>
      </React.Fragment>
    );
  }
}

export default Blog;
