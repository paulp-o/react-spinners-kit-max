import styled, { keyframes } from "styled-components";
import type { InternalRenderProps } from "../types";

const rotate = keyframes`
  0% {
    transform: rotateX(0deg);
  }
  25% {
    transform: rotateX(-90deg);
  }
  50% {
    transform: rotateX(-180deg);
  }
  75% {
    transform: rotateX(-270deg);
  }
  100% {
    transform: rotateX(-360deg);
  }
`;

const Wrapper = styled.div<any>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => `${props.size}${props.sizeUnit}`};
  height: ${(props) => `${props.size / 4}${props.sizeUnit}`};
  perspective: ${(props) => `${props.size * 3}${props.sizeUnit}`};
`;

const CubeWrapper = styled.div<any>`
  position: absolute;
  top: ${(props) => `${props.y}${props.sizeUnit}`};
  left: ${(props) => `${props.x}${props.sizeUnit}`};
  width: inherit;
  height: inherit;
`;

const Cube = styled.div<any>`
  position: relative;
  width: ${(props) => `${props.size / 4}${props.sizeUnit}`};
  height: ${(props) => `${props.size / 4}${props.sizeUnit}`};
  transform-style: preserve-3d;
  animation: ${rotate} 3s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
  animation-delay: ${(props) => props.index * 0.15}s;
`;

const rotateCube = (props: any) => {
  if (props.top) {
    return 90;
  }
  if (props.bottom) {
    return -90;
  }
  return 0;
};

const Side = styled.div<any>`
  backface-visibility: hidden;
  display: block;
  position: absolute;
  width: inherit;
  height: inherit;
  background-color: ${(props) => props.color};
  transform: rotateX(${(props) => rotateCube(props)}deg) rotateY(${(props) => (props.back ? 180 : 0)}deg)
    translateZ(${(props) => `${props.size / 8}${props.sizeUnit}`});
`;

const getCubes = ({ countCubesInLine, backColor, frontColor, size, sizeUnit }: any) => {
  const cubes = [];
  let keyValue = 0;
  for (let i = 0; i < countCubesInLine; i++) {
    cubes.push(
      <CubeWrapper x={i * (size / 4)} y={0} key={keyValue.toString()} sizeUnit={sizeUnit}>
        <Cube size={size} index={keyValue} sizeUnit={sizeUnit}>
          <Side front={true} size={size} color={frontColor} sizeUnit={sizeUnit} />
          <Side back={true} size={size} color={frontColor} sizeUnit={sizeUnit} />
          <Side bottom={true} size={size} color={backColor} sizeUnit={sizeUnit} />
          <Side top={true} size={size} color={backColor} sizeUnit={sizeUnit} />
        </Cube>
      </CubeWrapper>,
    );
    keyValue++;
  }
  return cubes;
};

export function renderSpiral({ size }: InternalRenderProps): React.ReactNode {
  const s = size ?? 40;
  const frontColor = "var(--spinner-color, #00ff89)";
  const backColor = "var(--spinner-secondary-color, #686769)";
  const countCubesInLine = 4;

  return (
    <Wrapper size={s} sizeUnit="px">
      {getCubes({ countCubesInLine, backColor, frontColor, size: s, sizeUnit: "px" })}
    </Wrapper>
  );
}