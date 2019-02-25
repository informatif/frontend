import styled from "styled-components/macro";

type Props = { margin?: Margin; padding?: Padding };
type Margin = { top?: string; right?: string; bottom?: string; left?: string };
type Padding = Margin;

export default styled.div`
  margin-bottom: ${({ margin = {} }: Props) => margin.bottom};
  margin-left: ${({ margin = {} }: Props) => margin.left};
  margin-right: ${({ margin = {} }: Props) => margin.right};
  margin-top: ${({ margin = {} }: Props) => margin.top};
  padding-bottom: ${({ padding = {} }: Props) => padding.bottom};
  padding-left: ${({ padding = {} }: Props) => padding.left};
  padding-right: ${({ padding = {} }: Props) => padding.right};
  padding-top: ${({ padding = {} }: Props) => padding.top};
`;
