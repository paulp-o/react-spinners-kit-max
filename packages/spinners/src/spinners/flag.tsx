import styled, { keyframes } from "styled-components";
import type { InternalRenderProps } from "../types";

const wave = (props: any) => keyframes`
    0% {
        transform: translateY(0);
        opacity: 1;
    }
    50% {
        transform: translateY(${-props.size / 5}${props.sizeUnit});
        opacity: 0.25;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
`;

const getPlanes = ({ countPlaneInLine, color, size, sizeUnit }: any) => {
  const lines = [];
  const planes = [];
  let keyValue = 0;
  for (let i = 0; i < countPlaneInLine; i++) {
    for (let j = 0; j < countPlaneInLine; j++) {
      planes.push(
        <Plane
          color={color}
          size={size}
          x={i * (size / 6 + size / 9)}
          y={j * (size / 6 + size / 9) + size / 10}
          key={i + j.toString()}
          index={keyValue}
          sizeUnit={sizeUnit}
        />,
      );
      keyValue++;
    }
    lines.push(
      <Line index={keyValue} key={keyValue.toString()} size={size} sizeUnit={sizeUnit}>
        {[...planes]}
      </Line>,
    );
    planes.length = 0;
  }
  return lines;
};

const Wrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${props => `${(props as any).size}${(props as any).sizeUnit}`};
    height: ${props => `${(props as any).size}${(props as any).sizeUnit}`};
`;

const Line = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    animation: ${wave} 1.5s cubic-bezier(0.86, 0, 0.07, 1) infinite;
    animation-delay: ${props => (props as any).index * 0.05}s;
`;

const Plane = styled.div`
    position: absolute;
    top: ${props => `${(props as any).y}${(props as any).sizeUnit}`};
    left: ${props => `${(props as any).x}${(props as any).sizeUnit}`};
    width: ${props => `${(props as any).size / 6}${(props as any).sizeUnit}`};
    height: ${props => `${(props as any).size / 6}${(props as any).sizeUnit}`};
    background-color: ${props => (props as any).color};
`;

export function renderFlag({ size }: InternalRenderProps) {
  const s = size ?? 40;
  const color = "var(--spinner-color, #fff)";
  return <Wrapper size={s} sizeUnit="px">{getPlanes({ countPlaneInLine: 4, color, size: s, sizeUnit: "px" })}</Wrapper>;
}