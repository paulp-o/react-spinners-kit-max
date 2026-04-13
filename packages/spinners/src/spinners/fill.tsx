import styled, { keyframes } from "styled-components";
import type { InternalRenderProps } from "../types";

const rotate = keyframes`
    0% {
        transform: rotate(0deg);
    }
    25% {
        transform: rotate(180deg);
    }
    50% {
        transform: rotate(180deg);
    }
    75% {
        transform: rotate(360deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const fill = keyframes`
    0% {
        height: 0%;
    }
    25% {
        height: 0%;
    }
    50% {
        height: 100%;
    }
    75% {
        height: 100%;
    }
    100% {
        height: 0%;
    }
`;

const Wrapper = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: center;
    width: ${props => `${(props as any).size}${(props as any).sizeUnit}`};
    height: ${props => `${(props as any).size}${(props as any).sizeUnit}`};
    border: ${props => `${(props as any).size / 8}${(props as any).sizeUnit}`} solid ${props => (props as any).color};
    animation: ${rotate} 3s cubic-bezier(0.77, 0, 0.175, 1) infinite;
`;

const Plane = styled.div`
    width: 100%;
    background-color: ${props => (props as any).color};
    animation: ${fill} 3s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
`;

export function renderFill({ size }: InternalRenderProps) {
  const s = size ?? 20;
  const color = "var(--spinner-color, #686769)";
  return <Wrapper size={s} color={color} sizeUnit="px"><Plane color={color} size={s} sizeUnit="px" /></Wrapper>;
}