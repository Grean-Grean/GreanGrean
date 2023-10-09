import ProductDetail from "./ProductDetail"
import { useNavigate } from "react-router-dom"

// productId: 3,
// productImg: '',
// productName: '국화',
// productPrice: 3000,
// productNumber: 800,
// productCategory: 'fall',
// productContent: '가을의 대표 꽃 국화 결혼식장에는 가져가지 마세요!',

const ProductItem = ({ productId, productImg, productName, productPrice, productNumber, productCategory, productContent }) => {

    const navigate = useNavigate()

    const state = {
        productId: productId,
        productImg: productImg,
        productName: productName,
        productPrice: productPrice,
        productNumber: productNumber,
        productCategory: productCategory,
        productContent: productContent,
    }

    return (
        <div
            className="ProductItem"
            style={{ background: 'orange', width: 300, height: 300, margin: 10 }}
            onClick={() => navigate(`/shop/product/detail/:${productId}`, { state: state })}
        >

            <h5>{productId}item 이름 : {productName}</h5>
            <img src={"/" + productImg} />
            <h5>가격 : {productPrice}</h5>
            <h5>재고 : {productNumber}</h5>
        </div>
    )
}

export default ProductItem