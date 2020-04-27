import React from "react";
import {
  BlogContainer,
  MainEntryContainer,
  MainHeaderContainer,
  MainEntryContent,
  EntryContainer,
  EntryContent,
  EntryHeader,
  EntryItem,
} from "./BlogStyledComponents";

class Blog extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { entries } = this.props;
    return (
      <React.Fragment>
        <MainEntryContainer>
          <MainHeaderContainer>
            <EntryHeader>Hi, I'm Ben. Nice to meet you.</EntryHeader>
            <img src="../../../Content/img/me.JPG" />
          </MainHeaderContainer>
          <MainEntryContent>
            <EntryItem>Welcome to my website.</EntryItem>
          </MainEntryContent>
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
        </BlogContainer>
      </React.Fragment>
    );
  }
}

export default Blog;
