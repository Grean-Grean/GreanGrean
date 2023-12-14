import React from "react";
import styled from "styled-components";
import MenuItem from "./MenuItem";

const Container = styled.div`
  ul {
    margin: 10px;
    padding: 10px;
  }
`;

const menuList = [
  { menuName: "주문 정보", path: "/mypage/orders" },
  { menuName: "회원 정보", path: "/mypage/info" },
  { menuName: "상품 관리", path: "/mypage/products" },
  { menuName: "판매 관리", path: "/mypage/sells" },
];

const Menu = () => {
  return (
    <Container>
      <ul>
        {menuList.map((data) => {
          return (
            <MenuItem
              key={data.menuName}
              menuName={data.menuName}
              path={data.path}
            />
          );
        })}
      </ul>
    </Container>
  );
};

export default Menu;