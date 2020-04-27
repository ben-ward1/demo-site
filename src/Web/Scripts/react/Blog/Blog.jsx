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
  StyleAccent,
} from "./BlogStyledComponents";

class Blog extends React.Component {
  constructor(props) {
    super(props);

    this.groupEntries = this.groupEntries.bind(this);
  }

  groupEntries() {
    const { entries } = this.props;
    const grouped = [];

    for (let i = 0; i < entries.length; i = i + 2) {
      grouped.push([entries[i], entries[i + 1]]);
    }

    return grouped;
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
