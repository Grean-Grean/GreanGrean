// src/FaqAdd.js

import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function FaqAdd({ categories, onAddFAQ }) {
  // const location = useLocation();

  const [newQuestion, setNewQuestion] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  // const { categories, onAddFAQ } = location.state || {};

  // console.log(categories);
  // console.log(onAddFAQ);

  const handleAddFAQ = () => {
    if (
      newQuestion.trim() === "" ||
      selectedCategory.trim() === "" ||
      newAnswer.trim() === ""
    ) {
      // 필수 입력 필드가 비어있으면 추가하지 않음
      return;
    }

    // 새로운 FAQ 항목을 추가하는 코드
    const newItem = {
      category: selectedCategory,
      question: newQuestion,
      answer: newAnswer,
    };

    onAddFAQ(newItem);

    // 입력 필드 초기화
    setNewQuestion("");
    setSelectedCategory("");
    setNewAnswer("");
  };

  return (
    <div className="add-faq">
      <h2>새로운 FAQ 추가하기</h2>
      <input
        type="text"
        placeholder="제목"
        value={newQuestion}
        onChange={(e) => setNewQuestion(e.target.value)}
      />
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">카테고리 선택</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <textarea
        placeholder="내용"
        value={newAnswer}
        onChange={(e) => setNewAnswer(e.target.value)}
      ></textarea>
      <button onClick={handleAddFAQ}>추가하기</button>
    </div>
  );
}

export default FaqAdd;
