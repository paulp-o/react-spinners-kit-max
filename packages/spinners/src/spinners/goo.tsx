import styled, { keyframes } from "styled-components";
import type { InternalRenderProps } from "../types";

const rotate = () => keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const move = (props: any) => keyframes`
    0%{
        transform: translateY(0) scale(1);
    }
    50%{
        transform: translateY(${props.translateTo}${props.sizeUnit}) scale(0.8);
    }
    100%{
        transform: translateY(0) scale(1);
    }
`;

const getBalls = ({ countBalls, color, size, sizeUnit }: any) => {
  const balls = [];
  const center = size / 4;
  const ballsTranslatePositions = [-center, center];
  for (let i = 0; i < countBalls; i++) {
    balls.push(
      <Ball
        color={color}
        size={size}
        x={size / 2 - size / 6}
        y={size / 2 - size / 6}
        key={i.toString()}
        translateTo={ballsTranslatePositions[i]}
        index={i}
        sizeUnit={sizeUnit}
      />,
    );
  }
  return balls;
};

const Wrapper = styled.div`
    width: ${props => `${(props as any).size}${(props as any).sizeUnit}`};
    height: ${props => `${(props as any).size}${(props as any).sizeUnit}`};
    filter: url("#goo");
`;

const BallsWrapper = styled.div`
    position: relative;
    width: ${props => `${(props as any).size}${(props as any).sizeUnit}`};
    height: ${props => `${(props as any).size}${(props as any).sizeUnit}`};
    animation: ${rotate} 1.7s linear infinite;
`;

const Ball = styled.div`
    position: absolute;
    top: ${props => `${(props as any).y}${(props as any).sizeUnit}`};
    left: ${props => `${(props as any).x}${(props as any).sizeUnit}`};
    width: ${props => `${(props as any).size / 3}${(props as any).sizeUnit}`};
    height: ${props => `${(props as any).size / 3}${(props as any).sizeUnit}`};
    border-radius: 50%;
    background-color: ${props => (props as any).color};
    animation: ${move} 1.5s ease-in-out infinite;
`;

export function renderGoo({ size }: InternalRenderProps) {
  const s = size ?? 55;
  const color = "var(--spinner-color, #4b4c56)";
  return (
    <Wrapper size={s} sizeUnit="px">
      <BallsWrapper size={s} sizeUnit="px">{getBalls({ countBalls: 2, color, size: s, sizeUnit: "px" })}</BallsWrapper>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 15 -5"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
    </Wrapper>
  );
}