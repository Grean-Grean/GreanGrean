import { useLocation } from "react-router-dom"

const ProductDetail = () => {

    //이전 페이지에서 정보 받아 오기
    const location = useLocation()
    const locationState = location.state



    return (
        <div>
            <h2>ProductDetail입니다.</h2>
            <h2>이름 : {locationState.name}</h2>
            <h2>가격 : {locationState.price}</h2>
            <h2>상세설명 : {locationState.detail}</h2>
            <h2>재고 : {locationState.stock}</h2>
            <h2>카테고리 : {locationState.category}</h2>


        </div>

    )
}

export default ProductDetail