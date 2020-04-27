import React from "react";
import {
  BlogContainer,
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
      <BlogContainer>
        {entries.map((e, index) => (
          <EntryContainer key={index} index={index} className="entry-container">
            <EntryContent index={index}>
              <EntryHeader>{e.title}</EntryHeader>
              <EntryItem>{e.content}</EntryItem>
            </EntryContent>
          </EntryContainer>
        ))}
      </BlogContainer>
    );
  }
}

export default Blog;
