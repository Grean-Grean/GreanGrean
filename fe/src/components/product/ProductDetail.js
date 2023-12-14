import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import './ProductDetail.css'

import ProductContentPage from "./ProductContentPage"
import ProductReviewPage from "./ProductReviewPage"
import { TiLeaf } from "react-icons/ti"

const SERVER_URL = "http://172.30.1.16:8080"

const dummyList =
{
    productId: 1,
    productImg: '',
    productName: '튤립',
    productPrice: 5000,
    productNumber: 10000000,
    productCategory: 'spring',
    productContent: '봄의 대표 꽃 튤립 싸다! 싸!, 이걸로 예전엔 집을 샀다고요? 저도 그때로 가고 싶네요!',
    review: [
        {
            id: 1,
            content: '내용',
            userNickName: "예비유미학살자",
            reviewContent: "튤립으로 봄에 인테리어를 하니까 집이 확 살아요! "
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
    const [number, setNumber] = useState(1)
    const navigate = useNavigate()

    const [isOpenContent, setIsOpenContent] = useState(false)
    const [isOpenReview, setIsOpenReview] = useState(false)
    const [buyItem, setBuyItem] = useState([])


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
        setItem(dummyList)
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
        //buyItem에 state만들어서 넣기
        if (number == 0) {
            alert("한개 이상 선택해주세요")
        } else {
            console.log(number)
            navigate(`/shop/product/buy/${item.productId}`, { state: { ...item, number } })
        }

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

    const handleChangeNumber = (e) => {
        setNumber(e.target.value)
        if (e.target.value > item.productNumber) {
            alert(`현재 남은 재고는 ${item.productNumber}개 입니다.`)
            setNumber(item.productNumber)
        } else if (e.target.value < 0) {
            setNumber(0)
        }
        //입력된 값을 state저장
    }

    return (
        <div className="ProductDetailPageBackGround">
            <div className="page">

                <div className="flexwrab ">
                    <div className="imgArea">
                        <img className="img" />
                    </div>

                    <div className="ContentArea">
                        <div className="NameArea">
                            <h2 className="NameText" >{item.productName}</h2>
                            <div className="priceArea">
                                <h2 className="NameText" style={{ fontWeight: "500", marginRight: 5 }}>
                                    {[item.productPrice].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                </h2>
                                <h2 className="Text">원</h2>
                            </div>
                        </div>
                        <div className="BuycontentArea">
                            <div className="PriceContentArea">
                                <h2 className="Text">주문수량</h2>
                                <input
                                    className="BuyCount Text"
                                    type="number"
                                    min="0" max={item.productNumber}
                                    name='productNumber'
                                    value={number}
                                    onChange={handleChangeNumber}
                                />
                            </div>
                        </div>
                        <div className="TotalPrices">
                            <text className="Text" style={{ color: "#214C2D", marginRight: 10 }}>총 상품 금액</text>
                            <text className="NameText" style={{ fontWeight: "700", color: "#214C2D" }}>
                                {[number * item.productPrice].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            </text>
                            <TiLeaf color="#214C2D" size={40} />
                        </div>
                        <div className="buyBottonArea">

                            <div className="buyBotton Text" onClick={clickEditBotton} style={{ backgroundColor: "black" }}>
                                수정하기
                            </div>
                            <div className="buyBotton Text" onClick={clickBuyBotton}>
                                구매하기
                            </div>
                        </div>
                    </div>
                </div>

                <div className="ProductContentDetailArea">
                    <div>
                        <div className="stick"></div>
                        <h2 className="Text" onClick={openContentAreaHandler}>상품 상세설명  ▼</h2>
                        {isOpenContent
                            ?
                            <div>
                                <div className="openPage">
                                    <ProductContentPage productContent={item.productContent} />
                                </div>
                                <div className="stick"></div>
                            </div>
                            :
                            <div className="stick"></div>
                        }
                    </div>

                    <div>

                        <h2 className="Text" onClick={openReviewAreaHandler}>리뷰   ▼</h2>
                        {isOpenReview
                            ?
                            // <>
                            //     <text>아직 미완</text>
                            //     <div className="stick"></div>
                            // </>
                            <div className="openPage">
                                <ProductReviewPage prductReview={item.review} />
                            </div>
                            :
                            <div className="stick"></div>

                        }
                    </div>
                </div>
            </div >
        </div >
    )
}

export default ProductDetail