import React, { useState, useEffect } from "react"
import ProductList from "../product/ProductList"
import SearchBar from "./SearchBar"

//임시 더미 데이터
const dummyList = [
    {
        id: 1,
        img: '',
        name: '튤립',
        price: 5000,
        stock: 300,
        category: 'spring',
        detail: '봄의 대표 꽃 튤립 싸다! 싸!, 이걸로 예전엔 집을 샀다고요? 저도 그때로 가고 싶네요!',
    },
    {
        id: 2,
        img: '',
        name: '해바라기',
        price: 7000,
        stock: 200,
        category: 'summer',
        detail: '여름의 대표 꽃 해바라기입니다. 해바라기 나는 당신 바라기~',
    },
    {
        id: 3,
        img: '',
        name: '국화',
        price: 3000,
        stock: 800,
        category: 'fall',
        detail: '가을의 대표 꽃 국화 결혼식장에는 가져가지 마세요!',
    },
    {
        id: 4,
        img: '',
        name: '수선화',
        price: 9000,
        stock: 100,
        category: 'winter',
        detail: '겨울의 대표 꽃 수선화입니다. 저도 겨울에 수선화가 피는줄 몰랐어요!',
    }
]

const Shop = () => {

    const [data, setData] = useState([])

    const [search, setSearch] = useState('')


    useEffect(() => {
        setData(dummyList)
    }, [])



    return (
        <div >
            <h2>Shop page</h2>
            <SearchBar setSearch={setSearch} />
            <br />
            <ProductList productList={data} inputText={search} />

        </div>
    )
}

export default Shop