import styled, { keyframes } from "styled-components";
import type { InternalRenderProps } from "../types";

const rotate = () => keyframes`
  to {
    transform: rotate(450deg);
  }
`;

const Wrapper = styled.div`
  position: relative;
  width: ${(props: any) => `${props.size}px`};
  height: ${(props: any) => `${props.size / 5}px`};
`;

const Bar = styled.div`
  position: absolute;
  left: 0;
  width: ${(props: any) => `${props.size / 60}px`};
  height: ${(props: any) => `${props.size / 5}px`};
  left: ${(props: any) => `${props.index * 9}px`};
  transform-origin: center bottom;
  transform: rotate(-90deg);
  background-color: ${(props: any) => props.color};
  animation: ${rotate} 3s ease infinite;
  animation-delay: ${(props: any) => props.index * 0.05}s;
`;

export function renderComb({ size }: InternalRenderProps): React.ReactNode {
  const spinnerSize = size ?? 100;
  const countBars = spinnerSize / 9;
  const color = "var(--spinner-color, #fff)";
  const bars: React.ReactNode[] = [];

  for (let i = 0; i < countBars; i++) {
    bars.push(<Bar color={color} size={spinnerSize} key={i.toString()} index={i} />);
  }

  return <Wrapper size={spinnerSize}>{bars}</Wrapper>;
}