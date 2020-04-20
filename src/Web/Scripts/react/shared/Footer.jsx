import styled from "styled-components";

// BEWARE: This works for now because there is sufficient padding on the bottom of #app to
//         accomodate the layout footer + a single line of text in this footer. Adding
//         something with sufficient height inside of this footer will cause it to bleed
//         into #app.
// TODO: Move the layout footer into a react footer if there is a need to put sufficiently
//       complex content into this component.
const Footer = styled.div`
  position: absolute;
  bottom: 6em;
  width: 100%;
  left: 0;
  padding: 0 1.5rem;
`;

export default Footer;
