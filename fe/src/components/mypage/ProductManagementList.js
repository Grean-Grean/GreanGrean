import ProductEdit from "../product/ProductEdit"
import { Route, Routes, Link } from "react-router-dom"


const ProductManagementList = () => {

    return (
        <div>
            <h2>ProductManagementList 입니다.</h2>
            <div>
                <Link to='mypage/edit' >수정하기</Link>

                <Routes>
                    <Route path='/*' />
                    <Route path="/mypage/eidt" element={<ProductEdit />} />
                </Routes>
            </div>
        </div>
    )

}

export default ProductManagementList