import styled, { keyframes } from "styled-components";
import type { InternalRenderProps } from "../types";

const motion = (props: any) => keyframes`
  0% {
    opacity: 0;
    border-color: ${props.color};
    transform: rotateX(65deg) rotateY(45deg) translateZ(-${props.size * 1.5}px) scale(0.1);
  }
  40% {
    opacity: 1;
    transform: rotateX(0deg) rotateY(20deg) translateZ(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: rotateX(65deg) rotateY(-45deg) translateZ(-${props.size * 1.5}px) scale(0.1);
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props: any) => `${props.size}px`};
  height: ${(props: any) => `${props.size}px`};
  perspective: 600px;
  transform-style: perserve-3d;
`;

const Ball = styled.div`
  position: absolute;
  width: ${(props: any) => `${props.size / 1.5}px`};
  height: ${(props: any) => `${props.size / 1.5}px`};
  border: ${(props: any) => `${props.size / 5}px`} solid ${(props: any) => props.color};
  border-radius: 50%;
  background-color: transparent;
  transform-style: perserve-3d;
  transform: scale(0) rotateX(60deg);
  opacity: ${(props: any) => 1 - props.index * 0.2};
  animation: ${(props: any) => motion(props)} 3s cubic-bezier(0.67, 0.08, 0.46, 1.5) infinite;
  animation-delay: ${(props: any) => props.index * 200}ms;
`;

export function renderHoop({ size }: InternalRenderProps): React.ReactNode {
  const spinnerSize = size ?? 45;
  const countBallsInLine = 6;
  const color = "var(--spinner-color, #4b4c56)";
  const balls: React.ReactNode[] = [];
  let keyValue = 0;

  for (let i = 0; i < countBallsInLine; i++) {
    balls.push(
      <Ball color={color} size={spinnerSize} key={keyValue.toString()} index={i} />,
    );
    keyValue++;
  }

  return <Wrapper size={spinnerSize}>{balls}</Wrapper>;
}