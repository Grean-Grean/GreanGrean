import Sidebar from "./Sidebar";
import SellList from "./SellList";
import styles from "./SellManagement.module.css";

const SellManagement = () => {
  const sellData = [
    {
      userId: 1,
      productId: 123,
      purchaseName: "최진아",
      purchaseAddress: "대전 유성구 원내동 92-6번지 501호",
      purchaseNumber: 1,
      purchasePhoneNumber: "010-1111-2222",
    },
  ];

  return (
    <Sidebar>
      <h2 className={styles.title}>마이페이지 - 판매 접수</h2>
      <hr className={styles.bar} />
      <SellList sellData={sellData} />
    </Sidebar>
  );
};

export default SellManagement;
