import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
export const SearchButton = () => {
  return (
    <CreateButton>
      <SearchIcon fontSize={"inherit"} />
    </CreateButton>
  );
};

const CreateButton = styled.div`
  width: 70px;
  height: 70px;
  position: absolute;
  bottom: 130px;
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
