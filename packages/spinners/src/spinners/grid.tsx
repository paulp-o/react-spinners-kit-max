import styled, { keyframes } from "styled-components";
import type { InternalRenderProps } from "../types";

const motion = (props: any) => keyframes`
  0% {
    top: ${props.y}${props.sizeUnit};
    left: ${props.x}${props.sizeUnit};
  }
  50% {
    width: ${props.size / 4}${props.sizeUnit};
    height: ${props.size / 4}${props.sizeUnit};
    top: ${props.size / 2 - props.size / 8}${props.sizeUnit};
    left: ${props.size / 2 - props.size / 8}${props.sizeUnit};
  }
  100% {
    top: ${props.y}${props.sizeUnit};
    left: ${props.x}${props.sizeUnit};
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

const Ball = styled.div<any>`
  position: absolute;
  top: ${(props) => `${props.y}${props.sizeUnit}`};
  left: ${(props) => `${props.x}${props.sizeUnit}`};
  width: ${(props) => `${props.size / 6}${props.sizeUnit}`};
  height: ${(props) => `${props.size / 6}${props.sizeUnit}`};
  border-radius: 50%;
  background-color: ${(props) => props.color};
  animation: ${motion} 1.5s cubic-bezier(0.23, 1, 0.32, 1) infinite;
`;

const getBalls = ({ countBallsInLine, color, size, sizeUnit }: any) => {
  const balls = [];
  let keyValue = 0;

  for (let i = 0; i < countBallsInLine; i++) {
    for (let j = 0; j < countBallsInLine; j++) {
      balls.push(
        <Ball
          color={color}
          size={size}
          x={i * (size / 3 + size / 12)}
          y={j * (size / 3 + size / 12)}
          key={keyValue.toString()}
          sizeUnit={sizeUnit}
        />,
      );
      keyValue++;
    }
  }

  return balls;
};

export function renderGrid({ size }: InternalRenderProps): React.ReactNode {
  const s = size ?? 40;
  const color = "var(--spinner-color, #fff)";
  const countBallsInLine = 3;

  return <Wrapper size={s} sizeUnit="px">{getBalls({ countBallsInLine, color, size: s, sizeUnit: "px" })}</Wrapper>;
}