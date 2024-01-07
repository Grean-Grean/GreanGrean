import styles from "./SellList.module.css";
import axios from "axios";

const SellList = ({ sellData }) => {
  // console.log(sellData);

  const purchaseAccept = (purchaseId) => {
    console.log(`${purchaseId} 구매 확인`);
    /**
    axios
      .post(`/purchase/accept`, purchaseId)
      .then(() => {
        console.log("구매 확인");
      })
      .catch((error) => {
        console.error("구매 확인 오류:", error);
      });
       */
  };

  const purchaseRefuse = (purchaseId) => {
    console.log(`${purchaseId} 구매 거절`);
    /**
    axios
      .post(`/purchase/refuse`, purchaseId)
      .then(() => {
        console.log("구매 거절");
      })
      .catch((error) => {
        console.error("거절 오류:", error);
      });
       */
  };
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>주문 코드</th>
            <th>상품 코드</th>
            <th>주문 날짜</th>
            <th>주문 수량</th>
            <th>결제 금액</th>
            <th>주문자명</th>
            <th>배송지</th>
            <th>전화번호</th>
            <th>배송 여부</th>
          </tr>
        </thead>
        <tbody>
          {sellData.map((sell, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{sell.purchaseId}</td>
              {/* 상품 코드에 상품 페이지 하이퍼링크 걸기 */}
              <td>{sell.productId}</td>
              <td>{sell.purchaseTime}</td>
              <td>{sell.purchaseNumber} 개</td>
              <td>{sell.purchasePrice * sell.purchaseNumber} 원</td>
              <td>{sell.purchaseName}</td>
              <td>{sell.purchaseAddress}</td>
              <td>{sell.purchasePhoneNumber}</td>
              <td>
                <button
                  className={styles.complete_button}
                  onClick={() => purchaseAccept(sell.productId)}
                >
                  완료
                </button>
                <button
                  className={styles.reject_button}
                  onClick={() => purchaseRefuse(sell.productId)}
                >
                  거절
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SellList;
