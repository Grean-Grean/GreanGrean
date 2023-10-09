import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Styles from "./Faq.module.css";
import faqData from "./FaqData";
import Accordion from "./Accordion";
import FaqAdd from "./FaqAdd";

function Faq() {
  const navigate = useNavigate();

  const [openItem, setOpenItem] = useState(null);
  const [faqItems, setFaqItems] = useState(faqData); // faqData 배열을 초기 데이터로 사용합니다.
  const categories = faqData.map((item) => item.category); // 카테고리 목록을 추출합니다.

  const toggleItem = (itemId) => {
    if (openItem === itemId) {
      setOpenItem(null);
    } else {
      setOpenItem(itemId);
    }
  };

  const handleAddFAQ = (newItem) => {
    const updatedFaqItems = [...faqItems]; // 기존 FAQ 항목 복사

    // 카테고리 별로 FAQ 항목을 그룹화
    const categoryIndex = updatedFaqItems.findIndex(
      (category) => category.category === newItem.category
    );

    if (categoryIndex !== -1) {
      // 이미 해당 카테고리가 존재하는 경우
      const newQuestion = {
        id: updatedFaqItems[categoryIndex].questions.length + 1,
        question: newItem.question,
        answer: newItem.answer,
      };
      updatedFaqItems[categoryIndex].questions.push(newQuestion);
    } else {
      // 새로운 카테고리인 경우
      updatedFaqItems.push({
        category: newItem.category,
        questions: [
          {
            id: 1,
            question: newItem.question,
            answer: newItem.answer,
          },
        ],
      });
    }

    setFaqItems(updatedFaqItems);
  };

  const handleUpdateFAQ = (itemId, updatedItem) => {
    const updatedFaqItems = [...faqItems];

    // FAQ 항목을 찾아서 업데이트
    for (const category of updatedFaqItems) {
      const updatedQuestions = category.questions.map((question) =>
        question.id === itemId ? updatedItem : question
      );
      category.questions = updatedQuestions;
    }

    setFaqItems(updatedFaqItems);
  };

  return (
    <div className="App">
      <h1>FAQ 페이지</h1>
      {faqItems.map((category) => (
        <div key={category.id}>
          <h2>{category.category}</h2>
          {category.questions.map((item) => (
            <Accordion
              key={item.id}
              item={item}
              onToggle={toggleItem}
              onUpdate={(itemId, updatedItem) =>
                handleUpdateFAQ(itemId, updatedItem)
              }
            />
          ))}
        </div>
      ))}

      <FaqAdd categories={categories} onAddFAQ={handleAddFAQ} />
    </div>
  );
}

export default Faq;
