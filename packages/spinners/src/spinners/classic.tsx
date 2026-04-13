import styled, { keyframes } from "styled-components";
import type { InternalRenderProps } from "../types";

const fade = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
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

const Bar = styled.div`
  position: absolute;
  width: ${(props: any) => `${props.size / 10}px`};
  height: ${(props: any) => `${props.size / 4}px`};
  background-color: ${(props: any) => props.color};
  opacity: 0.05;
  transform: ${(props: any) => `rotate(${props.rotate}deg)`}
    ${(props: any) => `translate(0, ${props.translate}px)`};
  animation: ${fade} ${(props: any) => props.countBars * 0.06}s linear infinite;
  animation-delay: ${(props: any) => props.index * 0.06}s;
`;

export function renderClassic({ size }: InternalRenderProps): React.ReactNode {
  const spinnerSize = size ?? 30;
  const countBars = 16;
  const color = "var(--spinner-color, #fff)";
  const bars: React.ReactNode[] = [];

  for (let i = 0; i < countBars; i++) {
    const rotate = (360 / countBars) * i;
    const translate = -(spinnerSize / 2);
    bars.push(
      <Bar
        countBars={countBars}
        color={color}
        size={spinnerSize}
        rotate={rotate}
        translate={translate}
        key={i.toString()}
        index={i}
      />,
    );
  }

  return <Wrapper size={spinnerSize}>{bars}</Wrapper>;
}