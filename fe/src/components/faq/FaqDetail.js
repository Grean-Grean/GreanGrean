import React, { useState } from "react";
import styles from "./FaqDetail.module.css"; // CSS 모듈 가져오기

function FaqDetail({ faqData }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleAccordion = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
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
              <div className={`${styles["faq-content"]} ${styles.active}`}>
                {faq.faqContent}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default FaqDetail;
