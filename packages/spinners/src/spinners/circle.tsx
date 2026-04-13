import styled, { keyframes } from "styled-components";
import type { InternalRenderProps } from "../types";

const rotate = keyframes`
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.div<any>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => `${props.size}${props.sizeUnit}`};
  height: ${(props) => `${props.size}${props.sizeUnit}`};
  border: ${(props) => `${props.size / 5}${props.sizeUnit}`} solid ${(props) => props.color};
  border-right-color: transparent;
  border-radius: 50%;
  animation: ${rotate} 0.75s linear infinite;
`;

export function renderCircle({ size }: InternalRenderProps): React.ReactNode {
  const s = size ?? 30;
  const color = "var(--spinner-color, #fff)";

  return <Wrapper size={s} color={color} sizeUnit="px" />;
}