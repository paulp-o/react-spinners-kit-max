import styled, { keyframes } from "styled-components";
import type { InternalRenderProps } from "../types";

const motion = (props: any) => keyframes`
  15% {
    transform: scaleY(1) translateX(10${props.sizeUnit});
  }
  90% {
    transform: scaleY(0.05) translateX(-5${props.sizeUnit});
  }
  100%{
    transform: scaleY(0.05) translateX(-5${props.sizeUnit});
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
  top: 0;
  left: ${(props) => `${props.x}${props.sizeUnit}`};
  width: ${(props) => `${props.size / 5}${props.sizeUnit}`};
  height: 100%;
  transform: scaleY(0.05) translateX(-5px);
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

export function renderPush({ size }: InternalRenderProps): React.ReactNode {
  const s = size ?? 30;
  const color = "var(--spinner-color, #686769)";
  const countBars = 10;

  return <Wrapper size={s} sizeUnit="px">{getBars({ countBars, color, size: s, sizeUnit: "px" })}</Wrapper>;
}