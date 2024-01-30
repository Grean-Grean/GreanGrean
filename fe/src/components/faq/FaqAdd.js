import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./FaqAdd.module.css";

function FaqAdd() {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();

  const [faqData, setFaqData] = useState({
    faqTitle: "",
    faqContent: "",
    userNickName: "admin",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target; // "id"와 "value"를 가져옵니다.
    setFaqData({
      ...faqData,
      [id]: value, // "id"를 키로 사용하여 상태를 업데이트합니다.
    });
  };

  const handleFaqAdd = () => {
    console.log(faqData);
    axios
      .post(`/faq/add`, faqData)
      .then(() => {
        // Handle the response from the server here
        // console.log(response);
      })
      .catch((error) => {
        // Handle errors here
        console.error(error);
        console.log("에러남");
      });

    navigate("/faq");
  };
  return (
    <div className={styles.faqadd_background}>
      <div className={styles.contentcontainer}>
        <div>
          <label className={styles.label} htmlFor="faqtitle">
            제목
          </label>
          <input
            className={styles.faq_title}
            type="text"
            id="faqTitle"
            placeholder="제목을 입력하세요."
            value={faqData.faqTitle}
            onChange={handleInputChange}
          ></input>
        </div>
        <div>
          <label className={styles.label} htmlFor="faqcontent">
            내용
          </label>
          <input
            className={styles.faq_content}
            type="text"
            id="faqContent"
            name="faqContent"
            placeholder="내용을 추가하세요."
            value={faqData.faqContent}
            onChange={handleInputChange}
          ></input>
        </div>
      </div>

      <button className={styles.faqadd_button} onClick={handleFaqAdd}>
        추가하기
      </button>
    </div>
  );
}

export default FaqAdd;
