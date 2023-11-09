import React, { useState } from "react"
import './SearchBar.css';
import { IoSearchCircle } from 'react-icons/io5'


const SearchBar = ({ setSearch, setChoseCategory, choseCategory, setIsSearchButtonClick }) => {
    const [active, setActive] = useState([false, false, false, false])

    const handlerCategory = (e) => {
        const nowName = e.target.name;
        const nowIndex = choseCategory.findIndex(item => item.name === nowName);

        // 복사본을 만들고 선택된 카테고리의 'chose' 값을 토글합니다.
        const updatedChoseCategory = [...choseCategory];
        updatedChoseCategory[nowIndex] = {
            ...updatedChoseCategory[nowIndex],
            chose: !updatedChoseCategory[nowIndex].chose,
        };

        // 변경된 상태를 적용
        setChoseCategory(updatedChoseCategory);

        console.log(choseCategory)
    };

    const searchButtonClick = () => {
        setIsSearchButtonClick(true)
    }


    return (
        <div className="searchBar">
            <div className="SearchBarTextInput">
                <input
                    type="text"
                    placeholder="찾으시는 상품이 있으신가요?"
                    className="searchText"
                    name="searchText"
                    onChange={(e) => setSearch(e.target.value)}
                />
                <IoSearchCircle size={40} onClick={searchButtonClick} />
            </div>
            <div className="categoryArea">
                <div className="category">

                    <div className="category">
                        <text className="CategoryText">category | </text>
                        <button
                            className={choseCategory[0].chose ? 'choseButton CategoryText' : 'button CategoryText'}
                            name="SPRING"
                            onClick={handlerCategory}

                        >봄</button>
                        <button
                            className={choseCategory[1].chose ? 'choseButton CategoryText' : 'button CategoryText'}
                            name="SUMMER"
                            onClick={handlerCategory}
                        >여름</button>
                        <button
                            className={choseCategory[2].chose ? 'choseButton CategoryText' : 'button CategoryText'}
                            name="FALL"
                            onClick={handlerCategory}
                        >가을</button>
                        <button
                            className={choseCategory[3].chose ? 'choseButton CategoryText' : 'button CategoryText'}
                            onClick={handlerCategory}
                            name="WINTER"
                        >겨울</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default SearchBar