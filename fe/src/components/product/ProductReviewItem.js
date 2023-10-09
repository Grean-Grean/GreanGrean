import React from "react"

const ProductReviewItem = ({ id, userNickName, reviewContent }) => {
    return (
        <div
            className="ProductReviewItem"
            style={{ background: 'orange', width: '70vw', height: 200, margin: 10 }}
        >
            <h5>{id}번째 {userNickName}의 리뷰</h5>
            <br />
            <h5>{reviewContent}</h5>
        </div>
    )

}

export default ProductReviewItem