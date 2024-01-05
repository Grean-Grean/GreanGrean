import React, { useState, useRef } from "react"
import './ProductReviewItem.css'
import axios from "axios"
import { useSelector } from "react-redux";
import { selectUser } from "../../store/userSlice";

const SERVER_URL = ""

const ProductReviewItem = ({ id, userNickName, reviewContent }) => {

    const user = useSelector(selectUser);

    const day = "2023.08.09 21:31"
    const [imageSrc, setImageSrc] = useState('')
    const filename = ""
    //수정
    const [isEdit, setIsEdit] = useState(false)
    const toggleIsEdit = () => setIsEdit(!isEdit)

    const [localContent, setLocalContent] = useState(reviewContent)
    const localContentInput = useRef();

    //수정
    const handleEdit = () => {
        if (localContent.length < 5 || localContent.length > 100) {
            localContentInput.current.focus()
            window.confirm(`5글자 이상, 100글자 이하만 입력 가능합니다`)
            return;
        }

        if (window.confirm(`${id}번째를 수정하겠습니까?`)) {
            //데이터 전송
            sendReview()
            toggleIsEdit()
        }
    }
    //수정 취소
    const handleQuitEdit = () => {
        setLocalContent(reviewContent)
        setIsEdit(false)
    }
    //삭제
    const handleRemove = async () => {
        if (window.confirm(`${id}번째 일기를 정말 삭제하겠습니까?`)) {
            //데이터 삭제
            deleteReview()
        }
    }

    //수정전송 /review/modify/{reviewId}
    // {userId : Long,
    //     reviewId : Long,
    //     reviewContent : String,
    //     reviewImg : String}
    const sendReview = () => {
        const returndata = {
            userId: 1,
            reviewId: id,
            reviewContent: reviewContent,
            reviewImg: ""
        }
        console.log(returndata)
        axios
            .put(`${SERVER_URL}/review/modify/${id}`, returndata)
            .then((response) => {
                console.log("/product/modify 성공")
            })
            .catch((error) => {
                // Handle errors here
                console.error(error);
            });
    };

    //상품 삭제 /review/delete/{reviewId}
    //{userId : Long,
    // reviewId : Long}
    const deleteReview = async () => {
        try {
            const response = await fetch(`${SERVER_URL}/review/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json', // 주석 처리
                },
            });

            if (response.ok) {
                console.log('삭제 성공')
                alert('상품 삭제 성공');
            } else {
                alert('상품 삭제 실패');
            }
        } catch (error) {
            console.error('상품 삭제 오류:', error);
            alert('상품 삭제 중 오류가 발생했습니다.');
        }
    };

    //img 받아오기
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


    return (
        <div className="ProductReviewItem">
            <div className="ReviewImgArea">
                <div className="ReviewImg">
                    {imageSrc ? <img src={imageSrc} alt="preview-img" /> : <div>이미지 없음</div>}
                </div>
                {isEdit
                    ?
                    (<div
                        className="ReviwImgChangeBtn ReviewText" style={{ fontSize: 5 }}
                    >
                        <input type='file' onChange={(e) => {
                            encodeFileToBase64(e.target.files[0]);
                        }} />
                        <h2>{filename}</h2>
                    </div>)
                    :
                    (<></>)
                }
            </div>
            <div className="ReviewContentArea">
                <div className="ReviewNameArea">
                    <h5 className="ReviewText" style={{ fontWeight: 500 }}>{id}. {userNickName}</h5>
                    <h5 className="ReviewText" style={{ fontSize: 5 }}>{day}</h5>
                </div>
                <div className="ReviewContent">
                    {isEdit
                        ?
                        (<>
                            <textarea
                                className="ReviewText"
                                style={{ fontSize: 15, height: 'auto' }}
                                ref={localContentInput}
                                value={localContent}
                                onChange={(e) => setLocalContent(e.target.value)}
                            />
                        </>)
                        :
                        (<>
                            <div
                                className="ReviewText"
                                style={{ fontSize: 15 }}
                            >
                                {localContent.split('\n').map((line, index) => (
                                    <div key={index}>{line}</div>
                                ))}
                            </div>
                        </>)
                    }

                </div>
                <div className="ReviewButtonArea">

                    {userNickName === user.userNickName ?
                        <div>
                            {isEdit
                                ?
                                (
                                    <div className="ReviewButtonArea">
                                        <div
                                            className="ReviewBotton ReviewText" style={{ fontSize: 5 }}
                                            onClick={handleQuitEdit}
                                        >
                                            수정 취소하기
                                        </div>
                                        <div
                                            className="ReviewBotton ReviewText" style={{ fontSize: 5 }}
                                            onClick={handleEdit}
                                        >
                                            수정 완료
                                        </div>
                                    </div>
                                )
                                :
                                (
                                    <div className="ReviewButtonArea">
                                        <div
                                            className="ReviewBotton ReviewText"
                                            style={{ fontSize: 5 }}
                                            onClick={toggleIsEdit}
                                        >
                                            수정
                                        </div>
                                        <div
                                            className="ReviewBotton ReviewText"
                                            style={{ fontSize: 5 }}
                                            onClick={handleRemove}
                                        >
                                            삭제
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        :
                        <div></div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ProductReviewItem