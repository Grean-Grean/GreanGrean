import React, { useState, useEffect } from "react"
import ProductList from "../product/ProductList"
import SearchBar from "./SearchBar"
import axios from "axios"; // Import Axios

const SERVER_URL = "http://172.30.1.23:8080"

//임시 더미 데이터
const dummyList = [
    {
        productId: 1,
        productImg: '',
        productName: '튤립',
        productPrice: 5000,
        productNumber: 300,
        productCategory: 'spring',
        productContent: '봄의 대표 꽃 튤립 싸다! 싸!, 이걸로 예전엔 집을 샀다고요? 저도 그때로 가고 싶네요!',
    },
    {
        productId: 2,
        productImg: '',
        productName: '해바라기',
        productPrice: 7000,
        productNumber: 200,
        productCategory: 'summer',
        productContent: '여름의 대표 꽃 해바라기입니다. 해바라기 나는 당신 바라기~',
    },
    {
        productId: 3,
        productImg: '',
        productName: '국화',
        productPrice: 3000,
        productNumber: 800,
        productCategory: 'fall',
        productContent: '가을의 대표 꽃 국화 결혼식장에는 가져가지 마세요!',
    },
    {
        productId: 4,
        productImg: '',
        productName: '수선화',
        productPrice: 9000,
        productNumber: 100,
        productCategory: 'winter',
        productContent: '겨울의 대표 꽃 수선화입니다. 저도 겨울에 수선화가 피는줄 몰랐어요!',
    }
]

const Shop = () => {

    const [data, setData] = useState([])
    const [search, setSearch] = useState('')

    const getData = async () => {

        fetch(`${SERVER_URL}/product/list`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(res => {
                console.log(1, res);
                setData(res);
            })
    }

    //첫 화면에 데이터 받기
    useEffect(() => {
        console.log("shop page 데이터 get~")
        getData();
        console.log(data)
    }, [])

    // setData(dummyList)

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