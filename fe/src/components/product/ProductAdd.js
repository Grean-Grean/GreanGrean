import React, { useState } from 'react'
import "./ProductAdd.css"

const SERVER_URL = "http://172.30.1.16:8080"

const ProductAdd = () => {

    const [file, setFile] = useState(null);
    const [imageSrc, setImageSrc] = useState('')
    const filename = ""
    const [obj, setObj] = useState({
        userId: 1,
        productName: "",
        productContent: '',
        productNumber: 0,
        productPrice: 0,
        productImg: '이미지입니다.',
        productCategory: ""
    })

    //handleChangeObj, 오브젝트 변경되면 적용하기
    const handleChangeObj = (e) => {
        console.log(e.target.name)
        console.log(e.target.value)
        // if (e.target.name !== 'productCategory') {
        setObj({
            ...obj,
            [e.target.name]: e.target.value
        })
        // } else {
        //     const newState = { ...obj }
        //     newState.productCategory = [...newState.productCategory, e.target.value]
        //     setObj(newState)
        // }
    }

    //img file 읽어 오기
    const encodeFileToBase64 = (fileBlob) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);
        return new Promise((resolve) => {
            reader.onload = () => {
                setImageSrc(reader.result);
                resolve();
            };
        });
    }

    //+버튼 클릭시 배열에 다음부터 추가해주고 밑에 이미 고른 카테고리 설정
    const addCategory = () => {

    }

    //상품 등록 클릭시 작동
    const sendObj = async () => {
        console.log(JSON.stringify(obj))
        // const formData = new FormData();
        // formData.append('userId', obj.userId);
        // formData.append('productName', obj.productName);
        // formData.append('productContent', obj.productContent);
        // formData.append('productNumber', obj.productNumber);
        // formData.append('productPrice', obj.productPrice);
        // formData.append('productImg', obj.productImg);
        // formData.append('productCategory', obj.productCategory);

        try {
            const response = await fetch(`${SERVER_URL}/product/add`, {
                method: 'POST',
                // 나중에 formdata로 전달할때 쓰셈
                //   headers: {
                //   // 'Content-Type': 'application/json', // 주석 처리
                // },
                // body: formData, // FormData 객체 전달
                headers: {
                    'Content-Type': 'application/json', // 주석 처리
                },
                body: JSON.stringify(obj),
            });

            if (response.ok) {
                alert('상품 등록 성공');
            } else {
                alert('상품 등록 실패');
            }
        } catch (error) {
            console.error('상품 등록 오류:', error);
            alert('상품 등록 중 오류가 발생했습니다.');
        }
    };



    return (
        <div className="ProductDetailPageBackGround">
            <div className="flexwrab">
                <div>
                    <div className="imgArea">
                        {/* 이미지 파일 선택 구역 */}
                        {imageSrc ? <img className="img" src={imageSrc} alt="preview-img" /> : <div className="Text">이미지 없음</div>}
                    </div>
                    <div className="imgSelect Text">
                        <input type='file' onChange={(e) => {
                            encodeFileToBase64(e.target.files[0]);
                        }} />
                        <h2>{filename}</h2>
                    </div>
                </div>

                <div className="ContentArea">
                    {/* 상품명이름 구역 */}
                    <div className="Item Text">등록 상품명 </div>
                    <input
                        name='productName'
                        className="상품명"
                        value={obj.productName}
                        onChange={handleChangeObj}
                        placeholder='상품명을 입력해주세요'
                    />

                    {/* 판매 가격 구역 */}
                    <div className="Item Text">판매 가격</div>
                    <input
                        className="Text"
                        name='productPrice'
                        value={obj.productPrice}
                        onChange={handleChangeObj}
                    />


                    {/* 판매수량 구역 */}
                    <div className="Item Text">판매 수량</div>
                    <input
                        className="Text"
                        name='productNumber'
                        value={obj.productNumber}
                        onChange={handleChangeObj}
                    />
                    {/* 카테고리 추가 구역*/}
                    <div className="Item Text">카테고리 선택</div>
                    {/* 카테고리 */}
                    <select
                        name='productCategory'
                        value={obj.productCategory}
                        onChange={handleChangeObj}
                    >
                        <option selected value={'선택'}>선택</option>
                        <option value={'SPRING'}>봄</option>
                        <option value={'SUMMER'}>여름</option>
                        <option value={'FALL'}>가을</option>
                        <option value={'WINTER'}>겨울</option>
                    </select>
                </div>
            </div>

            <div className="Text" style={{ fontSize: 20 }}>상세 설명 추가</div>
            <textarea
                className="contentArea Text"
                name='productContent'
                value={obj.productContent}
                onChange={handleChangeObj}
                placeholder='상세 설명을 입력해 주세요'
                placeholderColor="black"
            />

            <div
                className="editBottonArea"
                onClick={sendObj}
            >
                <div className="editBotton">상품 등록</div>
            </div>
        </div>

    )
}

export default ProductAdd