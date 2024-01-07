import { useState, useEffect } from "react";
import styles from "./OrderDetail.module.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/userSlice";

function OrderDetail({ orderData }) {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
  const user = useSelector(selectUser);
  const [productDetails, setProductDetails] = useState([]);

  console.log(user.userID);

  return (
    <>
      {orderData.map((order, index) => (
        <div key={index}>
          <div className={styles.ordercard}>
            <div className={styles.image}>이미지 자리</div>
            <div className={styles.inner_text}>
              {/* 서버 연결 후 테스트 필요 */}
              {/* <b>{productDetails[index]?.productName}</b> */}
              <b>점무늬 알로에</b>
              <p>상품 가격 : {productDetails[index]?.productPrice}원</p>
              <p>구매 수량 : {order.purchaseNumber}개</p>
              <p className={styles.price}>
                총 결제 금액 :{" "}
                {productDetails[index]?.productPrice * order.purchaseNumber}원
              </p>
              <div className={styles.bottom}>
                <div className={styles.user_data}>
                  <p>{order.purchaseName}</p>
                  <p>{order.purchaseAddress}</p>
                  <p>{order.purchasePhoneNumber}</p>
                </div>
                <button className={styles.review_button}>리뷰 작성</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default OrderDetail;
