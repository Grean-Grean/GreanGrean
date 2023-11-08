import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import faqData from "./FaqData";
import FaqDetail from "./FaqDetail";
import styles from "./Faq.module.css";

function Faq() {
  const navigate = useNavigate();
  // const [faqData, setFaqData] = useState([]);

  // useEffect(() => {
  //   axios.get('http://172.30.1.97:8080/faq/list').then((response) => {
  //     // 요청에 대한 응답에서 FAQ 데이터를 추출하여 상태에 설정합니다.
  //     setFaqData(response.data);
  //   });
  // }, []);

  const faqData = [
    {
      faqId: 1,
      faqTitle: "어떻게 구매하나요?",
      faqContent: "어떻게 구매하나요에 대한 자세한 내용",
    },
    {
      faqId: 2,
      faqTitle: "로그인이 안돼요",
      faqContent: "로그인이 안돼요에 대한 자세한 내용",
    },
    {
      faqId: 3,
      faqTitle: "회원 가입이 안돼요",
      faqContent: "회원 가입이 안돼요에 대한 자세한 내용",
    },
    {
      faqId: 4,
      faqTitle: "주문정보를 조회하고 싶어요.",
      faqContent: "주문정보 조회 방법 상세설명",
    },
    {
      faqId: 5,
      faqTitle: "환불은 어떻게 하나요?",
      faqContent: "환불에 대한 상세설명",
    },
    {
      faqId: 6,
      faqTitle: "판매등록은 어떻게 하나요?",
      faqContent: "판매등록 상세설명",
    },
  ];

  function goToFaqAdd() {
    navigate("/faq/register");
  }

  return (
    <body className={styles.faq_background}>
      <div className={styles.content}>
        <h1 className={styles.faq_header}>FAQs</h1>
        <FaqDetail faqData={faqData} />
        <div>
          <button className={styles.faq_add_button} onClick={goToFaqAdd}>
            추가하기
          </button>
        </div>
      </div>
    </body>
  );
}

export default Faq;
