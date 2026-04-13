import styled, { keyframes } from "styled-components";
import type { InternalRenderProps } from "../types";

const rotate = keyframes`
    from { transform: rotateX(0) rotateY(0); }
    to   { transform: rotateX(360deg) rotateY(360deg); }
`;

const Wrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${props => `${(props as any).size}${(props as any).sizeUnit}`};
    height: ${props => `${(props as any).size}${(props as any).sizeUnit}`};
    perspective: ${props => `${(props as any).size * 4}${(props as any).sizeUnit}`};
`;

const CubeWrapper = styled.div`
    sposition: absolute;
    top: ${props => `${(props as any).y}${(props as any).sizeUnit}`};
    left: ${props => `${(props as any).x}${(props as any).sizeUnit}`};
    width: inherit;
    height: inherit;
`;

const Cube = styled.div`
    position: relative;
    width: ${props => `${(props as any).size}${(props as any).sizeUnit}`};
    height: ${props => `${(props as any).size}${(props as any).sizeUnit}`};
    transform-style: preserve-3d;
    animation: ${rotate} 3s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
`;

const rotateXCube = (props: any) => {
  if (props.top) {
    return 90;
  }
  if (props.bottom) {
    return -90;
  }
  return 0;
};

const rotateYCube = (props: any) => {
  if (props.left) {
    return 90;
  }
  if (props.right) {
    return -90;
  }
  if (props.back) {
    return 180;
  }
  return 0;
};

const Side = styled.div`
    backface-visibility: hidden;
    display: block;
    position: absolute;
    width: inherit;
    height: inherit;
    background-color: ${props => (props as any).color};
    transform: rotateX(${props => rotateXCube(props)}deg) rotateY(${props => rotateYCube(props)}deg)
        translateZ(${props => `${(props as any).size / 2}${(props as any).sizeUnit}`});
`;

export function renderCube({ size }: InternalRenderProps) {
  const s = size ?? 25;
  const frontColor = "var(--spinner-color, #00ff89)";
  const backColor = "var(--spinner-secondary-color, #4b4c56)";
  return (
    <Wrapper size={s} sizeUnit="px">
      <CubeWrapper x={0} y={0} sizeUnit="px">
        <Cube size={s} sizeUnit="px">
          <Side front={true} size={s} color={frontColor} sizeUnit="px" />
          <Side back={true} size={s} color={frontColor} sizeUnit="px" />
          <Side bottom={true} size={s} color={backColor} sizeUnit="px" />
          <Side top={true} size={s} color={backColor} sizeUnit="px" />
          <Side left={true} size={s} color={backColor} sizeUnit="px" />
          <Side right={true} size={s} color={backColor} sizeUnit="px" />
        </Cube>
      </CubeWrapper>
    </Wrapper>
  );
}