import styled from "styled-components/macro";

type Padding = { top?: string; right?: string; bottom?: string; left?: string };

export default styled.span`
  display: inline-block;
  padding-top: ${({ padding }: { padding: Padding }) => padding.top};
  padding-right: ${({ padding }: { padding: Padding }) => padding.right};
  padding-bottom: ${({ padding }: { padding: Padding }) => padding.bottom};
  padding-left: ${({ padding }: { padding: Padding }) => padding.left};
`;
