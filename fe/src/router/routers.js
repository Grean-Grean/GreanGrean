import { Routes, Route } from 'react-router-dom'

import Main from '../components/main/Main';

import ProductAdd from '../components/product/ProductAdd';
import Shop from '../components/shop/shop';
import ProductDetail from '../components/product/ProductDetail';

import MyPage from '../components/mypage/MyPage';
import ProductEdit from '../components/product/ProductEdit';
import ProductBuy from '../components/product/ProductBuy';
import ProductList from '../components/product/ProductList';
import ProductItem from '../components/product/ProductItem';
import SignIn from '../components/modals/SignIn';


const Routers = () => {
    return (
        <>
            <Routes>
                {/* main */}
                <Route path='/' element={<Main />} />

                {/* shop*/}
                <Route path='/shop' element={<Shop />} />
                <Route path='/product/detail/:id' element={<ProductDetail />} />
                <Route path='/product/add' element={<ProductAdd />} />
                <Route path='/product/eidt' element={<ProductEdit />} />
                <Route path='/product/buy' element={<ProductBuy />} />
                <Route path='/product/list' element={<ProductList />} />
                <Route path='/product/item/:id' element={<ProductItem />} />
                <Route path='/user/signin' element={<SignIn />} />


                {/* mypage */}
                <Route path='/mypage/:id' element={<MyPage />} />
            </Routes>

        </>
    )
}

export default Routers