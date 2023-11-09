import React from "react";
import MainBanner from "./MainBanner";
import './Main.css';
import { useNavigate } from "react-router-dom";

const Main = () => {

    const navigate = useNavigate()
    const ClicktoShop = () => {
        navigate(`/shop`)
    }

    return (
        <div className="Main">
            <div className="HomeImage1">
                <div className="HomeImageText1">
                    <div>다채로운 식물의 세계로,</div>
                    <div>자연의 아름다움을 집으로 초대하세요</div>
                    <div className="ShopButton">
                        <div className="ShopButtonText" onClick={ClicktoShop}>shop {">"}</div>
                    </div>
                </div>
            </div>

            <div className="HomeImage2">
                <div className="HomeImageText2">
                    <div>식물을 사랑하는 사람들과 함께하는 곳</div>
                    <div>우리와 함께 새로운 식물 여행을 시작해보세요</div>
                </div>
            </div>

            <div className="ReviewPreview">
                <div className="ReviewPreviewText">
                    <div>최근 리뷰</div>
                    <div>사장님이 신선하고 알로에가 친철해요!</div>
                </div>
            </div>

            <div className="NewProductView">
                <div>최근 등록 상품</div>
                <div className="NewProductList">
                    <div className="Product">상품 1</div>
                    <div className="Product">상품 2</div>
                    <div className="Product">상품 3</div>
                </div>
            </div>
        </div>
    );
}

export default Main;
