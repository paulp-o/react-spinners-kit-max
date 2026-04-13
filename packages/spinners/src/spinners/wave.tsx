import styled, { keyframes } from "styled-components";
import type { InternalRenderProps } from "../types";

const motion = keyframes`
  25% {
    transform: skewY(25deg);
  }
  50% {
    height: 100%;
    margin-top: 0;
  }
  75% {
    transform: skewY(-25deg);
  }
`;

const Wrapper = styled.div<any>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => `${props.size * 2.5}${props.sizeUnit}`};
  height: ${(props) => `${props.size}${props.sizeUnit}`};
  overflow: hidden;
`;

const Bar = styled.div<any>`
  position: absolute;
  top: ${(props) => `${props.y + props.size / 10}${props.sizeUnit}`};
  left: ${(props) => `${props.x}${props.sizeUnit}`};
  width: ${(props) => `${props.size / 5}${props.sizeUnit}`};
  height: ${(props) => `${props.size / 10}${props.sizeUnit}`};
  margin-top: ${(props) => `${props.size - props.size / 10}${props.sizeUnit}`};
  transform: skewY(0deg);
  background-color: ${(props) => props.color};
  animation: ${motion} 1.25s ease-in-out infinite;
  animation-delay: ${(props) => props.index * 0.15}s;
`;

const getBars = ({ countBars, color, size, sizeUnit }: any) => {
  const bars = [];
  for (let i = 0; i < countBars; i++) {
    bars.push(
      <Bar
        color={color}
        size={size}
        x={i * (size / 5 + (size / 15 - size / 100))}
        y={0}
        key={i.toString()}
        index={i}
        sizeUnit={sizeUnit}
      />,
    );
  }
  return bars;
};

export function renderWave({ size }: InternalRenderProps): React.ReactNode {
  const s = size ?? 30;
  const color = "var(--spinner-color, #fff)";
  const countBars = 10;

  return <Wrapper size={s} sizeUnit="px">{getBars({ countBars, color, size: s, sizeUnit: "px" })}</Wrapper>;
}