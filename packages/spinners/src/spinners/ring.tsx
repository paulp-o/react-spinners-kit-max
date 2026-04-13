import styled, { keyframes } from "styled-components";
import type { InternalRenderProps } from "../types";

const firstPulse = (props: any) => keyframes`
  0% {
    box-shadow: inset 0 0 0 ${props.size / 10}px ${props.color};
    opacity: 1;
  }
  50%, 100% {
    box-shadow: inset 0 0 0 0 ${props.color};
    opacity: 0;
  }
`;

const secondPulse = (props: any) => keyframes`
  0%, 50% {
    box-shadow: inset 0 0 0 0 ${props.color};
    opacity: 0;
  }
  100% {
    box-shadow: inset 0 0 0 ${props.size / 10}px ${props.color};
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  width: ${(props: any) => `${props.size}px`};
  height: ${(props: any) => `${props.size}px`};
`;

const Circle = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 100%;
  height: 100%;
  &:before,
  &:after {
    width: 100%;
    height: 100%;
    content: "";
    position: absolute;
    border-radius: 50%;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
  }
  &:before {
    box-shadow: ${(props: any) => `inset 0 0 0 ${props.size / 10}px ${props.color}`};
    animation-name: ${firstPulse};
  }
  &:after {
    box-shadow: 0 0 0 0 ${(props: any) => props.color};
    animation-name: ${secondPulse};
  }
`;

export function renderRing({ size }: InternalRenderProps): React.ReactNode {
  const spinnerSize = size ?? 30;
  const color = "var(--spinner-color, #00ff89)";

  return (
    <Wrapper size={spinnerSize}>
      <Circle size={spinnerSize} color={color} />
    </Wrapper>
  );
}