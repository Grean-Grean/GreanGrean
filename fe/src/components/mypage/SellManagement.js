import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/userSlice";
import Sidebar from "./Sidebar";
import SellList from "./SellList";
import styles from "./SellManagement.module.css";
import axios from "axios";

const SellManagement = () => {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;

  const user = useSelector(selectUser);
  console.log(user.userNickName);
  console.log(user.userID);

  // const [sellData, setSellData] = useState([]);

  // api 주소 추가하기
  // useEffect(() => {
  //   axios
  //     .get(`/user/orderhistory/${user.userID}`)
  //     .then((response) => {
  //       console.log(response.data);
  //       setSellData(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  const sellData = [
    // 예시데이터
    {
      purchaseId: 1231234,
      productId: "ss547734",
      purchaseTime: "23/09/26 17:22",
      purchaseNumber: 1,
      purchaseName: "홍길동",
      purchaseAddress: "00시 00구 00번길 00-1, 2001호",
      purchasePrice: 1000,
      purchasePhoneNumber: "010-1111-2222",
    },
    {
      productId: "dd346766",
      purchaseId: 1001232,
      purchaseTime: "24/01/31 20:22",
      purchaseNumber: 3,
      purchaseName: "이혜진",
      purchasePrice: 5000,
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
