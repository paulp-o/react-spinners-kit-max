import styled, { keyframes } from "styled-components";
import type { InternalRenderProps } from "../types";

const rotate = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% { 
        transform: rotate(1440deg); 
        opacity: 0.05;
    }
`;

const getBalls = ({ countBalls, radius, angle, color, size, ballSize, sizeUnit }: any) => {
  const balls = [];
  const offset = ballSize / 2;
  for (let i = 0; i < countBalls; i++) {
    const y = Math.sin(angle * i * (Math.PI / 180)) * radius - offset;
    const x = Math.cos(angle * i * (Math.PI / 180)) * radius - offset;
    balls.push(
      <Ball
        color={color}
        ballSize={ballSize}
        size={size}
        x={y}
        y={x}
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
    height: ${props => `${(props as any).size}${(props as any).sizeUnit}`};
`;

const Ball = styled.div`
    position: absolute;
    left: 50%;
    top: 0%;
    width: ${props => `${(props as any).ballSize}${(props as any).sizeUnit}`};
    height: ${props => `${(props as any).ballSize}${(props as any).sizeUnit}`};
    border-radius: 50%;
    background-color: ${props => (props as any).color};
    transform: translateX(-50%) translateY(100%);
    transform-origin: 0 250% 0;
    animation: ${rotate} 4s both infinite;
    animation-timing-function: cubic-bezier(0.5, ${props => (props as any).index * 0.3}, 0.9, 0.9);
`;

export function renderRotate({ size }: InternalRenderProps) {
  const s = size ?? 45;
  const color = "var(--spinner-color, #00ff89)";
  const radius = s / 2;
  const countBalls = 8;
  const ballSize = s / 5;
  const angle = 360 / countBalls;
  return <Wrapper size={s} sizeUnit="px">{getBalls({ countBalls, radius, angle, color, size: s, ballSize, sizeUnit: "px" })}</Wrapper>;
}