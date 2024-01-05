import { useState } from "react";
import Sidebar from "./Sidebar";
import SellList from "./SellList";
import styles from "./SellManagement.module.css";
import axios from "axios";

const SellManagement = () => {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;

  // const [sellData, setSellData] = useState([]);

  // // api 주소 추가하기
  // useEffect(() => {
  //   axios.get(``).then((response) => {
  //     setFaqData(response.data);
  //   });
  // }, []);

  const sellData = [
    // 예시데이터
    {
      userId: 1,
      productId: "ss547734",
      purchaseId: 1001231,
      purchaseTime: "23/09/26 17:22",
      purchaseNumber: 1,
      purchaseName: "최진아",
      purchaseAddress: "대전 유성구 원내동 92-6번지 501호",
      purchasePhoneNumber: "010-1111-2222",
    },
    {
      userId: 2,
      productId: "dd346766",
      purchaseId: 1001232,
      purchaseTime: "24/01/31 20:22",
      purchaseNumber: 3,
      purchaseName: "이혜진",
      purchaseAddress: "대전 유성구 장대동 123-456, 00빌라 221호",
      purchasePhoneNumber: "010-1235-1234",
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
