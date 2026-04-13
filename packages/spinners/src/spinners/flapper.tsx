import styled, { keyframes } from "styled-components";
import type { InternalRenderProps } from "../types";

const move = (props: any) => keyframes`
  100% {
    opacity: 0;
    transform: translateX(${props.x}px)
      translateY(${props.y}px) scale(1);
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props: any) => `${props.size}px`};
  height: ${(props: any) => `${props.size}px`};
`;

const Ball = styled.div`
  position: absolute;
  top: ${(props: any) => `${props.size / 2}px`};
  left: ${(props: any) => `${props.size / 2}px`};
  width: ${(props: any) => `${props.ballSize}px`};
  height: ${(props: any) => `${props.ballSize}px`};
  border-radius: 50%;
  background-color: ${(props: any) => props.color};
  transform: translateX(${(props: any) => `${props.x}px`})
    translateY(${(props: any) => `${props.y}px`}) scale(0);
  animation: ${(props: any) => move(props)} 0.8s linear infinite;
  animation-delay: ${(props: any) => props.index * 0.1}s;
`;

export function renderFlapper({ size }: InternalRenderProps): React.ReactNode {
  const spinnerSize = size ?? 30;
  const radius = spinnerSize / 2;
  const countBalls = 7;
  const ballSize = spinnerSize / 1.5;
  const angle = 360 / countBalls;
  const color = "var(--spinner-color, #00ff89)";
  const balls: React.ReactNode[] = [];
  const offset = ballSize / 2;

  for (let i = 0; i < countBalls; i++) {
    const y = Math.sin(angle * i * (Math.PI / 180)) * radius - offset;
    const x = Math.cos(angle * i * (Math.PI / 180)) * radius - offset;
    balls.push(
      <Ball
        color={color}
        ballSize={ballSize}
        size={spinnerSize}
        x={y}
        y={x}
        key={i.toString()}
        index={i}
      />,
    );
  }

  return <Wrapper size={spinnerSize}>{balls}</Wrapper>;
}