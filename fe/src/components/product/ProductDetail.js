import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import './ProductDetail.css'

import ProductContentPage from "./ProductContentPage"
import ProductReviewPage from "./ProductReviewPage"

const SERVER_URL = "http://172.30.1.16:8080"

const dummyList =
{
    productId: 1,
    productImg: '',
    productName: '튤립',
    productPrice: 5000,
    productNumber: 5,
    productCategory: 'spring',
    productContent: '봄의 대표 꽃 튤립 싸다! 싸!, 이걸로 예전엔 집을 샀다고요? 저도 그때로 가고 싶네요!',
    review: [
        {
            id: 1,
            content: '내용',
            userNickName: "예비유미학살자",
            reviewContent: "튤립으로 봄에 인테리어를 하니까 집이 확 살아요!"
        },
        {
            id: 2,
            userNickName: "호1구호랑이입",
            reviewContent: "호1구 뜻은 호랑이입이란 뜻입니다!"
        }
    ]
}



const ProductDetail = () => {

    //이전 페이지에서 정보 받아 오기
    const location = useLocation()
    const locationState = location.state
    const [item, setItem] = useState([])
    const [number, setNumber] = useState(0)
    const navigate = useNavigate()

    const [isOpenContent, setIsOpenContent] = useState(false)
    const [isOpenReview, setIsOpenReview] = useState(false)


    //data
    // 200 ok
    // {productId : Long,
    // productName : String,
    // productContent : String,
    // productNumber : Integer,
    // productPrice : Integer,
    // productImg : String,
    // productCreateTime : LocalDateTime,
    // productModifyTime : LocalDateTime,
    // productCategory : ProductStatus
    // review : List<Review>}
    // /product/detail/{productId}

    const getItem = async () => {

        fetch(`${SERVER_URL}/product/detail/${locationState.productId}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(res => {
                console.log(1, res);
                setItem(res);
            })
    }


    // /product/detail/{productId}
    // //첫 화면에 데이터 받기
    useEffect(() => {
        console.log("product Detail page 데이터 get~")
        getItem();
        console.log(item)
    }, [])


    const addNumber = () => {
        let num = number
        if (num + 1 <= item.productNumber) {
            setNumber(num + 1)
        } else {
            alert(`재고가 ${item.productNumber}개까지 있습니다.`)
        }
    }

    const minusNumber = () => {
        let num = number
        if (num - 1 >= 0) {
            setNumber(num - 1)
        } else {
            alert(`0개 이상 구매해야합니다.`)
        }
    }

    const clickBuyBotton = () => {
        navigate(`/shop/product/buy/${item.productId}`, { state: item })
    }

    const clickEditBotton = () => {
        navigate(`/shop/product/edit/${item.productId}`, { state: item })
    }

    const openContentAreaHandler = () => {
        setIsOpenContent(!isOpenContent)

    }

    const openReviewAreaHandler = () => {
        setIsOpenReview(!isOpenReview)
    }


    return (
        <div className="page">

            <div className="flexwrab">
                <div className="imgArea">
                    <img className="img" />
                </div>

                <div className="nameArea">
                    <h2 className="name Text" >이름 : {item.productName}</h2>
                    <h2 className="smallContent Text" style={{ fontSize: '1.5rem', marginBottom: '100px' }}>짧은 설명 어쩌구 저꺼주</h2>

                    <div>
                        <div className="priceArea">
                            <h2 className="Text">가격 : </h2>
                            <h2 className="Text">{item.productPrice}원</h2>
                        </div>
                        <div className="priceArea">
                            <h2 className="Text">구매 수량 : </h2>
                            <h2 className="Text">{number}</h2>
                            <h2 className="Text">개</h2>
                            <button onClick={addNumber}>+</button>
                            <button onClick={minusNumber}>-</button>
                        </div>

                        <div className="buyBotton Text" onClick={clickBuyBotton}>
                            바로 구매
                        </div>
                        <div className="buyBotton Text" onClick={clickEditBotton}>
                            수정하기
                        </div>
                    </div>
                </div>
            </div>

            <div className="stick"></div>
            <div
                onClick={openContentAreaHandler}
            >
                <h2 className="Text">상품 상세설명</h2>
                {isOpenContent
                    ?
                    <div className="openPage">
                        <ProductContentPage productContent={item.productContent} />
                    </div>
                    :
                    <></>
                }
            </div>

            <div className="stick"></div>

            <div onClick={openReviewAreaHandler}>
                <h2>리뷰</h2>
                {isOpenReview
                    ?
                    <>
                        <text>아직 미완</text>
                    </>
                    // <div className="openPage">
                    //     <ProductReviewPage prductReview={item.review} />
                    // </div>
                    :
                    <></>
                }
            </div>

        </div >

    )
}

export default ProductDetail