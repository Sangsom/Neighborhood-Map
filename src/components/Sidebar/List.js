import styled from "styled-components";

export const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const ListItem = styled.li`
  padding: 20px 15px;
  color: #1c1c33;
  background: #ffcd4c;
  border-bottom: 2px solid #1c1c33;
  border-right: 1px solid #1c1c33;
  border-radius: 3px;
  transition: all 0.5s;

  &:hover {
    background: #ffae2d;
    cursor: pointer;
    color: #3f5468;
  }
`;
