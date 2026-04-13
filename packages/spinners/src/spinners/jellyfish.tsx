import styled, { keyframes } from "styled-components";
import type { InternalRenderProps } from "../types";

const motion = (props: any) => keyframes`
  0% {
    transform: translateY(${-props.size / 5}px);
  }
  50% {
    transform: translateY(${props.size / 4}px);
  }
  100% {
    transform: translateY(${-props.size / 5}px);
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

const Ring = styled.div`
  position: absolute;
  width: ${(props: any) => `${props.index * (props.size / props.countRings)}px`};
  height: ${(props: any) => `${(props.index * (props.size / props.countRings)) / 2}px`};
  border: 2px solid ${(props: any) => props.color};
  border-radius: 50%;
  background-color: transparent;
  animation: ${(props: any) => motion(props)} 2.5s ease infinite;
  animation-delay: ${(props: any) => props.index * 100}ms;
`;

export function renderJellyfish({ size }: InternalRenderProps): React.ReactNode {
  const spinnerSize = size ?? 60;
  const countRings = 6;
  const color = "var(--spinner-color, #4b4c56)";
  const rings: React.ReactNode[] = [];
  let keyValue = 0;

  for (let i = 0; i < countRings; i++) {
    rings.push(
      <Ring
        color={color}
        size={spinnerSize}
        countRings={countRings}
        key={keyValue.toString()}
        index={i}
      />,
    );
    keyValue++;
  }

  return <Wrapper size={spinnerSize}>{rings}</Wrapper>;
}