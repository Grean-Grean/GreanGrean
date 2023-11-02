import React, { useState, useRef } from "react";
import styles from "./FaqDetail.module.css"; // CSS 모듈 가져오기
import axios from "axios";

function FaqDetail({ faqData }) {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [editModeIndex, setEditModeIndex] = useState(null);

  /**사용자 아이디 일반 사용자/admin 구분 코드 추가 필요 */
  const [faqEditData, setFaqEditData] = useState({
    faqId: "",
    faqTitle: "",
    faqContent: "",
    userNickName: "admin",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFaqEditData({
      ...faqEditData,
      [name]: value,
    });
  };

  const toggleAccordion = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  const toggleEditMode = (index) => {
    if (editModeIndex === index) {
      setEditModeIndex(null);
    } else {
      setEditModeIndex(index);
    }
  };
  //     if (editModeIndex === index) {
  //       // Axios를 통해 백엔드에서 FAQ 내용을 업데이트하는 부분을 처리합니다.
  //       // 백엔드 API와 함께 이 부분을 구현해야 합니다.
  //       // 업데이트 후, 수정 모드를 다시 false로 설정합니다.

  //       console.log("faqid : ", faq.faqId);

  //       setFaqEditData({
  //         ...faqEditData, // 기존의 다른 속성을 유지
  //         faqContent: editedContent, // faqContent 속성만 업데이트
  //       });

  //       //   console.log(faqEditData);

  //       const updatedFaqEditData = {
  //         ...faqEditData, // 기존의 다른 속성을 유지
  //         faqId: faq.faqId,
  //         faqTitle: faq.faqTitle,
  //         faqContent: editedContent, // faqContent 속성만 업데이트
  //       };

  //       console.log(updatedFaqEditData); // 업데이트된 faqEditData 출력

  //       axios
  //         .put(`http://172.30.1.100:8080/faq/modify/${faq.faqid}`, faqEditData)
  //         .then(() => {
  //           toggleEditMode(index);
  //         })
  //         .catch((error) => {
  //           console.error("FAQ 업데이트 오류:", error);
  //         });

  //       toggleEditMode(index); // 수정 모드를 false로 설정합니다 (수정 -> 확인)
  //     } else {
  //       toggleEditMode(index); // 수정 모드를 true로 설정합니다 (수정 -> 확인)
  //     }
  //   };

  const faqModify = (faq, index) => {
    if (editModeIndex === index) {
      /* Axios를 통해 백엔드에서 FAQ 내용을 업데이트하는 부분/ 업데이트 후, 수정 모드를 다시 false로 설정*/

      // console.log("faqId : ", faq.faqId);
      console.log("수정모드 내용 확인: ", faqEditData);

      axios
        .put(`http://172.30.1.97:8080/faq/modify`, faqEditData)
        .then(() => {
          toggleEditMode(index);
          // 성공적으로 수정데이터 전송 후 기존 editdata 초기화
          setFaqEditData({
            faqId: "",
            faqTitle: "",
            faqContent: "",
            userNickName: "admin",
          });
        })
        .catch((error) => {
          console.error("FAQ 업데이트 오류:", error);
        });

      toggleEditMode(index); // 수정 모드를 false로 설정합니다 (수정 -> 확인)
    } else {
      toggleEditMode(index); // 수정 모드를 true로 설정합니다 (수정 -> 확인)
      //선택한 faq로 초기화
      faqEditData.faqId = faq.faqId;
      faqEditData.faqTitle = faq.faqTitle;
      faqEditData.faqContent = faq.faqContent;

      console.log("faqEditData: ", faqEditData);
    }
  };

  const faqDelete = (faq) => {
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    let deleteFaq = {
      faqId: "",
      userNickName: "admin",
    };

    if (confirmDelete) {
      // 삭제 확인 시
      deleteFaq = {
        ...deleteFaq,
        faqId: faq.faqId,
      };

      console.log("delete Faq:", deleteFaq);

      axios
        .delete(`http://172.30.1.97:8080/faq/delete?userNickName=${deleteFaq.userNickName}&faqId=${deleteFaq.faqId}`)
        .then(() => {
          // 삭제 성공 시, 화면에서도 해당 FAQ를 삭제합니다.
          const updatedFaqData = faqData.filter(
            (item) => item.faqid !== faq.faqid
          );
          setExpandedIndex(null);
          setEditModeIndex(null);
          setFaqEditData(updatedFaqData);
        })
        .catch((error) => {
          console.error("FAQ 삭제 오류:", error);
        });

      console.log("삭제되었습니다.");
    }
  };

  return (
    <div className={styles["faq-container"]}>
      {faqData.map((faq, index) => (
        <div key={faq.faqid}>
          <div className={styles["faq-title-content-divider"]} />
          <div className={styles["faq-title"]}>
            <span onClick={() => toggleAccordion(index)}>{faq.faqTitle}</span>
            <span
              className={styles["icon"]}
              onClick={() => toggleAccordion(index)}
            >
              {expandedIndex === index ? "▲" : "▼"}
            </span>
          </div>
          <div className={styles["faq-divider"]} />
          {expandedIndex === index && (
            <div>
              {editModeIndex === index ? (
                <textarea
                  typeof="text"
                  id="faqContent"
                  name="faqContent"
                  value={faqEditData.faqContent}
                  onChange={handleInputChange}
                />
              ) : (
                <div className={`${styles["faq-content"]} ${styles.active}`}>
                  {faq.faqContent}
                </div>
              )}
              <div className={`${styles["gray-box"]}`}>
                <button onClick={() => faqModify(faq, index)}>
                  {editModeIndex === index ? "확인" : "수정"}
                </button>
                <button onClick={() => faqDelete(faq)}>삭제</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default FaqDetail;
