import styled, { keyframes } from "styled-components";
import type { InternalRenderProps } from "../types";

const rotate = keyframes`
    50% {
        transform: rotate(180deg) scale(1.125);
    }
    100%{
        transform: rotate(360deg);
    }
`;

const move = (props: any) => keyframes`
    0% {
        transform: translateX(${props.x}${props.sizeUnit}) translateY(${props.y}${
    props.sizeUnit
}) scale(1.25) ;
    }
    5% {
        transform: translateX(${props.x}${props.sizeUnit}) translateY(${props.y}${
    props.sizeUnit
}) scale(1.75);
    }
    50% {
        transform: translateX(${props.x}${props.sizeUnit}) translateY(${props.y}${props.sizeUnit}) scale(.25);
    }
    55% {
        background-color: ${props.backColor};
        transform: translateX(${props.x}${props.sizeUnit}) translateY(${props.y}${props.sizeUnit}) scale(1) ;
    }
`;

const getBalls = ({ countBalls, radius, angle, frontColor, backColor, size, ballSize, sizeUnit }: any) => {
  const balls = [];
  const offset = ballSize / 2;
  for (let i = 0; i < countBalls; i++) {
    const y = Math.sin(angle * i * (Math.PI / 180)) * radius - offset;
    const x = Math.cos(angle * i * (Math.PI / 180)) * radius - offset;
    balls.push(
      <Ball
        frontColor={frontColor}
        backColor={backColor}
        ballSize={ballSize}
        size={size}
        sizeUnit={sizeUnit}
        x={y}
        y={x}
        key={i.toString()}
        index={i}
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
    animation: ${rotate} 1.5s linear infinite;
`;

const Ball = styled.div`
    position: absolute;
    top: ${props => `${(props as any).size / 2}${(props as any).sizeUnit}`};
    left: ${props => `${(props as any).size / 2}${(props as any).sizeUnit}`};
    width: ${props => `${(props as any).ballSize}${(props as any).sizeUnit}`};
    height: ${props => `${(props as any).ballSize}${(props as any).sizeUnit}`};
    border-radius: 50%;
    background-color: ${props => (props as any).frontColor};
    transform: translateX(${props => `${(props as any).x}${(props as any).sizeUnit}`})
        translateY(${props => `${(props as any).y}${(props as any).sizeUnit}`});
    animation: ${props => move(props)} 2.5s cubic-bezier(0.075, 0.82, 0.165, 1) infinite;
    animation-delay: ${props => (props as any).index * 0.2}s;
`;

export function renderClap({ size }: InternalRenderProps) {
  const s = size ?? 30;
  const frontColor = "var(--spinner-color, #00ff89)";
  const backColor = "var(--spinner-secondary-color, #686769)";
  const radius = s / 2;
  const countBalls = 7;
  const ballSize = s / 5;
  const angle = 360 / countBalls;
  return <Wrapper size={s} sizeUnit="px">{getBalls({ countBalls, radius, angle, frontColor, backColor, size: s, ballSize, sizeUnit: "px" })}</Wrapper>;
}