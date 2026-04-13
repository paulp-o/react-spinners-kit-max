import styled, { keyframes } from "styled-components";
import type { InternalRenderProps } from "../types";

const motion = (props: any) => keyframes`
  0% {
    width: ${props.size / 20}${props.sizeUnit}
  }
  50% {
    width: ${props.size / 6}${props.sizeUnit}
  }
  100% {
    width: ${props.size / 20}${props.sizeUnit}
  }
`;

const Wrapper = styled.div<any>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => `${props.size}${props.sizeUnit}`};
  height: ${(props) => `${props.size}${props.sizeUnit}`};
`;

const Bar = styled.div<any>`
  position: absolute;
  top: ${(props) => `${props.y}${props.sizeUnit}`};
  left: ${(props) => `${props.x}${props.sizeUnit}`};
  width: ${(props) => `${props.size / 20}${props.sizeUnit}`};
  height: ${(props) => `${props.size}${props.sizeUnit}`};
  background-color: ${(props) => props.color};
  animation: ${motion} 1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
  animation-delay: ${(props) => props.index * 0.15}s;
`;

const getBars = (countBars: number, color: string, size: number, sizeUnit: string) => {
  const bars = [];
  for (let i = 0; i < countBars; i++) {
    bars.push(
      <Bar
        color={color}
        size={size}
        sizeUnit={sizeUnit}
        x={i * (size / 5 + size / 25) - size / 12}
        key={i.toString()}
        index={i}
      />,
    );
  }
  return bars;
};

export function renderBars({ size }: InternalRenderProps): React.ReactNode {
  const s = size ?? 40;
  const color = "var(--spinner-color, #00ff89)";
  const countBars = 5;

  return <Wrapper size={s} sizeUnit="px">{getBars(countBars, color, s, "px")}</Wrapper>;
}