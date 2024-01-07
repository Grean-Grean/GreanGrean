import React from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import OrderDetail from "./OrderDetail";
import styles from "./OrderInfo.module.css";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/userSlice";

function OrderInfo() {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;

  const user = useSelector(selectUser);
  console.log(user.userNickName);
  console.log(user.userID);

  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    axios
      .get(`/user/purchasehistory/${user.userID}`)
      .then((response) => {
        setOrderData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  console.log(orderData);

  // const orderData = [
  //   {
  //     userId: 1,
  //     productId: 123,
  //     purchaseName: "최진아",
  //     purchaseAddress: "대전 유성구 원내동 92-6번지 501호",
  //     purchaseNumber: 1,
  //     purchasePhoneNumber: "010-1111-2222",
  //   },
  //   {
  //     userId: 1,
  //     productId: 124,
  //     purchaseName: "이혜진",
  //     purchaseAddress: "대전 유성구 00동 00번지 0000호",
  //     purchaseNumber: 2,
  //     purchasePhoneNumber: "010-1111-3333",
  //   },
  //   {
  //     userId: 1,
  //     productId: 125,
  //     purchaseName: "박재현",
  //     purchaseAddress: "대전 서구 00번로 00 503호",
  //     purchaseNumber: 3,
  //     purchasePhoneNumber: "010-1111-4444",
  //   },
  // ];

  return (
    <Sidebar>
      <h2 className={styles.title}>마이페이지 - 주문 정보</h2>
      <hr className={styles.bar} />
      <OrderDetail orderData={orderData} />
    </Sidebar>
  );
}

export default OrderInfo;
