import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import AddressSearch from "./AddressSearch";
import "./ProductBuy.css";
import axios from "axios";

const SERVER_URL = process.env.REACT_APP_API_URL;

// /purchase/order

// {userId : Long,
//     productId : Long,
//     purchaseName : String,   //구매자 이름
//     purchaseAddress : String,  //주소
//     purchaseNumber : String, //우편번호
//     purchasePhoneNumber : String} //전화번호

const ProductBuy = ({ number }) => {
  const location = useLocation();
  const locationState = location.state;

  //구매 숫자
  console.log(locationState.number);
  //처음 화면 랜더 할때 상품 데이터 가지고 와야함
  const [state, setState] = useState({
    userId: 1,
    productId: locationState.productId, //상품 번호
    purchaseName: "",
    purchaseAddress: "",
    purchaseAddressDetail: "",
    purchaseNumber: "",
    purchasePhoneNumber: "",
  });
  const [isAddressOpen, setIsAddressOpen] = useState(false);

  const stateHandling = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddressUpdate = (data) => {
    setState({
      ...state,
      purchaseNumber: data.zonecode,
      purchaseAddress: data.address,
    });
    setIsAddressOpen(false);
  };

  const handleAddressClick = () => {
    // Open the address search component directly
    setIsAddressOpen(true);
  };

  const buyButtonClick = () => {
    const purchaseAddressFULL =
      state.purchaseAddress + " " + state.purchaseAddressDetail;
    const returndata = {
      userId: state.userId,
      productId: state.productId,
      purchaseName: state.purchaseName, //구매자 이름
      purchaseAddress: purchaseAddressFULL, //주소
      purchaseNumber: state.purchaseNumber, //우편번호
      purchasePhoneNumber: state.purchasePhoneNumber, //전화번호
    };
    console.log(JSON.stringify(returndata));
    console.log(returndata);
    axios
      .post(`${SERVER_URL}/purchase/order`, returndata)
      .then((response) => {
        console.log("성공");
        // if (response.ok) {
        //     alert('상품 구매 성공');
        // } else {
        //     alert('상품 구매 실패');
        // }
      })
      .catch((error) => {
        // Handle errors here
        console.error(error);
      });
  };
  // const buyButtonClick = async () => {

  //     const purchaseAddressFULL = state.purchaseAddress + " " + state.purchaseAddressDetail
  //     // 나중에 formdata로 전달할때 쓰셈
  //     // const formData = new FormData();
  //     // formData.append('productId', state.productId);
  //     // formData.append('purchaseName', state.purchaseName);
  //     // formData.append('purchaseAddress', purchaseAddressFULL);
  //     // formData.append('purchaseNumber', state.purchaseNumber);
  //     // formData.append('purchasePhoneNumber', state.purchasePhoneNumber);
  //     const returndata = {
  //         userId: state.userId,
  //         productId: state.productId,
  //         purchaseName: state.purchaseName,   //구매자 이름
  //         purchaseAddress: purchaseAddressFULL,//주소
  //         purchaseNumber: state.purchaseNumber, //우편번호
  //         purchasePhoneNumber: state.purchasePhoneNumber //전화번호
  //     }
  //     console.log(JSON.stringify(returndata))
  //     // console.log(formData.get('purchaseAddress'))

  //     try {
  //         const response = await fetch(`${SERVER_URL}/purchase/order`, {
  //             method: 'POST',
  //             // 나중에 formdata로 전달할때 쓰셈
  //             //   headers: {
  //             //   // 'Content-Type': 'application/json', // 주석 처리
  //             // },
  //             // body: formData, // FormData 객체 전달
  //             headers: {
  //                 'Content-Type': 'application/json', // 주석 처리
  //             },
  //             body: JSON.stringify(returndata),
  //         });
  // if (response.ok) {
  //     alert('상품 구매 성공');
  // } else {
  //     alert('상품 구매 실패');
  // }

  // } catch (error) {
  //     console.error('상품 구매 오류:', error);
  //     alert('상품 구매 중 오류가 발생했습니다.');
  // }
  //     };

  return (
    <div className="BuyPage">
      <div className="line">
        <text className="text">구매 수령인 이름 </text>
        <input
          className="input"
          type="text"
          name="purchaseName"
          value={state.purchaseName}
          onChange={stateHandling}
        />
      </div>
      <div className="line">
        <text className="text">우편번호 </text>
        <input
          style={{ width: 210 }}
          className="input"
          type="text"
          name="purchaseNumber"
          value={state.purchaseNumber}
          // onChange={stateHandling}
        />
        <button className="searchButton " onClick={handleAddressClick}>
          검색
        </button>
      </div>
      {isAddressOpen && <AddressSearch updateAddress={handleAddressUpdate} />}
      <div className="line">
        <text className="text">주소 </text>
        <input
          className="input"
          type="text"
          name="purchaseAddress"
          value={state.purchaseAddress}
          onChange={stateHandling}
        />
      </div>
      <div className="line">
        <text className="text">상세 주소 </text>
        <input
          className="input"
          type="text"
          name="purchaseAddressDetail"
          value={state.purchaseAddressDetail}
          onChange={stateHandling}
        />
      </div>
      <div className="line">
        <text className="text">수령인 전화번호 </text>
        <input
          className="input"
          type="text"
          name="purchasePhoneNumber"
          value={state.purchasePhoneNumber}
          onChange={stateHandling}
        />
      </div>

      <div className="buyButtonArea">
        <button className="buyButton" onClick={buyButtonClick}>
          구매
        </button>
      </div>
    </div>
  );
};

export default ProductBuy;
