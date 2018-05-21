import styled from "styled-components";

export const Button = styled.button`
  width: 100%;
  font-size: 16px;
  padding: 10px 15px;
  background: transparent;
  border: 1px solid #3f5468;
  margin-bottom: 10px;
  border-radius: 8px;
  transition: all 0.5s;

  &:hover {
    cursor: pointer;
    background: #b8e4c9;
    color: #3f5468;
  }
`;
