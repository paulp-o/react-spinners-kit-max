import styled, { keyframes } from "styled-components";
import type { InternalRenderProps } from "../types";

const rotate = () => keyframes`
  0% {
    border-width: 10px;
  }
  25% {
    border-width: 3px;
  }
  50% {
    transform: rotate(115deg);
    border-width: 10px;
  }
  75% {
    border-width: 3px;
  }
  100% {
    border-width: 10px;
  }
`;

const Wrapper = styled.div`
  width: ${(props: any) => `${props.size}px`};
  height: ${(props: any) => `${props.size / 2}px`};
  overflow: hidden;
`;

const Line = styled.div`
  width: ${(props: any) => `${props.size}px`};
  height: ${(props: any) => `${props.size}px`};
  border-radius: 50%;
  border-style: solid;
  border-top-color: ${(props: any) => props.color};
  border-right-color: ${(props: any) => props.color};
  border-left-color: transparent;
  border-bottom-color: transparent;
  box-sizing: border-box;
  transform: rotate(-200deg);
  animation: ${rotate} 3s ease-in-out infinite;
`;

export function renderRainbow({ size }: InternalRenderProps): React.ReactNode {
  const spinnerSize = size ?? 50;
  const color = "var(--spinner-color, #fff)";

  return (
    <Wrapper size={spinnerSize}>
      <Line size={spinnerSize} color={color} />
    </Wrapper>
  );
}