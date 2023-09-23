import { Route, Routes, Link } from 'react-router-dom';
import ProductAdd from '../product/ProductAdd';

const MyPage = () => {

    return (
        <div>
            <h2>MyPage 입니다.</h2>
            <div>
                <Link to='mypage/register' >구매 페이지</Link>

                <Routes>
                    <Route path='/*' />
                    <Route path="/mypage/register" element={<ProductAdd />} />
                </Routes>
            </div>
        </div>
    )

}

export default MyPage