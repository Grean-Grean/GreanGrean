import React from "react";
import { Link } from "react-router-dom";

const RouteTest = () => {
    return (
        <div>
            <h3>테스트용 페이지 이동기</h3>
            <Link to={'/'}>Main</Link>
            <br />
            <Link to={'/shop'}>Shop</Link>
            <br />
            <Link to={'/product'}>상품등록</Link>
            <br />
            <Link to={'/mypage/:id'}>상품등록</Link>

        </div>
    )
}
export default RouteTest;