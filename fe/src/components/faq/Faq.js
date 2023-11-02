import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import faqData from "./FaqData";
import FaqAdd from "./FaqAdd";
import FaqDetail from "./FaqDetail";
import styles from "./Faq.module.css";

function Faq() {
  const navigate = useNavigate();
  const [faqData, setFaqData] = useState([]);

  useEffect(() => {
    axios.get('http://172.30.1.97:8080/faq/list').then((response) => {
      // 요청에 대한 응답에서 FAQ 데이터를 추출하여 상태에 설정합니다.
      setFaqData(response.data);
    });
  }, []);

  // const faqData = [
  //   {
  //     faqId: 1,
  //     faqTitle: "FAQ 1",
  //     faqContent: "FAQ 1의 내용입니다.",
  //   },
  //   {
  //     faqId: 2,
  //     faqTitle: "FAQ 2",
  //     faqContent: "FAQ 2의 내용입니다.",
  //   },
  //   {
  //     faqId: 3,
  //     faqTitle: "FAQ 3",
  //     faqContent: "FAQ 3의 내용입니다.",
  //   },
  // ];

  function goToFaqAdd() {
    navigate("/faq/register");
  }

  return (
    <body className={styles.faq_background}>
      <div className={styles.content}>
        <h1 className={styles.faq_header}>FAQs</h1>
        <FaqDetail faqData={faqData} />
        <div>
          <button className={styles.btn} onClick={goToFaqAdd}>추가하기</button>
        </div>
      </div>
    </body>
  );
}

export default Faq;
