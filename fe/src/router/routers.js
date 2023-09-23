import { Routes, Route } from 'react-router-dom'

import Main from '../components/main/Main';
import Shop from '../components/shop/shop';
//product
import ProductDetail from '../components/product/ProductDetail';
import ProductAdd from '../components/product/ProductAdd';
import ProductEdit from '../components/product/ProductEdit';
import ProductBuy from '../components/product/ProductBuy';

import MyPage from '../components/mypage/MyPage';

import FAQ from '../components/FAQ/FAQ';
import FaqAdd from '../components/FAQ/FaqAdd'

import SignIn from '../components/modals/SignIn';
import SignUp from '../components/modals/SignUp';

const Routers = () => {
    return (
        <>
            <Routes>
                {/* main */}
                <Route path='/' element={<Main />} />

                {/* shop*/}
                <Route path='/shop' element={<Shop />} />

                {/* product  user id 생기면 라우터 수정 */}
                <Route path='/shop/product/detail/:id' element={<ProductDetail />} />
                <Route path='/shop/product/buy/' element={<ProductBuy />} />

                <Route path='/shop/product/add' element={<ProductAdd />} />

                <Route path='/shop/product/edit/' element={<ProductEdit />} />

                {/* 로그인, 회원가입 */}
                <Route path='/user/signin' element={<SignIn />} />
                <Route path='/user/signup' element={<SignUp />} />

                {/* mypage */}
                <Route path='/mypage/*' element={<MyPage />} />

                {/* FAQ */}
                <Route path='/faq' element={<FAQ />} />
                <Route path='/faq/register' element={<FaqAdd />} />
            </Routes>

        </>
    )
}

export default Routers