import { useSelector } from 'react-redux'
import ProductItem from './ProductItem'
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"

// productId: 3,
// productImg: '',
// productName: '국화',
// productPrice: 3000,
// productNumber: 800,
// productCategory: 'fall',
// productContent: '가을의 대표 꽃 국화 결혼식장에는 가져가지 마세요!',

// https://choa-ri.tistory.com/102 카테고리 필터
const ProductList = ({ productList, inputText }) => {
    console.log(productList)
    const [cafilteredData, setFilteredData] = useState(productList)

    const isUserSignIn = useSelector(state => state.completed.iscompleted)
    const navigate = useNavigate()
    //검색
    const filteredData = productList.filter((e) => {
        if (inputText === '') {
            return e
        } else {
            return e.productName.toLowerCase().includes(inputText)
        }
    })



    return (
        <div style={{ border: '1px solid black' }}>
            <h4>ProductList입니다.</h4>
            {filteredData.length > 0 ? <h4>{filteredData.length}의 상품이 있습니다</h4>
                :
                <h4>검색되는 상품이 없습니다</h4>
            }
            <div style={{ display: 'flex', flexFlow: 'wrap' }}>
                {filteredData.map((item) => (
                    <ProductItem key={item.productId} {...item} />
                ))}
            </div>
            {isUserSignIn ?
                <>
                    <button onClick={() => navigate('/shop/product/add')}>등록하기</button>
                </>
                :
                <>
                    <button onClick={() => {
                        alert("로그인을 먼저 해주세요")
                    }}>등록하기</button>
                </>
            }

        </div >
    )
}
export default ProductList