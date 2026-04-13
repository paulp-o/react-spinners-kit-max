import styled, { keyframes } from "styled-components";
import type { InternalRenderProps } from "../types";

const trace = (props: any) => keyframes`
  0% {
    border: ${props.size / 10}px solid ${props.backColor};
  }
  25% {
    border: ${props.size / 10}px solid ${props.frontColor};
  }
  50% {
    border: ${props.size / 10}px solid ${props.backColor};
  }
  100% {
    border: ${props.size / 10}px solid ${props.backColor};
  }
`;

const motion = (props: any) => keyframes`
  25% {
    transform: translate(${props.size / 2 + props.size / 10}px, 0);
  }
  50% {
    transform: translate(${props.size / 2 + props.size / 10}px, ${props.size / 2 + props.size / 10}px);
  }
  75% {
    transform: translate(0, ${props.size / 2 + props.size / 10}px);
  }
  100% {
    transform: translate(0, 0);
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props: any) => `${props.size}px`};
  height: ${(props: any) => `${props.size}px`};
  transform: rotate(45deg);
`;

const Ball = styled.div`
  position: absolute;
  top: ${(props: any) => `${props.y}px`};
  left: ${(props: any) => `${props.x}px`};
  width: ${(props: any) => `${props.size / 5}px`};
  height: ${(props: any) => `${props.size / 5}px`};
  border-radius: 50%;
  background-color: transparent;
  border: ${(props: any) => `${props.size / 10}px`} solid ${(props: any) => props.backColor};
  animation: ${(props: any) => trace(props)} 4s cubic-bezier(0.75, 0, 0.5, 1) infinite normal;
  animation-delay: ${(props: any) => props.index * 1}s;
`;

const MovedBall = styled(Ball)`
  top: 0;
  left: 0;
  border-color: ${(props: any) => props.frontColor};
  background-color: ${(props: any) => props.frontColor};
  animation: ${(props: any) => motion(props)} 4s cubic-bezier(0.75, 0, 0.5, 1) infinite;
  z-index: 10;
`;

export function renderTrace({ size }: InternalRenderProps): React.ReactNode {
  const spinnerSize = size ?? 35;
  const countBalls = 4;
  const frontColor = "var(--spinner-color, #00ff89)";
  const backColor = "var(--spinner-secondary-color, #4b4c56)";
  const balls: React.ReactNode[] = [];
  const indexes = [0, 1, 3, 2];
  let counter = 0;

  for (let i = 0; i < countBalls / 2; i++) {
    for (let j = 0; j < countBalls / 2; j++) {
      balls.push(
        <Ball
          frontColor={frontColor}
          backColor={backColor}
          size={spinnerSize}
          x={j * (spinnerSize / 2 + spinnerSize / 10)}
          y={i * (spinnerSize / 2 + spinnerSize / 10)}
          key={indexes[counter].toString()}
          index={indexes[counter]}
        />,
      );
      counter++;
    }
  }

  return (
    <Wrapper size={spinnerSize}>
      {balls}
      <MovedBall frontColor={frontColor} backColor={backColor} size={spinnerSize} />
    </Wrapper>
  );
}