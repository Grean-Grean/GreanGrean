import ProductItem from './ProductItem'
import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from "react-router-dom"
import './ProductList.css'
import { useSelector } from "react-redux";
import { selectUser } from "../../store/userSlice";
// productId: 3,
// productImg: '',
// productName: '국화',
// productPrice: 3000,
// productNumber: 800,
// productCategory: 'fall',
// productContent: '가을의 대표 꽃 국화 결혼식장에는 가져가지 마세요!',

// https://choa-ri.tistory.com/102 카테고리 필터
const ProductList = ({ productList, inputText }) => {
    // console.log(productList)
    const [cafilteredData, setFilteredData] = useState(productList)

    const user = useSelector(selectUser)

    const navigate = useNavigate()

    //page
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // 페이지당 항목 수
    const [displayedData, setDisplayedData] = useState([]); // 현재 페이지에 표시할 데이터
    const totalPages = Math.ceil(productList.length / itemsPerPage);
    // 페이지 번호 목록 생성
    const generatePageNumbers = () => {
        const pageRange = 2; // 현재 페이지 주변에 표시할 페이지 번호 개수
        const pageNumbers = [];

        // 시작 페이지 번호와 끝 페이지 번호 계산
        let startPage = currentPage - pageRange;
        let endPage = currentPage + pageRange;

        if (startPage < 1) {
            startPage = 1;
            endPage = Math.min(totalPages, startPage + pageRange * 2);
        }
        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(1, endPage - pageRange * 2);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    };

    const pageNumbers = generatePageNumbers();

    // 처음 페이지로 이동하는 함수
    const goToFirstPage = () => {
        setCurrentPage(1);
    };

    // 끝 페이지로 이동하는 함수
    const goToLastPage = () => {
        setCurrentPage(totalPages);
    };


    //검색
    // const filteredData = productList.filter((e) => {
    //     if (inputText === '') {
    //         return e
    //     } else {
    //         return e.productName.toLowerCase().includes(inputText)
    //     }
    // })

    useEffect(() => {
        // currentPage에 따라 보여줄 데이터 설정
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const newDisplayedData = productList.slice(startIndex, endIndex);
        setDisplayedData(newDisplayedData);
    }, [currentPage, productList]);


    return (
        <div className='ProductListArea'>
            {productList.length > 0 ? <>{productList.length} / {currentPage}</>
                :
                <h4>검색되는 상품이 없습니다</h4>
            }
            <div className='ProductList'>
                {displayedData.map((item) => (
                    <ProductItem key={item.productId} {...item} />
                ))}
            </div>
            {/* ... (이전 페이지, 현재 페이지, 다음 페이지 버튼) */}
            <div className="pagination">
                <button onClick={goToFirstPage}>
                    {"|<"}
                </button>
                {pageNumbers.map((pageNumber) => (
                    <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={pageNumber === currentPage ? "active" : ""}
                    >
                        {pageNumber}
                    </button>
                ))}
                <button onClick={goToLastPage}>
                    {">|"}
                </button>
            </div>
        </div >
    )
}
export default ProductList