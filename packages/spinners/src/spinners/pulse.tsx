import styled, { keyframes } from "styled-components";
import type { InternalRenderProps } from "../types";

const motion = keyframes`
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

const getCubes = ({ countCubeInLine, color, size, sizeUnit }: any) => {
  const cubes = [];
  let keyValue = 0;
  for (let i = 0; i < countCubeInLine; i++) {
    cubes.push(
      <Cube
        color={color}
        size={size}
        x={i * (size / 3 + size / 15)}
        y={0}
        key={keyValue.toString()}
        index={i}
        sizeUnit={sizeUnit}
      />,
    );
    keyValue++;
  }
  return cubes;
};

const Wrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${props => `${(props as any).size}${(props as any).sizeUnit}`};
    height: ${props => `${(props as any).size / 2.5}${(props as any).sizeUnit}`};
`;

const Cube = styled.div`
    position: absolute;
    top: ${props => `${(props as any).y}${(props as any).sizeUnit}`};
    left: ${props => `${(props as any).x}${(props as any).sizeUnit}`};
    width: ${props => `${(props as any).size / 5}${(props as any).sizeUnit}`};
    height: ${props => `${(props as any).size / 2.5}${(props as any).sizeUnit}`};
    background-color: ${props => (props as any).color};
    animation: ${motion} 1.5s cubic-bezier(0.895, 0.03, 0.685, 0.22) infinite;
    animation-delay: ${props => (props as any).index * 0.15}s;
`;

export function renderPulse({ size }: InternalRenderProps) {
  const s = size ?? 40;
  const color = "var(--spinner-color, #fff)";
  return <Wrapper size={s} sizeUnit="px">{getCubes({ countCubeInLine: 3, color, size: s, sizeUnit: "px" })}</Wrapper>;
}