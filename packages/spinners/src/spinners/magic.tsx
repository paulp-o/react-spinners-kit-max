import styled, { keyframes } from "styled-components";
import type { InternalRenderProps } from "../types";

const rotate = () => keyframes`
  100% {
    transform: translateX(-50%) translateY(-50%) rotate(360deg);
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props: any) => `${props.size}px`};
  height: ${(props: any) => `${props.size}px`};
  overflow: hidden;
`;

const Ball = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%) rotate(0deg);
  width: ${(props: any) => `${props.index * (props.size / props.countBalls)}px`};
  height: ${(props: any) => `${props.index * (props.size / props.countBalls)}px`};
  border-radius: 50%;
  background-color: transparent;
  border: 2px solid transparent;
  border-top-color: ${(props: any) => props.color};
  animation: ${rotate} 2s cubic-bezier(0.68, -0.75, 0.265, 1.75) infinite forwards;
  animation-delay: ${(props: any) => props.index * 0.05}s;
`;

export function renderMagic({ size }: InternalRenderProps): React.ReactNode {
  const spinnerSize = size ?? 70;
  const countBalls = spinnerSize / 12;
  const color = "var(--spinner-color, #fff)";
  const balls: React.ReactNode[] = [];

  for (let i = 0; i < countBalls; i++) {
    balls.push(
      <Ball
        color={color}
        countBalls={countBalls}
        size={spinnerSize}
        key={i.toString()}
        index={i}
      />,
    );
  }

  return <Wrapper size={spinnerSize}>{balls}</Wrapper>;
}