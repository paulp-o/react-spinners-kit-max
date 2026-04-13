import styled, { keyframes } from "styled-components";
import type { InternalRenderProps } from "../types";

const motion = (props: any) => keyframes`
  0% {
    transform: scale(1, 1);
    opacity: 1;
    background-color: ${props.backColor};
  }
  100% {
    transform: scale(0, 0);
    opacity: 0;
    background-color: ${props.frontColor};
  }
`;

const spin = () => keyframes`
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(90deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(270deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.div`
  position: relative;
  width: ${(props: any) => `${props.size}px`};
  height: ${(props: any) => `${props.size}px`};
  animation: ${spin} 10s infinite;
`;

const Ball = styled.div`
  float: left;
  clear: right;
  margin: ${(props: any) => `${props.size / 15}px`};
  width: ${(props: any) => `${props.size / 5}px`};
  height: ${(props: any) => `${props.size / 5}px`};
  border-radius: 2px;
  background-color: ${(props: any) => props.frontColor};
  animation-name: ${motion};
  animation-direction: alternate;
  animation-duration: 800ms;
  animation-iteration-count: infinite;
  &:nth-child(1) {
    animation-delay: 200ms;
  }
  &:nth-child(2) {
    animation-delay: 400ms;
  }
  &:nth-child(3) {
    animation-delay: 600ms;
  }
  &:nth-child(4) {
    animation-delay: 400ms;
  }
  &:nth-child(5) {
    animation-delay: 600ms;
  }
  &:nth-child(6) {
    animation-delay: 800ms;
  }
  &:nth-child(7) {
    animation-delay: 600ms;
  }
  &:nth-child(8) {
    animation-delay: 800ms;
  }
  &:nth-child(9) {
    animation-delay: 1s;
  }
`;

export function renderWhisper({ size }: InternalRenderProps): React.ReactNode {
  const spinnerSize = size ?? 50;
  const countBallsInLine = 3;
  const frontColor = "var(--spinner-color, #4b4c56)";
  const backColor = "var(--spinner-secondary-color, #00ff89)";
  const balls: React.ReactNode[] = [];
  let keyValue = 0;

  for (let i = 0; i < countBallsInLine; i++) {
    for (let j = 0; j < countBallsInLine; j++) {
      balls.push(
        <Ball
          frontColor={frontColor}
          backColor={backColor}
          size={spinnerSize}
          key={keyValue.toString()}
          index={keyValue}
        />,
      );
      keyValue++;
    }
  }

  return <Wrapper size={spinnerSize}>{balls}</Wrapper>;
}