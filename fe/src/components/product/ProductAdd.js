import React, { useState } from 'react'


const SERVER_URL = "http://172.30.1.23:8080"

const ProductAdd = () => {

    const [file, setFile] = useState(null);
    const [imageSrc, setImageSrc] = useState('')
    const filename = ""
    const [obj, setObj] = useState({
        userId: 1,
        productName: "",
        productContent: '',
        productNumber: 0,
        productPrice: 0,
        productImg: '이미지입니다.',
        productCategory: ""
    })

    //handleChangeObj, 오브젝트 변경되면 적용하기
    const handleChangeObj = (e) => {
        console.log(e.target.name)
        console.log(e.target.value)
        // if (e.target.name !== 'productCategory') {
        setObj({
            ...obj,
            [e.target.name]: e.target.value
        })
        // } else {
        //     const newState = { ...obj }
        //     newState.productCategory = [...newState.productCategory, e.target.value]
        //     setObj(newState)
        // }
    }

    //img file 읽어 오기
    const encodeFileToBase64 = (fileBlob) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);
        return new Promise((resolve) => {
            reader.onload = () => {
                setImageSrc(reader.result);
                resolve();
            };
        });
    }

    //+버튼 클릭시 배열에 다음부터 추가해주고 밑에 이미 고른 카테고리 설정
    const addCategory = () => {

    }

    //상품 등록 클릭시 작동
    const sendObj = async () => {

        // const formData = new FormData();
        // formData.append('userId', obj.userId);
        // formData.append('productName', obj.productName);
        // formData.append('productContent', obj.productContent);
        // formData.append('productNumber', obj.productNumber);
        // formData.append('productPrice', obj.productPrice);
        // formData.append('productImg', obj.productImg);
        // formData.append('productCategory', obj.productCategory);

        try {
            const response = await fetch(`${SERVER_URL}/product/add`, {
                method: 'POST',
                // 나중에 formdata로 전달할때 쓰셈
                //   headers: {
                //   // 'Content-Type': 'application/json', // 주석 처리
                // },
                // body: formData, // FormData 객체 전달
                headers: {
                    'Content-Type': 'application/json', // 주석 처리
                },
                body: JSON.stringify(obj),
            });

            if (response.ok) {
                alert('상품 등록 성공');
            } else {
                alert('상품 등록 실패');
            }
        } catch (error) {
            console.error('상품 등록 오류:', error);
            alert('상품 등록 중 오류가 발생했습니다.');
        }
    };



    return (
        <div style={{ width: 1920, height: 2734, position: 'relative', background: '#F8F3ED' }}>
            {/* 이미지 파일 선택 구역 */}
            {imageSrc ? <img src={imageSrc} alt="preview-img" style={{ width: 832, height: 841, left: 128, top: 250, position: 'absolute', borderRadius: 5, border: '1px black solid' }} /> : <div style={{ backgroundColor: 'white', width: 832, height: 841, left: 128, top: 250, position: 'absolute', borderRadius: 5, border: '1px black solid' }}>이미지 없음</div>}
            <div className="Rectangle70" style={{ width: 832, height: 62, left: 128, top: 1122, position: 'absolute', background: '#D9D9D9' }} />
            <div className="1Jpg" style={{ left: 162, top: 1133, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word' }}>
                <input type='file' onChange={(e) => {
                    encodeFileToBase64(e.target.files[0]);
                }} />
                <h2>{filename}</h2>


            </div>
            {/* 상품명이름 구역 */}
            <div style={{ width: 166, left: 1059, top: 266, position: 'absolute', color: 'black', fontSize: 24, fontFamily: 'Noto Sans', fontWeight: '800', letterSpacing: 1.20, wordWrap: 'break-word' }}>등록 상품명 </div>
            <input
                name='productName'
                className="상품명"
                style={{ letterSpacing: 1.30, fontWeight: '500', fontSize: 24, width: 733, height: 60, left: 1059, top: 317, fontFamily: 'Noto Sans', position: 'absolute', background: 'white', borderRadius: 5, border: '1.50px #214C2D solid' }}
                value={obj.productName}
                onChange={handleChangeObj}
                placeholder='상품명을 입력해주세요'
            />

            {/* 판매 가격 구역 */}
            <div style={{ width: 166, left: 1059, top: 412, position: 'absolute', color: 'black', fontSize: 24, fontFamily: 'Noto Sans', fontWeight: '800', letterSpacing: 1.20, wordWrap: 'break-word' }}>판매 가격</div>
            <input
                className="Rectangle73"
                style={{ letterSpacing: 1.30, fontWeight: '500', fontSize: 24, fontFamily: 'Noto Sans', width: 350, height: 60, left: 1059, top: 463, position: 'absolute', background: 'white', borderRadius: 5, border: '1.50px #214C2D solid' }}
                name='productPrice'
                value={obj.productPrice}
                onChange={handleChangeObj}
            />
            <div style={{ left: 1367, top: 477, position: 'absolute', color: 'black', fontSize: 24, fontFamily: 'Noto Sans', fontWeight: '500', letterSpacing: 1.20, wordWrap: 'break-word' }}>원</div>


            {/* 판매수량 구역 */}
            <div style={{ width: 166, left: 1059, top: 558, position: 'absolute', color: 'black', fontSize: 24, fontFamily: 'Noto Sans', fontWeight: '800', letterSpacing: 1.20, wordWrap: 'break-word' }}>판매 수량</div>
            <input
                className="Rectangle75"
                style={{ letterSpacing: 1.30, fontWeight: '500', fontSize: 24, fontFamily: 'Noto Sans', width: 350, height: 60, left: 1059, top: 609, position: 'absolute', background: 'white', borderRadius: 5, border: '1.50px #214C2D solid' }}
                name='productNumber'
                value={obj.productNumber}
                onChange={handleChangeObj}
            />
            <div style={{ left: 1367, top: 623, position: 'absolute', color: 'black', fontSize: 24, fontFamily: 'Noto Sans', fontWeight: '500', letterSpacing: 1.20, wordWrap: 'break-word' }}>개</div>


            <div style={{ width: 291, left: 123, top: 1332, position: 'absolute', color: 'black', fontSize: 36, fontFamily: 'Noto Sans', fontWeight: '800', letterSpacing: 1.80, wordWrap: 'break-word' }}>상세 설명 추가</div>

            {/* 카테고리 추가 구역*/}
            <div style={{ width: 166, left: 1059, top: 717, position: 'absolute', color: 'black', fontSize: 24, fontFamily: 'Noto Sans', fontWeight: '800', letterSpacing: 1.20, wordWrap: 'break-word' }}>카테고리 추가</div>
            {/* 카테고리 */}
            <div className="Rectangle23" />
            {/* '+' */}
            <div
                className="Group24"
                style={{ width: 49, height: 49, left: 1529, top: 768, position: 'absolute' }}
                onClick={addCategory}
            >
                <div className="Ellipse7" style={{ width: 49, height: 49, left: 0, top: 0, position: 'absolute', borderRadius: 9999, border: '2px #214C2D solid' }} />
                <div style={{ left: 14, top: 0, position: 'absolute', color: 'black', fontSize: 36, fontFamily: 'Noto Sans', fontWeight: '400', letterSpacing: 1.80, wordWrap: 'break-word' }}>+</div>
            </div>
            <select
                name='productCategory'
                value={obj.productCategory}
                onChange={handleChangeObj}
                style={{ width: 442, height: 49, left: 1059, top: 768, position: 'absolute', background: '#D9D9D9' }}
            >
                <option selected value={'선택'}>선택</option>
                <option value={'SPRING'}>봄</option>
                <option value={'SUMMER'}>여름</option>
                <option value={'FALL'}>가을</option>
                <option value={'WINTER'}>겨울</option>
            </select>

            {/* 이미 선택된 카테고리 */}
            <div className="Rectangle76" style={{ width: 442, height: 49, left: 1059, top: 835, position: 'absolute', background: '#D9D9D9' }} />
            {/* '- */}
            <div className="Group36" style={{ width: 49, height: 52, left: 1529, top: 832, position: 'absolute' }}>
                <div className="Ellipse7" style={{ width: 49, height: 49, left: 0, top: 3, position: 'absolute', borderRadius: 9999, border: '2px #214C2D solid' }} />
                <div style={{ left: 19, top: 0, position: 'absolute', color: 'black', fontSize: 36, fontFamily: 'Noto Sans', fontWeight: '400', letterSpacing: 1.80, wordWrap: 'break-word' }}>-</div>
            </div>
            <div style={{ left: 1079, top: 843, position: 'absolute', color: 'black', fontSize: 24, fontFamily: 'Noto Sans', fontWeight: '400', letterSpacing: 1.20, wordWrap: 'break-word' }}>{obj.productCategory}</div>
            <textarea
                className="Rectangle78"
                style={{ paddingTop: '30px', letterSpacing: 1.30, fontWeight: '500', fontSize: 24, fontFamily: 'Noto Sans', width: 1669, height: 855, left: 123, top: 1412, position: 'absolute', background: '#D9D9D9' }}
                name='productContent'
                value={obj.productContent}
                onChange={handleChangeObj}
                placeholder='상세 설명을 입력해 주세요'
                placeholderColor="black"
            />


            <div
                className="Group30"
                style={{ width: 660, height: 90, left: 630, top: 2513, position: 'absolute' }}
                onClick={sendObj}
            >
                <div className="Rectangle22" style={{ width: 660, height: 90, left: 0, top: 0, position: 'absolute', background: '#214C2D', borderRadius: 10 }} />
                <div style={{ left: 264, top: 23, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 32, fontFamily: 'Noto Sans', fontWeight: '500', wordWrap: 'break-word' }}>상품 등록</div>
            </div>
        </div >

    )
}

export default ProductAdd