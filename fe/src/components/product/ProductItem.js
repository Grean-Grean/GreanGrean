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
            className="Product"
            onClick={() => navigate(`/shop/product/detail/:${productId}`, { state: state })}
        >
            <div className="ProductImgArea">
                <img src={"/" + productImg} />
            </div>
            <div className="ProductTextArea">
                <h5 className="ProductText" style={{ fontSize: 20 }}>{productName}</h5>
                <h5 className="ProductText" style={{ fontSize: 5 }}>{productId}</h5>
                <h5 className="ProductText">가격 : {productPrice}</h5>
                <h5 className="ProductText">재고 : {productNumber}</h5>
            </div>
        </div>
    )
}

export default ProductItem