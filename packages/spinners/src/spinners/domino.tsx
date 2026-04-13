import styled, { keyframes } from "styled-components";
import type { InternalRenderProps } from "../types";

const fall = (props: any) => keyframes`
    0% {
        transform: translateX(${props.translatesPoints[0]}${props.sizeUnit}) rotate(0deg);
        opacity: 0;
    }
    14.28% {
        transform: translateX(${props.translatesPoints[1]}${props.sizeUnit}) rotate(0deg);
        opacity: 1;
    }
    28.56% {
        transform: translateX(${props.translatesPoints[2]}${props.sizeUnit}) rotate(0deg);
        opacity: 1;
    }
    37.12% {
        transform: translateX(${props.translatesPoints[3]}${props.sizeUnit}) rotate(0deg);
        opacity: 1;
    }
    42.84% {
        transform: translateX(${props.translatesPoints[4]}${props.sizeUnit}) rotate(10deg);
        opacity: 1;
    }
    57.12% {
        transform: translateX(${props.translatesPoints[5]}${props.sizeUnit}) rotate(40deg);
        opacity: 1;
    }
    71.4% {
        transform: translateX(${props.translatesPoints[6]}${props.sizeUnit}) rotate(62deg);
        opacity: 1;
    }
    85.68% {
        transform: translateX(${props.translatesPoints[7]}${props.sizeUnit}) rotate(72deg);
        opacity: 1;
    }
    100% {
        transform: translateX(${props.translatesPoints[8]}${props.sizeUnit}) rotate(74deg);
        opacity: 0;
    }
`;

const getTranslatePositions = (countBars: number, size: number) => {
  const translates = [];
  for (let i = 0; i <= countBars + 1; i++) {
    translates.push(-i * (size / 8));
  }
  return translates;
};

const getBars = ({ countBars, rotatesPoints, translatesPoints, color, size, sizeUnit }: any) => {
  const bars = [];
  for (let i = 0; i < countBars; i++) {
    bars.push(
      <Bar
        color={color}
        size={size}
        translatesPoints={translatesPoints}
        rotate={rotatesPoints[i]}
        key={i.toString()}
        index={i}
        sizeUnit={sizeUnit}
      />,
    );
  }
  return bars;
};

const Wrapper = styled.div`
    position: relative;
    width: ${props => `${(props as any).size}${(props as any).sizeUnit}`};
    height: ${props => `${(props as any).size / 5}${(props as any).sizeUnit}`};
`;

const Bar = styled.div`
    position: absolute;
    right: 0;
    width: ${props => `${(props as any).size / 30}${(props as any).sizeUnit}`};
    height: ${props => `${(props as any).size / 5}${(props as any).sizeUnit}`};
    transform-origin: 50% 100%;
    background-color: ${props => (props as any).color};
    animation: ${fall} 3s linear infinite;
    animation-delay: ${props => (props as any).index * -0.42}s;
    transform: translateX(${props => `${(props as any).size - (props as any).index * 15}${(props as any).sizeUnit}`})
        rotate(${props => (props as any).rotate}deg);
    &:nth-child(1) {
        opacity: 0.22;
    }
`;

export function renderDomino({ size }: InternalRenderProps) {
  const s = size ?? 100;
  const color = "var(--spinner-color, #686769)";
  const countBars = 7;
  const rotatesPoints = [0, 0, 0, 10, 40, 60, 70];
  const translatesPoints = getTranslatePositions(countBars, s);
  return <Wrapper size={s} sizeUnit="px">{getBars({ countBars, rotatesPoints, translatesPoints, color, size: s, sizeUnit: "px" })}</Wrapper>;
}