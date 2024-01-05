import React from "react";
import Sidebar from "./Sidebar";
import SellCompletedList from "./SellCompletedList";
import styles from "./SellCompleted.module.css";

const SellCompleted = ({}) => {
  return (
    <Sidebar>
      <div>
        <h2 className={styles.title}>마이페이지 - 판매 완료</h2>
        <hr className={styles.bar} />
        <SellCompletedList />
      </div>
    </Sidebar>
  );
};

export default SellCompleted;
