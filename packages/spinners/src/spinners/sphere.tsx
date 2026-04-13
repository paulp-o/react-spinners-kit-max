import styled, { keyframes } from "styled-components";
import type { InternalRenderProps } from "../types";

const rotate = keyframes`
    to{
        transform: rotate(360deg);
    }
`;

const move = (props: any) => keyframes`
    0% {
        transform: translateX(${props.x}${props.sizeUnit}) translateY(${props.y}${props.sizeUnit}) scale(1) ;
    }
    5% {
        transform: translateX(-${props.size / 12}${props.sizeUnit}) translateY(-${props.size / 12}${
    props.sizeUnit
}) scale(0);
    }
    50% {
        transform: translateX(-${props.size / 12}${props.sizeUnit}) translateY(-${props.size / 12}${
    props.sizeUnit
}) scale(0);
    }
    55% {
        transform: translateX(${props.x}${props.sizeUnit}) translateY(${props.y}${props.sizeUnit}) scale(1) ;
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
    animation: ${rotate} 8s linear infinite;
`;

const Ball = styled.div`
    position: absolute;
    top: ${props => `${(props as any).size / 2}${(props as any).sizeUnit}`};
    left: ${props => `${(props as any).size / 2}${(props as any).sizeUnit}`};
    width: ${props => `${(props as any).ballSize}${(props as any).sizeUnit}`};
    height: ${props => `${(props as any).ballSize}${(props as any).sizeUnit}`};
    border-radius: 50%;
    background-color: ${props => (props as any).color};
    transform: translateX(${props => `${(props as any).x}${(props as any).sizeUnit}`})
        translateY(${props => `${(props as any).y}${(props as any).sizeUnit}`});
    animation: ${props => move(props)} 5s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
    animation-delay: ${props => (props as any).index * 0.3}s;
`;

export function renderSphere({ size }: InternalRenderProps) {
  const s = size ?? 30;
  const color = "var(--spinner-color, #fff)";
  const radius = s / 2;
  const countBalls = 7;
  const ballSize = s / 5;
  const angle = 360 / countBalls;
  return <Wrapper size={s} sizeUnit="px">{getBalls({ countBalls, radius, angle, color, size: s, ballSize, sizeUnit: "px" })}</Wrapper>;
}