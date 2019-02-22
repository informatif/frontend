import styled from "styled-components/macro";

export default styled.div`
  align-items: ${({ crossAxisAlignment }: { crossAxisAlignment: string }) =>
    crossAxisAlignment};
  display: flex;
  flex-direction: column;
`;
