import styled, { keyframes } from "styled-components";
import type { InternalRenderProps } from "../types";

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
`;

const rotateBall = (props: any) => keyframes`
  ${(((props.size / 2 / props.countBalls) * (props.index - 1)) / props.size) * 100}% {
    opacity: 0;
  }
  ${(((props.size / 2 / props.countBalls + 0.0001) * (props.index - 1)) / props.size) * 100}% {
    opacity: 1;
    transform: rotate(${0 - (360 / props.countBalls) * (props.index - 2)}deg);
  }
  ${(((props.size / 2 / props.countBalls) * (props.index - 0) + 2) / props.size) * 100}% {
    transform: rotate(${0 - (360 / props.countBalls) * (props.index - 1)}deg);
  }
  ${((props.size / 2 + (props.size / 2 / props.countBalls) * (props.index - 0) + 2) / props.size) * 100}% {
    transform: rotate(${0 - (360 / props.countBalls) * (props.index - 1)}deg);
  }
  100% {
    transform: rotate(${0 - (360 / props.countBalls) * (props.countBalls - 1)}deg);
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props: any) => `${props.size}px`};
  height: ${(props: any) => `${props.size}px`};
  animation: ${rotate} 3s infinite ease-in;
`;

const Ball = styled.div`
  position: absolute;
  width: ${(props: any) => `${props.size}px`};
  height: ${(props: any) => `${props.size}px`};
  animation: ${(props: any) => rotateBall(props)} 2s infinite linear;
  transform: ${(props: any) => `rotate(${(360 / props.countBalls) * props.index}deg)`};
  opacity: 0;
  &:before {
    content: "";
    position: absolute;
    left: 50%;
    top: 0%;
    width: ${(props: any) => `${props.ballSize}px`};
    height: ${(props: any) => `${props.ballSize}px`};
    background-color: ${(props: any) => `${props.color}`};
    transform: translateX(-50%);
    border-radius: 50%;
  }
`;

export function renderMetro({ size }: InternalRenderProps): React.ReactNode {
  const spinnerSize = size ?? 40;
  const radius = spinnerSize / 2;
  const countBalls = 9;
  const ballSize = spinnerSize / 8;
  const angle = 360 / countBalls;
  const color = "var(--spinner-color, #fff)";
  const balls: React.ReactNode[] = [];
  const offset = ballSize / 2;

  for (let i = 0; i < countBalls; i++) {
    const y = Math.sin(angle * i * (Math.PI / 180)) * radius - offset;
    const x = Math.cos(angle * i * (Math.PI / 180)) * radius - offset;
    balls.push(
      <Ball
        countBalls={countBalls}
        color={color}
        ballSize={ballSize}
        size={spinnerSize}
        x={y}
        y={x}
        key={i.toString()}
        index={i + 1}
      />,
    );
  }

  return <Wrapper size={spinnerSize}>{balls}</Wrapper>;
}