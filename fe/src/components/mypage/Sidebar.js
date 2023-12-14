import React from "react";
import styled from "styled-components";
import OrderInformation from "./OrderInfo";
import Menu from "./sidebar/Menu";
import UserInfo from "./UserInfo";
import styles from "./Sidebar.module.css";

// const Container = styled.div`
//   width: 100%;
//   height: 100vh;
//   display: flex;
// `;

// const NavBar = styled.div`
//   width: 300px;
//   height: 100%;
//   background-color: ${({ theme }) => theme.secondary};
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   position: relative;
// `;

// const ContentContainer = styled.div`
//   width: 100%;
//   height: 100%;
// `;

const Sidebar = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <Menu />
      </div>
      <div className={styles.contentcontainer}>{children}</div>
    </div>
  );
};

export default Sidebar;
