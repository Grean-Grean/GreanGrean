import { useSelector } from 'react-redux'
import ProductItem from './ProductItem'
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"

// https://choa-ri.tistory.com/102 카테고리 필터
const ProductList = ({ productList, inputText, choseCategory }) => {

    const [cafilteredData, setFilteredData] = useState(productList)

    const isUserSignIn = useSelector(state => state.completed.iscompleted)
    const navigate = useNavigate()
    //검색
    const filteredData = productList.filter((e) => {
        if (inputText === '') {
            return e
        } else {
            return e.name.toLowerCase().includes(inputText)
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
                    <ProductItem key={item.id} {...item} />
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