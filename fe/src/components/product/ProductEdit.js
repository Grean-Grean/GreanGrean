import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"

const SERVER_URL = "http://172.30.1.16:8080"

// 보낼 데이터
// {userId : Long,
//     sellerId : Long,
//     productId : Long,
//     productName : String,
//     productContent : String,
//     productNumber : Integer,
//     productPrice : Integer,
//     productImg : String,
//     productCategory : ProductStatus}

// {"sellerId":1,"productId":2,"productName":"알로에","productContent":"디테일입니","productNumber":1000,"productPrice":1000,"productImg":"이미지입니다","productCreateTime":"2023-10-02T16:50:27.772121","productModifyTime":null,"productCategory":"SPRING","review":null,"userId":1}

const ProductEdit = ({ state }) => {
    const location = useLocation()
    const locationState = location.state
    const [item, setItem] = useState({ ...locationState, userId: 1 });
    const [file, setFile] = useState(null);
    const [imageSrc, setImageSrc] = useState('')
    const filename = ""


    const handleChangeItem = (e) => {
        setItem({
            ...item,
            [e.target.name]: e.target.value
        })
    }

    //img 받아오기
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

    //수정하기 클릭시 작동
    const sendObj = () => {
        const returndata = {
            userId: item.userId,
            sellerId: item.sellerId,
            productId: item.productId,
            productName: item.productName,
            productContent: item.productContent,
            productNumber: item.productNumber,
            productPrice: item.productPrice,
            productImg: item.productImg,
            productCategory: item.productCategory,
        }
        console.log(returndata)
        axios
            .put(`${SERVER_URL}/product/modify`, returndata)
            .then((response) => {
                console.log("/product/modify 성공")
            })
            .catch((error) => {
                // Handle errors here
                console.error(error);
            });
    };

    //상품 삭제 ***수정 해야함***
    const deleteProduct = async () => {
        try {
            const response = await fetch(`${SERVER_URL}/product/delete/${item.productId}/${item.userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json', // 주석 처리
                },
            });

            if (response.ok) {
                console.log('삭제 성공')
                alert('상품 삭제 성공');
            } else {
                alert('상품 삭제 실패');
            }
        } catch (error) {
            console.error('상품 삭제 오류:', error);
            alert('상품 삭제 중 오류가 발생했습니다.');
        }
    };




    return (
        <div >
            {/* 이미지 파일 선택 구역 */}
            {imageSrc ? <img src={imageSrc} alt="preview-img" /> : <div>이미지 없음</div>}
            <div />
            <div >
                <input type='file' onChange={(e) => {
                    encodeFileToBase64(e.target.files[0]);
                }} />
                <h2>{filename}</h2>


            </div>
            {/* 상품명이름 구역 */}
            <div >등록 상품명 </div>
            <input
                name='productName'
                className="상품명"
                value={item.productName}
                onChange={handleChangeItem}
                placeholder='상품명을 입력해주세요'
            />

            {/* 판매 가격 구역 */}
            <div >판매 가격</div>
            <input
                className="Rectangle73"
                name='productPrice'
                value={item.productPrice}
                onChange={handleChangeItem}
            />
            <div >원</div>


            {/* 판매수량 구역 */}
            <div >판매 수량</div>
            <input
                className="Rectangle75"
                name='productNumber'
                value={item.productNumber}
                onChange={handleChangeItem}
            />
            <div>개</div>


            <div >상세 설명 추가</div>

            {/* 카테고리 추가 구역*/}
            <div >카테고리 추가</div>
            {/* 카테고리 */}
            <div className="Rectangle23" />
            {/* '+' */}
            <div
                className="Group24"


            >
                <div className="Ellipse7" />
                <div >+</div>
            </div>
            <select
                name='productCategory'
                value={item.productCategory}
                onChange={handleChangeItem}
            >
                <option selected value={'선택'}>선택</option>
                <option value={'SPRING'}>봄</option>
                <option value={'SUMMER'}>여름</option>
                <option value={'FALL'}>가을</option>
                <option value={'WINTER'}>겨울</option>
            </select>

            {/* 이미 선택된 카테고리 */}
            <div className="Rectangle76" />
            {/* '- */}
            <div className="Group36" >
                <div className="Ellipse7" />
                <div >-</div>
            </div>
            <div >{item.productCategory}</div>
            <textarea
                className="Rectangle78"
                name='productContent'
                value={item.productContent}
                onChange={handleChangeItem}
                placeholder='상세 설명을 입력해 주세요'
                placeholderColor="black"
            />


            <div
                className="Group30"
                onClick={sendObj}
            >
                <div className="Rectangle22" />
                <div >상품 수정</div>
            </div>

            <div
                className="Group30"
                onClick={deleteProduct}
            >
                <div className="Rectangle22" />
                <div >상품 삭제</div>
            </div>
        </div >

    )
}

export default ProductEdit