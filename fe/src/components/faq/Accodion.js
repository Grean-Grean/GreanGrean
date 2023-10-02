import React, { useState, useRef, useCallback } from "react";
import styled from "styled-components";

function Accordion(props) {
  const parentRef = useRef(null);
  const childRef = useRef(null);
  const [isCollapse, setIsCollapse] = useState(false);

  const handleButtonClick = useCallback((event) => {
    event.stopPropagation();
    if (parentRef.current === null || childRef.current === null) {
      return;
    }
    if (parentRef.current.clientHeight > 0) {
      parentRef.current.style.height = "0";
      parentRef.current.style.background = "white";
    } else {
      parentRef.current.style.height = `${childRef.current.clientHeight}px`;
      parentRef.current.style.background = "lightgray";
    }
    setIsCollapse(!isCollapse);
  }, [isCollapse]);

  const parentRefHeight = parentRef.current?.style.height ?? "0px";
  const buttonText = parentRefHeight === "0px" ? "열기" : "닫기";

  return (
    <Container>
      <Header onClick={handleButtonClick}>
        {props.title}
        <Button>{buttonText}</Button>
      </Header>
      <ContentsWrapper ref={parentRef}>
        <Contents ref={childRef}>{props.contents}</Contents>
      </ContentsWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  border-radius: 4px;
  border: 1px solid silver;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 32px;
  margin: 0 32px 0 8px;
`;

const Button = styled.div`
  top: 8px;
  right: 8px;
  font-size: 14px;
  position: absolute;
`;

const ContentsWrapper = styled.div`
  height: 0;
  width: inherit;
  padding: 0 8px;
  overflow: hidden;
  transition: height 0.35s ease, background 0.35s ease;
`;

const Contents = styled.div`
  padding: 0.1px;
`;

export default Accordion;
