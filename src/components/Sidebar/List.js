import styled from "styled-components";

export const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const ListItem = styled.li`
  padding: 20px 15px;
  background: #b8e4c9;
  border-bottom: 2px solid #3f5468;
  border-right: 1px solid #3f5468;
  border-radius: 3px;
  transition: all 0.5s;

  &:hover {
    background: #e9fadd;
    cursor: pointer;
    color: #3f5468;
  }
`;
