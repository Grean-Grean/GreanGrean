import styles from "./SellCompletedList.module.css";

const SellCompletedList = ({}) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>상품 코드</th>
            <th>주문 날짜</th>
            <th>배송지</th>
            <th>전화번호</th>
            <th>배송 확인</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>RJSI0023</td>
            <td>23/09/26 17:22</td>
            <td>대전광역시 유성구 와룡로 136번길 15, 하늘바람휴먼시...</td>
            <td>000-0000-0000</td>
            <td>
              <button className={styles.reject_button}>취소</button>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>RJSI0023</td>
            <td>23/09/26 17:22</td>
            <td>대전광역시 유성구 와룡로 136번길 15, 하늘바람휴먼시...</td>
            <td>000-0000-0000</td>
            <td>
              <button className={styles.reject_button}>취소</button>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>RJSI0023</td>
            <td>23/09/26 17:22</td>
            <td>대전광역시 유성구 와룡로 136번길 15, 하늘바람휴먼시...</td>
            <td>000-0000-0000</td>
            <td>
              <button className={styles.reject_button}>취소</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SellCompletedList;
