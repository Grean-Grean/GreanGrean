import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Styles from "./FaqAdd.module.css";

function FaqAdd() {
  const navigate = useNavigate();

  const [faqData, setFaqData] = useState({
    faqTitle: "",
    faqContent: "",
    userNickName: "admin",
  });

  console.log(faqData);

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
      .post("http://172.30.1.97:8080/faq/add", faqData)
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
    <div className={Styles.faqadd_background}>
      <div>
        <label className={Styles.label} htmlFor="faqtitle">
          제목
        </label>
        <input
          className={Styles.faq_title}
          type="text"
          id="faqTitle"
          placeholder="제목을 입력하세요."
          value={faqData.faqTitle}
          onChange={handleInputChange}
        ></input>
      </div>
      <div>
        <label className={Styles.label} htmlFor="faqcontent">
          내용
        </label>
        <input
          className={Styles.faq_content}
          type="text"
          id="faqContent"
          name="faqContent"
          placeholder="내용을 추가하세요."
          value={faqData.faqContent}
          onChange={handleInputChange}
        ></input>
      </div>
      <button className={Styles.faqadd_button} onClick={handleFaqAdd}>
        추가하기
      </button>
    </div>
  );
}

export default FaqAdd;
