import React, { useState } from "react";
import classes from "./Accordion.module.css"; // CSS 파일을 불러옵니다.

function Accordion({ item, onToggle, onUpdate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedAnswer, setEditedAnswer] = useState(item.answer);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
    onToggle(item.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleConfirm = () => {
    // 수정된 내용을 업데이트하기 전에 상태를 업데이트해야 합니다.
    const updatedItem = { ...item, answer: editedAnswer }; // 기존 항목을 복사하고 answer를 업데이트합니다.
    onUpdate(item.id, updatedItem);
    setIsEditing(false); // 수정 모드를 종료합니다.
  };

  return (
    <div className={`accordion-item ${isOpen ? "open" : ""}`}>
      <div className="accordion-title" onClick={toggleAccordion}>
        <h5 className={classes.text}>{item.question}</h5>
        {isEditing ? (
          <>
            <button className="accordion-button" onClick={handleConfirm}>
              확인
            </button>
          </>
        ) : (
          <>
            <button className="accordion-button" onClick={handleEdit}>
              {isOpen ? "수정하기" : "열림"}
            </button>
          </>
        )}
      </div>
      {isEditing ? (
        <textarea
          className="accordion-edit-textarea"
          value={editedAnswer}
          onChange={(e) => setEditedAnswer(e.target.value)}
        />
      ) : (
        isOpen && <div className="accordion-content">{item.answer}</div>
      )}
    </div>
  );
}

export default Accordion;
