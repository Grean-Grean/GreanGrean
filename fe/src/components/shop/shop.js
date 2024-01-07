import React, { useState, useEffect } from "react";
import ProductList from "../product/ProductList";
import SearchBar from "./SearchBar";
import axios from "axios"; // Import Axios
import "./shop.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/userSlice";

const SERVER_URL = process.env.REACT_APP_API_URL;

//임시 더미 데이터
const dummyList = [
  {
    productId: 1,
    productImg: "",
    productName: "튤립",
    productPrice: 5000,
    productNumber: 300,
    productCategory: "spring",
    productContent:
      "봄의 대표 꽃 튤립 싸다! 싸!, 이걸로 예전엔 집을 샀다고요? 저도 그때로 가고 싶네요!",
  },
  {
    productId: 2,
    productImg: "",
    productName: "해바라기",
    productPrice: 7000,
    productNumber: 200,
    productCategory: "summer",
    productContent: "여름의 대표 꽃 해바라기입니다. 해바라기 나는 당신 바라기~",
  },
  {
    productId: 3,
    productImg: "",
    productName: "국화",
    productPrice: 3000,
    productNumber: 800,
    productCategory: "fall",
    productContent: "가을의 대표 꽃 국화 결혼식장에는 가져가지 마세요!",
  },
  {
    productId: 4,
    productImg: "",
    productName: "수선화",
    productPrice: 9000,
    productNumber: 100,
    productCategory: "winter",
    productContent:
      "겨울의 대표 꽃 수선화입니다. 저도 겨울에 수선화가 피는줄 몰랐어요!",
  },
  {
    productId: 5,
    productImg: "",
    productName: "튤립",
    productPrice: 5000,
    productNumber: 300,
    productCategory: "spring",
    productContent:
      "봄의 대표 꽃 튤립 싸다! 싸!, 이걸로 예전엔 집을 샀다고요? 저도 그때로 가고 싶네요!",
  },
  {
    productId: 6,
    productImg: "",
    productName: "해바라기",
    productPrice: 7000,
    productNumber: 200,
    productCategory: "summer",
    productContent: "여름의 대표 꽃 해바라기입니다. 해바라기 나는 당신 바라기~",
  },
  {
    productId: 7,
    productImg: "",
    productName: "국화",
    productPrice: 3000,
    productNumber: 800,
    productCategory: "fall",
    productContent: "가을의 대표 꽃 국화 결혼식장에는 가져가지 마세요!",
  },
  {
    productId: 8,
    productImg: "",
    productName: "수선화",
    productPrice: 9000,
    productNumber: 100,
    productCategory: "winter",
    productContent:
      "겨울의 대표 꽃 수선화입니다. 저도 겨울에 수선화가 피는줄 몰랐어요!",
  },
  {
    productId: 9,
    productImg: "",
    productName: "국화",
    productPrice: 3000,
    productNumber: 800,
    productCategory: "fall",
    productContent: "가을의 대표 꽃 국화 결혼식장에는 가져가지 마세요!",
  },
  {
    productId: 10,
    productImg: "",
    productName: "수선화",
    productPrice: 9000,
    productNumber: 100,
    productCategory: "winter",
    productContent:
      "겨울의 대표 꽃 수선화입니다. 저도 겨울에 수선화가 피는줄 몰랐어요!",
  },
  {
    productId: 11,
    productImg: "",
    productName: "국화",
    productPrice: 3000,
    productNumber: 800,
    productCategory: "fall",
    productContent: "가을의 대표 꽃 국화 결혼식장에는 가져가지 마세요!",
  },
  {
    productId: 12,
    productImg: "",
    productName: "수선화",
    productPrice: 9000,
    productNumber: 100,
    productCategory: "winter",
    productContent:
      "겨울의 대표 꽃 수선화입니다. 저도 겨울에 수선화가 피는줄 몰랐어요!",
  },
  {
    productId: 13,
    productImg: "",
    productName: "수선화",
    productPrice: 9000,
    productNumber: 100,
    productCategory: "winter",
    productContent:
      "겨울의 대표 꽃 수선화입니다. 저도 겨울에 수선화가 피는줄 몰랐어요!",
  },
  {
    productId: 14,
    productImg: "",
    productName: "국화",
    productPrice: 3000,
    productNumber: 800,
    productCategory: "fall",
    productContent: "가을의 대표 꽃 국화 결혼식장에는 가져가지 마세요!",
  },
  {
    productId: 15,
    productImg: "",
    productName: "수선화",
    productPrice: 9000,
    productNumber: 100,
    productCategory: "winter",
    productContent:
      "겨울의 대표 꽃 수선화입니다. 저도 겨울에 수선화가 피는줄 몰랐어요!",
  },
  {
    productId: 16,
    productImg: "",
    productName: "국화",
    productPrice: 3000,
    productNumber: 800,
    productCategory: "fall",
    productContent: "가을의 대표 꽃 국화 결혼식장에는 가져가지 마세요!",
  },
  {
    productId: 17,
    productImg: "",
    productName: "수선화",
    productPrice: 9000,
    productNumber: 100,
    productCategory: "winter",
    productContent:
      "겨울의 대표 꽃 수선화입니다. 저도 겨울에 수선화가 피는줄 몰랐어요!",
  },
  {
    productId: 18,
    productImg: "",
    productName: "국화",
    productPrice: 3000,
    productNumber: 800,
    productCategory: "fall",
    productContent: "가을의 대표 꽃 국화 결혼식장에는 가져가지 마세요!",
  },
];

const Shop = () => {
  const user = useSelector(selectUser);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [choseCategory, setChoseCategory] = useState([
    {
      name: "SPRING",
      chose: false,
    },
    {
      name: "SUMMER",
      chose: false,
    },
    {
      name: "FALL",
      chose: false,
    },
    {
      name: "WINTER",
      chose: false,
    },
  ]);
  const [isSearchButtonClick, setIsSearchButtonClick] = useState(false);

  const navigate = useNavigate();
  // /product/search?{query=query&where=category}
  const getData = async () => {
    // const selectedCategory = choseCategory.find(category => category.chose === true);
    // const category = selectedCategory ? selectedCategory.name : '';
    // const Formdata = {
    //     query: search,
    //     category
    // };

    const query = search ? `query=${search}` : "";
    const category =
      choseCategory.find((category) => category.chose === true)?.name || "";
    const queryString = [query, category].filter(Boolean).join("&");
    const url = `${SERVER_URL}/product/search?${queryString}`;

    console.log(url);

    fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(1, res);
        setData(res);
      });
  };

  //첫 화면에 데이터 받기
  // useEffect(() => {
  //     // console.log("shop page 데이터 get~")
  //     getData();
  //     // console.log(data)
  // }, [])

  // setData(dummyList)

  //isSearchButtonClick이 True 가 되면
  useEffect(() => {
    console.log("데이터 전송해라!");
    getData();
    //전송 끝나면 다시 클릭 상태 false로 변경
    setIsSearchButtonClick(false);
    setData(dummyList);
  }, [isSearchButtonClick]);

  return (
    <div className="shop">
      <div className="SearchBarArea">
        <SearchBar
          setSearch={setSearch}
          setChoseCategory={setChoseCategory}
          choseCategory={choseCategory}
          setIsSearchButtonClick={setIsSearchButtonClick}
        />

        {/* <text>현재 선택된 카테고리 : {choseCategory.map((item) => {
                    if (item.chose) {
                        return item.name;
                    } else {
                        return null
                    }
                })}</text> */}
      </div>

      <div>
        <ProductList productList={data} inputText={search} />
      </div>
      {user.isLoggedIn ? (
        <div className="SubmitButtonArea">
          <button
            className="SubmitButton"
            onClick={() => navigate("/shop/product/add")}
          >
            등록하기
          </button>
        </div>
      ) : (
        <div className="SubmitButtonArea">
          <button
            className="SubmitButton"
            onClick={() => {
              //   alert("로그인을 먼저 해주세요");

              if (window.confirm("로그인을 먼저 해주세요")) {
                navigate("/user/signin");
              }
            }}
          >
            등록하기
          </button>
        </div>
      )}
    </div>
  );
};

export default Shop;
