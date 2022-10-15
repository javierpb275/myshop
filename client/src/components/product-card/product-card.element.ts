import styled from "styled-components";

export const Flex = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 150px;
  margin: 0 auto;
`;

export const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 18px;
  width: 325px;
  border: 1px solid black;
  border-radius: 10px;
  background-color: white;
  cursor: pointer;
`;

export const Image = styled.img`
  width: 290px;
  border-radius: 8px;
`;

export const View = styled.img`
  position: absolute;
  top: 120px;
  left: 121px;
  z-index: 1;
  opacity: 1;
`;

export const Title = styled.div`
  margin-top: 5px;
  h1 {
    font-size: 18px;
    :hover {
      cursor: pointer;
      color: red;
    }
  }
  p {
    display: block;
    color: black;
    font-size: 18px;
  }
`;

export const Value = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  span {
    padding-left: 45px;
    font-size: 13px;
    color: black;
  }
  .price {
    position: relative;
    right: 45px;
  }
  .new-price {
    position: relative;
    right: 45px;
    color: red;
    font-size: 15px;
  }
  .previous-price {
    font-size: 12px;
    text-decoration: line-through;
  }
`;
