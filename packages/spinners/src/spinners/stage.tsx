import styled, { keyframes } from "styled-components";
import type { InternalRenderProps } from "../types";

const motion = (props: any) => keyframes`
  0% {
    top: ${props.y}${props.sizeUnit};
    left: ${props.x}${props.sizeUnit};
  }
  25% {
    top: ${props.y}${props.sizeUnit};
    left: ${props.x}${props.sizeUnit};
    opacity: 0;
  }
  50% {
    top: ${props.y + props.size / 2}${props.sizeUnit};
    left: ${props.x}${props.sizeUnit};
    opacity: 0;
  }
  100% {
    top: ${props.y}${props.sizeUnit};
    left: ${props.x}${props.sizeUnit};
    opacity: 1;
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
  width: ${(props) => `${props.size / 5}${props.sizeUnit}`};
  height: ${(props) => `${props.size / 5}${props.sizeUnit}`};
  border-radius: 50%;
  background-color: ${(props) => props.color};
  animation: ${motion} 1s ease-in-out infinite;
  animation-delay: ${(props) => props.index * 0.2}s;
`;

const getBalls = ({ countBalls, color, size, sizeUnit }: any) => {
  const balls = [];
  let keyValue = 0;
  for (let i = 0; i < countBalls; i++) {
    balls.push(
      <Ball
        color={color}
        size={size}
        index={i}
        x={i * (size / 2.5)}
        y={size / 2 - size / 10}
        key={keyValue.toString()}
        sizeUnit={sizeUnit}
      />,
    );
    keyValue++;
  }
  return balls;
};

export function renderStage({ size }: InternalRenderProps): React.ReactNode {
  const s = size ?? 40;
  const color = "var(--spinner-color, #fff)";
  const countBalls = 3;

  return <Wrapper size={s} sizeUnit="px">{getBalls({ countBalls, color, size: s, sizeUnit: "px" })}</Wrapper>;
}