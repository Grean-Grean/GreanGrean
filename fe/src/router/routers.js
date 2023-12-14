import { Routes, Route, BrowserRouter } from "react-router-dom";

import MainLayout from "../components/MainLayout";
import Main from "../components/main/Main";
import Shop from "../components/shop/shop";
//product
import ProductDetail from "../components/product/ProductDetail";
import ProductAdd from "../components/product/ProductAdd";
import ProductEdit from "../components/product/ProductEdit";
import ProductBuy from "../components/product/ProductBuy";

import MyPage from "../components/mypage/MyPage";
import UserInfo from "../components/mypage/UserInfo";
import OrderInfo from "../components/mypage/OrderInfo";
import SellManagement from "../components/mypage/SellManagement";
import ProductManagement from "../components/mypage/ProductManagement";

import Faq from "../components/faq/Faq";
import FaqAdd from "../components/faq/FaqAdd";

import SignIn from "../components/user/SignIn";
import SignUp from "../components/user/SignUp";

const Routers = () => {
  return (
    <>
      <Routes>
        {/* Header,Footer,Nav을 보여주고 싶은 컴포넌트 */}
        <Route element={<MainLayout />}>
          {/* main */}
          <Route path="/" element={<Main />} />

          {/* shop*/}
          <Route path="/shop" element={<Shop />} />

          {/* product  user id 생기면 라우터 수정 */}
          <Route path="/shop/product/detail/:id" element={<ProductDetail />} />
          <Route path="/shop/product/buy/:id" element={<ProductBuy />} />
          <Route path="/shop/product/add" element={<ProductAdd />} />
          <Route path="/shop/product/edit/" element={<ProductEdit />} />

          {/* mypage */}
          <Route path="/mypage/info" element={<UserInfo />} /> 
          <Route path="/mypage/orders" element={<OrderInfo />} />
          <Route path="/mypage/sells" element={<SellManagement />} />
          <Route path="/mypage/products" element={<ProductManagement />} />

          {/* FAQ */}
          <Route path="/faq" element={<Faq />} />
          <Route path="/faq/register" element={<FaqAdd />} />

          <Route
            path="/shop/product/edit/:productId"
            element={<ProductEdit />}
          />
        </Route>

        {/* 로그인, 회원가입 */}
        <Route path="/user/signin" element={<SignIn />} />
        <Route path="/user/signup" element={<SignUp />} />
      </Routes>
    </>
  );
};

export default Routers;
