import styled, { keyframes } from "styled-components";
import type { InternalRenderProps } from "../types";

const rotate = keyframes`
  0% {
    transform: rotateY(90deg);
  }
  50% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(90deg);
  }
`;

const Wrapper = styled.div<any>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => `${props.size}${props.sizeUnit}`};
  height: ${(props) => `${props.size}${props.sizeUnit}`};
  perspective: ${(props) => `${props.size * 3}${props.sizeUnit}`};
`;

const CubeWrapper = styled.div<any>`
  position: absolute;
  top: ${(props) => `${props.y}${props.sizeUnit}`};
  left: ${(props) => `${props.x}${props.sizeUnit}`};
  width: ${(props) => `${props.size}${props.sizeUnit}`};
  height: ${(props) => `${props.size}${props.sizeUnit}`};
`;

const Cube = styled.div<any>`
  position: relative;
  width: ${(props) => `${props.size / 4}${props.sizeUnit}`};
  height: ${(props) => `${props.size / 4}${props.sizeUnit}`};
  transform-style: preserve-3d;
  animation: ${rotate} 1.5s cubic-bezier(0.23, 1, 0.32, 1) infinite;
  animation-delay: ${(props) => props.index * 0.125}s;
`;

const Side = styled.div<any>`
  display: block;
  position: absolute;
  width: inherit;
  height: inherit;
  background-color: ${(props) => props.color};
  transform: rotateY(${(props) => (props.front ? 0 : -90)}deg)
    translateZ(${(props) => `${props.size / 8}${props.sizeUnit}`});
`;

const getCubes = ({ countCubesInLine, backColor, frontColor, size, sizeUnit }: any) => {
  const cubes = [];
  let keyValue = 0;

  for (let i = 0; i < countCubesInLine; i++) {
    for (let j = 0; j < countCubesInLine; j++) {
      cubes.push(
        <CubeWrapper
          size={size}
          x={i * (size / 4 + size / 8)}
          y={j * (size / 4 + size / 8)}
          key={keyValue.toString()}
          sizeUnit={sizeUnit}
        >
          <Cube size={size} index={keyValue} sizeUnit={sizeUnit}>
            <Side front={true} size={size} color={frontColor} sizeUnit={sizeUnit} />
            <Side left={true} size={size} color={backColor} sizeUnit={sizeUnit} />
          </Cube>
        </CubeWrapper>,
      );
      keyValue++;
    }
  }

  return cubes;
};

export function renderGuard({ size }: InternalRenderProps): React.ReactNode {
  const s = size ?? 40;
  const frontColor = "var(--spinner-color, #00ff89)";
  const backColor = "var(--spinner-secondary-color, #686769)";
  const countCubesInLine = 3;

  return (
    <Wrapper size={s} sizeUnit="px">
      {getCubes({ countCubesInLine, backColor, frontColor, size: s, sizeUnit: "px" })}
    </Wrapper>
  );
}