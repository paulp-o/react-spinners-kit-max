import styled, { keyframes } from "styled-components";
import type { InternalRenderProps } from "../types";

const motion = (props: any) => keyframes`
    50% {
        transform: scale(0);
        background-color: ${props.backColor};
    }
`;

const getBalls = ({ countBallsInLine, frontColor, backColor, size, sizeUnit }: any) => {
  const balls = [];
  let keyValue = 0;
  for (let i = 0; i < countBallsInLine; i++) {
    for (let j = 0; j < countBallsInLine; j++) {
      balls.push(
        <Ball
          frontColor={frontColor}
          backColor={backColor}
          size={size}
          x={i * (size / 3 + size / 15)}
          y={j * (size / 3 + size / 15)}
          key={keyValue.toString()}
          index={keyValue}
          sizeUnit={sizeUnit}
        />,
      );
      keyValue++;
    }
  }
  return balls;
};

const Wrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${props => `${(props as any).size}${(props as any).sizeUnit}`};
    height: ${props => `${(props as any).size}${(props as any).sizeUnit}`};
`;

const Ball = styled.div`
    position: absolute;
    top: ${props => `${(props as any).y}${(props as any).sizeUnit}`};
    left: ${props => `${(props as any).x}${(props as any).sizeUnit}`};
    width: ${props => `${(props as any).size / 5}${(props as any).sizeUnit}`};
    height: ${props => `${(props as any).size / 5}${(props as any).sizeUnit}`};
    border-radius: 3px;
    background-color: ${props => (props as any).frontColor};
    animation: ${motion} 0.9s ease infinite;
    transition: all 0.3s ease;
    animation-delay: ${props => (props as any).index * 0.1}s;
`;

export function renderSwish({ size }: InternalRenderProps) {
  const s = size ?? 40;
  const frontColor = "var(--spinner-color, #4b4c56)";
  const backColor = "var(--spinner-secondary-color, #fff)";
  return <Wrapper size={s} sizeUnit="px">{getBalls({ countBallsInLine: 3, frontColor, backColor, size: s, sizeUnit: "px" })}</Wrapper>;
}