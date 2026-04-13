import styled, { keyframes } from "styled-components";
import type { InternalRenderProps } from "../types";

const motionPlayer = (props: any) => keyframes`
  0% {
    top: ${props.left ? 0 : props.size / 3.5}px;
  }
  50% {
    top: ${props.left ? props.size / 3.5 : 0}px;
  }
  100% {
    top: ${props.left ? 0 : props.size / 3.5}px;
  }
`;

const motionBall = (props: any) => keyframes`
  0% {
    top: ${props.size / 3.5 - props.size / 8}px;
    left: ${props.size / 12}px;
  }
  25% {
    top: ${props.size / 3.5}px;
    left: ${props.size - props.size / 8}px;
  }
  50% {
    top: ${props.size / 1.75 - props.size / 8}px;
    left: ${props.size / 12}px;
  }
  75% {
    top: ${props.size / 3.5}px;
    left: ${props.size - props.size / 8}px;
  }
  100% {
    top: ${props.size / 3.5 - props.size / 8}px;
    left: ${props.size / 12}px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  width: ${(props: any) => `${props.size}px`};
  height: ${(props: any) => `${props.size / 1.75}px`};
`;

const Ball = styled.div`
  position: absolute;
  width: ${(props: any) => `${props.size / 8}px`};
  height: ${(props: any) => `${props.size / 8}px`};
  border-radius: 50%;
  background-color: ${(props: any) => props.color};
  animation: ${(props: any) => motionBall(props)} 2s linear infinite;
`;

const Player = styled.div`
  position: absolute;
  width: ${(props: any) => `${props.size / 12}px`};
  height: ${(props: any) => `${props.size / 3}px`};
  background-color: ${(props: any) => props.color};
  left: ${(props: any) => (props.left ? 0 : props.size)};
  right: ${(props: any) => (props.right ? 0 : props.size)};
  border-radius: 4px;
  animation: ${(props: any) => motionPlayer(props)} 2s linear infinite;
`;

export function renderPong({ size }: InternalRenderProps): React.ReactNode {
  const spinnerSize = size ?? 60;
  const color = "var(--spinner-color, #4b4c56)";

  return (
    <Wrapper size={spinnerSize}>
      <Player left color={color} size={spinnerSize} />
      <Ball color={color} size={spinnerSize} />
      <Player right color={color} size={spinnerSize} />
    </Wrapper>
  );
}