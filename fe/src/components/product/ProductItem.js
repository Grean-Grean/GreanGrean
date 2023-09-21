import ProductDetail from "./ProductDetail"
import { useNavigate } from "react-router-dom"

const ProductItem = ({ id, img, name, price, stock, category, detail }) => {

    const navigate = useNavigate()

    const state = {
        id: id,
        img: img,
        name: name,
        price: price,
        stock: stock,
        category: category,
        detail: detail,
    }

    return (
        <div
            className="ProductItem"
            style={{ background: 'orange', width: 300, height: 300, margin: 10 }}
            onClick={() => navigate(`/product/:${id}`, { state: state })}
        >

            <h5>{id}item 이름 : {name}</h5>
            <img src={"/" + img} />
            <h5>가격 : {price}</h5>
            <h5>재고 : {stock}</h5>
        </div>
    )
}

export default ProductItem