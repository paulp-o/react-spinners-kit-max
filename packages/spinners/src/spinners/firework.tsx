import styled, { keyframes } from "styled-components";
import type { InternalRenderProps } from "../types";

const fire = keyframes`
  0% {
    opacity: 1;
    transform: scale(0.1);
  }
  25% {
    opacity: 0.85;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
`;

const Wrapper = styled.div<any>`
  border: ${(props) => `${props.size / 10}${props.sizeUnit}`} dotted ${(props) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => `${props.size}${props.sizeUnit}`};
  height: ${(props) => `${props.size}${props.sizeUnit}`};
  border-radius: 50%;
  animation: ${fire} 1.25s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
`;

export function renderFirework({ size }: InternalRenderProps): React.ReactNode {
  const s = size ?? 40;
  const color = "var(--spinner-color, #fff)";

  return <Wrapper size={s} color={color} sizeUnit="px" />;
}