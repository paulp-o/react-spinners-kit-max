import styled, { keyframes } from "styled-components";
import type { InternalRenderProps } from "../types";

const rotate = (props: any) => keyframes`
    0% {
        top: ${props.size}${props.sizeUnit};
        transform: rotateY(0deg);
    }
    30%{
        top: 0;
        transform: rotateY(90deg);
    }
    100% {
        transform: rotateY(0deg);
        top: -${props.size}${props.sizeUnit};
    }
`;

const getCubes = ({ countCubesInLine, backColor, frontColor, size, sizeUnit }: any) => {
  const cubes = [];
  let keyValue = 0;
  for (let i = 0; i < countCubesInLine; i++) {
    cubes.push(
      <CubeWrapper x={i * (size / 8 + size / 11)} y={0} key={keyValue.toString()} sizeUnit={sizeUnit}>
        <Cube size={size} index={keyValue} sizeUnit={sizeUnit}>
          <Side front={true} size={size} color={frontColor} sizeUnit={sizeUnit} />
          <Side left={true} size={size} color={backColor} sizeUnit={sizeUnit} />
        </Cube>
      </CubeWrapper>,
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
    height: ${props => `${(props as any).size / 1.75}${(props as any).sizeUnit}`};
    perspective: ${props => `${(props as any).size * 3}${(props as any).sizeUnit}`};
    overflow: hidden;
    transform: rotateY(20deg);
`;

const CubeWrapper = styled.div`
    position: absolute;
    top: ${props => `${(props as any).y}${(props as any).sizeUnit}`};
    left: ${props => `${(props as any).x}${(props as any).sizeUnit}`};
    width: inherit;
    height: inherit;
`;

const Cube = styled.div`
    position: relative;
    width: ${props => `${(props as any).size / 8}${(props as any).sizeUnit}`};
    height: ${props => `${(props as any).size / 1.75}${(props as any).sizeUnit}`};
    transform-style: preserve-3d;
    animation: ${rotate} 1.75s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
    animation-delay: ${props => (props as any).index * 0.1}s;
`;

const Side = styled.div`
    backface-visibility: hidden;
    display: block;
    position: absolute;
    width: inherit;
    height: inherit;
    background-color: ${props => (props as any).color};
    transform: rotateY(${props => ((props as any).front ? 0 : -90)}deg)
        translateZ(${props => `${(props as any).size / 16}${(props as any).sizeUnit}`});
`;

export function renderSequence({ size }: InternalRenderProps) {
  const s = size ?? 40;
  const frontColor = "var(--spinner-color, #00ff89)";
  const backColor = "var(--spinner-secondary-color, #686769)";
  return <Wrapper size={s} sizeUnit="px">{getCubes({ countCubesInLine: 5, backColor, frontColor, size: s, sizeUnit: "px" })}</Wrapper>;
}