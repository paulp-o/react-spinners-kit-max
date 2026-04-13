import styled, { keyframes } from "styled-components";
import type { InternalRenderProps } from "../types";

const impulse = (props: any) => keyframes`
    0% {
        background: ${props.backColor};
        transform: scale(1);
        animation-timing-function: cubic-bezier(1,0,0.7,1);
    }
    40% {
        background: ${props.frontColor};
        transform: scale(1.5);
        animation-timing-function: cubic-bezier(0.3,0,0,1);
    }
    72.5% {
        background:${props.backColor};
        transform: scale(1);
        animation-timing-function: linear;
    }
    100% {
        background: ${props.backColor};
        transform: scale(1);
    }
`;

const getBalls = ({ countBalls, frontColor, backColor, size, sizeUnit }: any) => {
  const balls = [];
  for (let i = 0; i < countBalls; i++) {
    balls.push(
      <Ball
        frontColor={frontColor}
        backColor={backColor}
        size={size}
        x={i * (size / 5 + size / 5)}
        y={0}
        key={i.toString()}
        index={i}
        sizeUnit={sizeUnit}
      />,
    );
  }
  return balls;
};

const Wrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${props => `${(props as any).size}${(props as any).sizeUnit}`};
    height: ${props => `${(props as any).size / 5}${(props as any).sizeUnit}`};
`;

const Ball = styled.div`
    position: absolute;
    top: ${props => `${(props as any).y}${(props as any).sizeUnit}`};
    left: ${props => `${(props as any).x}${(props as any).sizeUnit}`};
    width: ${props => `${(props as any).size / 5}${(props as any).sizeUnit}`};
    height: ${props => `${(props as any).size / 5}${(props as any).sizeUnit}`};
    border-radius: 50%;
    background-color: ${props => (props as any).frontColor};
    animation: ${impulse} 1.25s linear infinite;
    animation-delay: ${props => (props as any).index * 0.125}s;
`;

export function renderImpulse({ size }: InternalRenderProps) {
  const s = size ?? 40;
  const frontColor = "var(--spinner-color, #00ff89)";
  const backColor = "var(--spinner-secondary-color, #4b4c56)";
  return <Wrapper size={s} sizeUnit="px">{getBalls({ countBalls: 3, frontColor, backColor, size: s, sizeUnit: "px" })}</Wrapper>;
}