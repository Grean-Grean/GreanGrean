import React, { useState } from "react";
import faqData from "./FaqData";
import classes from "./Accordion.module.css"; // 별도의 CSS 파일을 가져옵니다.

function FAQAccordion() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState(null);

  const toggleCategory = (categoryId) => {
    if (activeCategory === categoryId) {
      setActiveCategory(null);
    } else {
      setActiveCategory(categoryId);
    }
  };

  const toggleQuestion = (questionId) => {
    if (activeQuestion === questionId) {
      setActiveQuestion(null);
    } else {
      setActiveQuestion(questionId);
    }
  };

  return (
    <div className="faq-accordion">
      {faqData.map((category) => (
        <div key={category.id} className={classes.category}>
          <div
            className={`category-header ${
              activeCategory === category.id ? "active" : ""
            }`}
            onClick={() => toggleCategory(category.id)}
          >
            {category.category}
          </div>
          {activeCategory === category.id && (
            <div className={classes.question}>
              {category.questions.map((question) => (
                <div key={question.id} className="question">
                  <div
                    className={`question-text ${
                      activeQuestion === question.id ? "active" : ""
                    }`}
                    onClick={() => toggleQuestion(question.id)}
                  >
                    {question.question}
                  </div>
                  {activeQuestion === question.id && (
                    <div className={classes.answer}>{question.answer}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default FAQAccordion;
