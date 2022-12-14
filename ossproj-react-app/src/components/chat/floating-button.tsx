import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";

interface IFloatingButtonProps {
  handleOpen: () => void;
}
export const FloatingButton = ({ handleOpen }: IFloatingButtonProps) => {
  return (
    <CreateButton onClick={handleOpen}>
      <AddIcon fontSize={"inherit"} />
    </CreateButton>
  );
};

const CreateButton = styled.div`
  width: 70px;
  height: 70px;
  position: absolute;
  bottom: 50px;
  right: 16px;
  padding: 3px;
  background: #38d9a9;
  &:hover {
    background: #63e6be;
  }
  color: #ffffff;
  box-sizing: border-box;
  font-size: 60px;
  font-weight: 800;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
`;
