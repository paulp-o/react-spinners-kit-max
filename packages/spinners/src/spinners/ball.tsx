import styled, { keyframes } from "styled-components";
import type { InternalRenderProps } from "../types";

const motion = (props: any) => keyframes`
  0% {
    transform: translateX(0) scale(1);
  }
  25% {
    transform: translateX(${props.size / 2}${props.sizeUnit}) scale(0.25);
  }
  50% {
    transform: translateX(0) scale(1);
  }
  75% {
    transform: translateX(${-props.size / 2}${props.sizeUnit}) scale(0.25);
  }
  100% {
    transform: translateX(0) scale(1);
  }
`;

const Wrapper = styled.div<any>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => `${props.size}${props.sizeUnit}`};
  height: ${(props) => `${props.size / 2}${props.sizeUnit}`};
`;

const Ball = styled.div<any>`
  width: ${(props) => `${props.size / 3}${props.sizeUnit}`};
  height: ${(props) => `${props.size / 3}${props.sizeUnit}`};
  border-radius: 50%;
  background-color: ${(props) => props.color};
  animation: ${(props) => motion(props)} 3s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
`;

export function renderBall({ size }: InternalRenderProps): React.ReactNode {
  const s = size ?? 40;
  const color = "var(--spinner-color, #00ff89)";

  return (
    <Wrapper size={s} sizeUnit="px">
      <Ball color={color} size={s} sizeUnit="px" />
    </Wrapper>
  );
}