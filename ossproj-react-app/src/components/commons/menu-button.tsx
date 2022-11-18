import { ReactNode } from "react";
import styled from "styled-components";

interface IMenuButtonProps {
  onClick: () => void;
  children: ReactNode;
}
export const MenuButton = ({ onClick, children }: IMenuButtonProps) => {
  return <CreateButton onClick={onClick}>{children}</CreateButton>;
};

const CreateButton = styled.div`
  width: 70px;
  height: 70px;
  padding: 3px;
  &:hover {
    background: #e5e5e5;
  }
  color: #ffffff;
  box-sizing: border-box;
  font-size: 60px;
  font-weight: 800;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
`;
