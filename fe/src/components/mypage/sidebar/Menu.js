import React from "react";
import styled from "styled-components";
import MenuItem from "./MenuItem";
import styles from "./Memu.module.css";

const Container = styled.div`
  ul {
    margin: 10px;
    padding: 10px;
  }
`;

const menuList = [
  { menuName: "내 주문 정보", path: "/mypage/orders" },
  { menuName: "회원 정보 수정", path: "/mypage/info" },
  { menuName: "등록 상품 관리", path: "/mypage/products" },
  { menuName: "상품 판매 접수", path: "/mypage/sells" },
  { menuName: "상품 판매 완료", path: "/mypage/complements" },
];

const Menu = () => {
  return (
    <div className={styles.container}>
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
    </div>
  );
};

export default Menu;
