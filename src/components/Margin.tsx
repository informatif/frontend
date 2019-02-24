import styled from "styled-components/macro";

type Margin = { top?: string; right?: string; bottom?: string; left?: string };

export default styled.div`
  margin-top: ${({ margin }: { margin: Margin }) => margin.top};
  margin-right: ${({ margin }: { margin: Margin }) => margin.right};
  margin-bottom: ${({ margin }: { margin: Margin }) => margin.bottom};
  margin-left: ${({ margin }: { margin: Margin }) => margin.left};
`;
